package order

import (
	"context"
	"database/sql"
	"errors"
	"log"
	"strings"

	db "github.com/Xebec19/e-commerce/client-api/db/sqlc"
	"github.com/Xebec19/e-commerce/client-api/util"
	"github.com/gofiber/fiber/v2"
	razorpay "github.com/razorpay/razorpay-go"
)

type orderSchema struct {
	BillingFirstName  string `json:"billingFirstName" binding:"required"`
	BillingLastName   string `json:"billingLastName" binding:"required"`
	BillingEmail      string `json:"billingEmail" binding:"required"`
	BillingAddress    string `json:"billingAddress" binding:"required"`
	BillingPhone      string `json:"billingPhone" binding:"required"`
	ShippingFirstName string `json:"shippingFirstName" binding:"required"`
	ShippingLastName  string `json:"shippingLastName" binding:"required"`
	ShippingEmail     string `json:"shippingEmail" binding:"required"`
	ShippingAddress   string `json:"shippingAddress" binding:"required"`
	ShippingPhone     string `json:"shippingPhone" binding:"required"`
}

// @Summary: it create an order of status processing
//
// @Router: /order/v1/create-order [post]
func createOrder(c *fiber.Ctx) error {
	req := new(orderSchema)
	if err := c.BodyParser(req); err != nil {
		c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
		return err
	}

	userId := c.Locals("userid").(int64)

	cartId, err := db.DBQuery.GetCartID(context.Background(), sql.NullInt32{Int32: int32(userId), Valid: true})

	if err != nil {
		c.Status(fiber.StatusInternalServerError).JSON(util.ErrorResponse(err))
		return err
	}

	cartDetails, err := db.DBQuery.GetCartDetails(context.Background(), sql.NullInt32{Int32: int32(userId), Valid: true})

	if err != nil {
		c.Status(fiber.StatusInternalServerError).JSON(util.ErrorResponse(err))
		return err
	}

	cartItems, err := db.DBQuery.GetCartItems(c.Context(), sql.NullInt32{Int32: cartId, Valid: true})

	if err != nil {
		c.Status(fiber.StatusInternalServerError).JSON(util.ErrorResponse(err))
		return err
	}

	var subTotal int32
	var deliveryPriceTotal int32
	var discountTotal int32
	var total int32
	subTotal = 0
	deliveryPriceTotal = 0
	discountTotal = 0
	total = 0

	for _, item := range cartItems {
		price := item.Price.Int32

		deliveryPrice := item.DeliveryPrice.Int32

		subTotal += item.Quantity.Int32 * price
		deliveryPriceTotal += deliveryPrice
	}

	if cartDetails.DiscountCode.String != "" {
		discount, _ := db.DBQuery.GetDiscount(context.Background(), strings.ToLower(cartDetails.DiscountCode.String))

		if discount.Type.EnumType == "voucher" {
			discountTotal = discount.Value.Int32
		} else {
			total := subTotal + deliveryPriceTotal
			discountTotal = ((discount.Value.Int32) * 100) / total
		}
	}

	total = max(0, subTotal+deliveryPriceTotal-discountTotal)

	config, err := util.LoadConfig(("."))
	if err != nil {
		log.Fatal("cannot load config: ", err)
	}
	razorPayClient := razorpay.NewClient(config.RazorpayKey, config.RazorpaySecret)

	data := map[string]interface{}{
		"amount":   total * 100,
		"currency": config.Currency,
	}

	body, err := razorPayClient.Order.Create(data, nil)

	if err != nil {
		c.Status(fiber.StatusInternalServerError).JSON(util.ErrorResponse(err))
		return err
	}

	id, _ := body["id"].(string)

	argv := db.CreateOrderParams{
		OrderID:           id,
		UserID:            sql.NullInt32{Int32: int32(userId), Valid: true},
		Price:             sql.NullInt32{Int32: subTotal, Valid: true},
		DeliveryPrice:     sql.NullInt32{Int32: deliveryPriceTotal, Valid: true},
		Total:             sql.NullInt32{Int32: total, Valid: true},
		BillingFirstName:  req.BillingFirstName,
		BillingLastName:   req.BillingLastName,
		BillingEmail:      req.BillingEmail,
		BillingAddress:    sql.NullString{String: req.BillingAddress, Valid: true},
		BillingPhone:      sql.NullString{String: req.BillingPhone, Valid: true},
		ShippingFirstName: req.ShippingFirstName,
		ShippingLastName:  req.ShippingLastName,
		ShippingEmail:     req.ShippingEmail,
		ShippingAddress:   sql.NullString{String: req.ShippingAddress, Valid: true},
		ShippingPhone:     sql.NullString{String: req.ShippingPhone, Valid: true},
	}

	orderId, err := db.DBQuery.CreateOrder(c.Context(), argv)

	if err != nil {
		c.Status(fiber.StatusInternalServerError).JSON(util.ErrorResponse(err))
		return err
	}

	for _, value := range cartItems {
		argv2 := db.CreateOrderItemParams{
			OrderID:       sql.NullString{String: orderId, Valid: true},
			ProductID:     value.ProductID,
			ProductPrice:  value.Price.Int32,
			Quantity:      value.Quantity.Int32,
			DeliveryPrice: value.DeliveryPrice.Int32,
		}

		db.DBQuery.CreateOrderItem(c.Context(), argv2)
	}

	payload := map[string]interface{}{
		"orderId":       orderId,
		"subTotal":      subTotal,
		"deliveryPrice": deliveryPriceTotal,
		"total":         total,
		"discountTotal": discountTotal,
	}

	c.Status(fiber.StatusOK).JSON(util.SuccessResponse(payload, "order created successfully"))
	return nil
}

type confirmOrderSchema struct {
	PaymentId string `json:"paymentId" binding:"required"`
	OrderId   string `json:"orderId" binding:"required"`
	Signature string `json:"signature" binding:"required"`
}

// @Summary: it validates signature of paid order to make sure that it is not altered
//
// @Router /order/v1/confirm-order [post]
func confirmOrder(c *fiber.Ctx) error {
	req := new(confirmOrderSchema)
	if err := c.BodyParser(req); err != nil {
		c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
		return err
	}

	status := util.VerifyRazorpaySignature(req.OrderId, req.PaymentId, req.Signature)

	if !status {
		c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(errors.New("signature is invalid")))
		return nil
	}

	argv := db.ConfirmOrderPaymentParams{
		OrderID:              req.OrderId,
		TransactionSignature: sql.NullString{String: req.Signature, Valid: true},
		PaymentID:            sql.NullString{String: req.PaymentId, Valid: true},
	}

	db.DBQuery.ConfirmOrderPayment(c.Context(), argv)

	c.Status(fiber.StatusOK).JSON(util.SuccessResponse(status, "order confirm"))
	return nil
}
