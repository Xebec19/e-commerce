package order

import (
	"database/sql"
	"strconv"

	db "github.com/Xebec19/e-commerce/api/db/sqlc"
	"github.com/Xebec19/e-commerce/api/util"
	"github.com/gofiber/fiber/v2"
	gonanoid "github.com/matoous/go-nanoid/v2"
)

// @Summary	get list of orders in paginated way
//
// @Router		/order/read-order [get]
func listOrders(c *fiber.Ctx) error {
	userId := c.Locals("userid").(int64)

	orders, err := db.DBQuery.ListOrder(c.Context(), int32(userId))

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(util.SuccessResponse(nil, "Order Creation Failed"))
	}

	return c.Status(fiber.StatusFound).JSON(util.SuccessResponse(orders, "Orders Fetched"))
}

// @Summary	It sends list of items included in an order
//
// @Router		/order/order-details [get]
func listOrderItems(c *fiber.Ctx) error {
	return c.Status(fiber.StatusFound).JSON(util.SuccessResponse(nil, "Order Items Fetched"))
}

// @Summary prepares order
//
// @Router /order/create-order
func createOrder(c *fiber.Ctx) error {
	userId := c.Locals("userid").(int64)

	cartId, err := db.DBQuery.GetCartID(c.Context(), sql.NullInt32{Int32: int32(userId), Valid: true})

	if err != nil {
		c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
		return err
	}

	cartDetails, err := db.DBQuery.GetCartItems(c.Context(), sql.NullInt32{Int32: int32(cartId), Valid: true})

	if err != nil {
		c.Status(fiber.StatusInternalServerError).JSON(util.ErrorResponse(err))
		return err
	}

	var subTotal float32 = 0
	var deliveryCharges float32 = 0
	var total float32 = 0

	orderId, err := gonanoid.New()
	if err != nil {
		c.Status(fiber.StatusInternalServerError).JSON(util.ErrorResponse(err))
		return err
	}

	for _, item := range cartDetails {
		price, err := strconv.Atoi(item.Price.String)

		if err != nil {
			c.Status(fiber.StatusInternalServerError).JSON(util.ErrorResponse(err))
			return err
		}

		delPrice, err := strconv.Atoi(item.DeliveryPrice.String)

		if err != nil {
			c.Status(fiber.StatusInternalServerError).JSON(util.ErrorResponse(err))
			return err
		}

		subTotal += float32(item.Quantity.Int32) * float32(price)
		deliveryCharges += float32(delPrice)
		total += subTotal + deliveryCharges

		argv := db.CreateOrderDetailsParams{
			OrderID:       sql.NullString{String: orderId, Valid: true},
			ProductID:     item.ProductID,
			ProductPrice:  item.Price,
			Quantity:      item.Quantity,
			DeliveryPrice: item.DeliveryPrice,
		}

		db.DBQuery.CreateOrderDetails(c.Context(), argv)
	}

	argv := db.CreateOrderParams{
		OrderID: orderId,
		UserID: int32(userId),
		Price: "0",
		DeliveryPrice: "0",
		Total: "0",
		Email: ,
	}

	orderDetails, err := db.DBQuery.CreateOrder(c.Context(), )

	/**
	* todo create channels to insert order details
	* and calculate price and delivery using sync mutex
	* and then insert final record in order table
	 */
	c.Status(fiber.StatusOK).JSON(util.SuccessResponse(nil, "/order/create-order is working"))
	return nil
}
