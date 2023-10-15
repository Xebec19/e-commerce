package cart

import (
	"context"
	"database/sql"
	"errors"

	db "github.com/Xebec19/e-commerce/api/db/sqlc"
	"github.com/Xebec19/e-commerce/api/util"
	"github.com/gofiber/fiber/v2"
)

type updateCartSchema struct {
	ProductId int32 `json:"product_id" binding:"required"`
	Quantity  int32 `json:"quantity" binding:"required"`
}

// @Summary	Add a product to user's cart
// @Router		/cart/add-product [post]
func addProductIntoCart(c *fiber.Ctx) error {
	req := new(updateCartSchema)
	userId := c.Locals("userid").(int64)
	// parse and validate request body
	if err := c.BodyParser(req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	cartCount, err := db.DBQuery.CountCartId(context.Background(), sql.NullInt32{Int32: int32(userId), Valid: true})

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(util.ErrorResponse(err))
	}

	if cartCount == 0 {
		err := db.DBQuery.CreateCart(context.Background(), sql.NullInt32{Int32: int32(userId), Valid: true})

		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(util.ErrorResponse(err))
		}
	}

	cartId, err := db.DBQuery.GetCartID(context.Background(), sql.NullInt32{Int32: int32(userId), Valid: true})

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(util.ErrorResponse(err))
	}

	quantity, err := db.DBQuery.ReadProductQuantity(c.Context(), req.ProductId)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(util.ErrorResponse(err))
	}

	if req.Quantity > quantity.Int32 {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(errors.New("out of stock")))
	}

	cartDetailArgs := db.CheckCartDetailParams{
		CartID:    sql.NullInt32{Int32: int32(cartId), Valid: true},
		ProductID: sql.NullInt32{Int32: int32(req.ProductId), Valid: true},
	}

	cartDetail, err := db.DBQuery.CheckCartDetail(c.Context(), cartDetailArgs)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(util.ErrorResponse(err))
	}

	if cartDetail == 0 {
		insertCartItemArgv := db.InsertCartItemParams{
			CartID:    sql.NullInt32{Int32: int32(cartId), Valid: true},
			ProductID: sql.NullInt32{Int32: int32(req.ProductId), Valid: true},
			Quantity:  sql.NullInt32{Int32: int32(req.Quantity), Valid: true},
		}

		db.DBQuery.InsertCartItem(c.Context(), insertCartItemArgv)

		return c.Status(fiber.StatusCreated).JSON(util.SuccessResponse(nil, "Product Added Successfully"))
	}

	updateCartArgv := db.UpdateCartItemQuantityParams{
		Quantity:  sql.NullInt32{Int32: int32(req.Quantity), Valid: true},
		ProductID: sql.NullInt32{Int32: int32(req.ProductId), Valid: true},
		CartID:    sql.NullInt32{Int32: int32(cartId), Valid: true},
	}

	db.DBQuery.UpdateCartItemQuantity(c.Context(), updateCartArgv)

	return c.Status(fiber.StatusCreated).JSON(util.SuccessResponse(nil, "Product Added Successfully"))
}

type deleteProductSchema struct {
	ProductId int32 `json:"product_id" binding:"required"`
}

// @Summary	Delete a product from user's cart
//
// @Router		/cart/delete-product [post]
func deleteProduct(c *fiber.Ctx) error {
	req := new(deleteProductSchema)
	userId := c.Locals("userid").(int64)
	if err := c.BodyParser(req); err != nil {
		c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	cartId, err := db.DBQuery.GetCartID(context.Background(), sql.NullInt32{Int32: int32(userId), Valid: true})

	if err != nil {
		c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	deleteCartItemParams := db.DeleteCartItemParams{
		ProductID: sql.NullInt32{Int32: int32(req.ProductId), Valid: true},
		CartID:    sql.NullInt32{Int32: int32(cartId), Valid: true},
	}

	db.DBQuery.DeleteCartItem(c.Context(), deleteCartItemParams)
	c.Status(fiber.StatusAccepted).JSON(util.SuccessResponse(nil, "Product Removed Successfully"))
	return nil
}

type deleteCartSchema struct {
	ProductId int32 `json:"product_id" binding:"required"`
	Quantity  int32 `json:"quantity" binding:"required"`
}

// @Summary	Remove a product from user's cart
// @Router		/cart/remove-product [post]
func removeProductFromCart(c *fiber.Ctx) error {
	req := new(deleteCartSchema)
	userId := c.Locals("userid").(int64)
	if err := c.BodyParser(req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	cartId, err := db.DBQuery.GetCartID(context.Background(), sql.NullInt32{Int32: int32(userId), Valid: true})

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(util.ErrorResponse(err))
	}

	argv := db.ReadCartItemQuantityParams{
		CartID:    sql.NullInt32{Int32: int32(cartId), Valid: true},
		ProductID: sql.NullInt32{Int32: int32(req.ProductId), Valid: true},
	}

	quantity, err := db.DBQuery.ReadCartItemQuantity(c.Context(), argv)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(util.ErrorResponse(err))
	}

	cartDetailArgs := db.CheckCartDetailParams{
		CartID:    sql.NullInt32{Int32: int32(cartId), Valid: true},
		ProductID: sql.NullInt32{Int32: int32(req.ProductId), Valid: true},
	}

	cartDetail, err := db.DBQuery.CheckCartDetail(c.Context(), cartDetailArgs)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(util.ErrorResponse(err))
	}

	if cartDetail == 0 {
		return c.Status(fiber.StatusInternalServerError).JSON(util.ErrorResponse(errors.New("product not found")))
	}

	if quantity.Int32 > int32(req.Quantity) {
		argv := db.RemoveCartItemParams{
			Quantity:  sql.NullInt32{Int32: int32(req.Quantity), Valid: true},
			ProductID: sql.NullInt32{Int32: int32(req.ProductId), Valid: true},
			CartID:    sql.NullInt32{Int32: int32(cartId), Valid: true},
		}

		db.DBQuery.RemoveCartItem(c.Context(), argv)
		return c.Status(fiber.StatusAccepted).JSON(util.SuccessResponse(nil, "Product Removed Successfully"))
	}

	deleteCartItemParams := db.DeleteCartItemParams{
		ProductID: sql.NullInt32{Int32: int32(req.ProductId), Valid: true},
		CartID:    sql.NullInt32{Int32: int32(cartId), Valid: true},
	}

	db.DBQuery.DeleteCartItem(c.Context(), deleteCartItemParams)
	return c.Status(fiber.StatusAccepted).JSON(util.SuccessResponse(nil, "Product Removed Successfully"))
}

type addDiscountSchema struct {
	DiscountCode string `json:"code" binding:"required"`
}

// @Summary apply discount to cart
//
// @Router /cart/add-discount
func addDiscount(c *fiber.Ctx) error {

	req := new(addDiscountSchema)
	userId := c.Locals("userid").(int64)

	if err := c.BodyParser(req); err != nil {
		c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	discountCode, err := db.DBQuery.GetDiscount(context.Background(), req.DiscountCode)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(util.ErrorResponse(err))
	}

	// check if given discount has been applied previously
	discountCount, err := db.DBQuery.GetDiscountCount(context.Background(), sql.NullString{String: discountCode, Valid: true})

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(util.ErrorResponse(err))
	}

	if discountCount > 0 {
		c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(errors.New("invalid discount code")))
		return nil
	}

	cartId, err := db.DBQuery.GetCartID(context.Background(), sql.NullInt32{Int32: int32(userId), Valid: true})

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(util.ErrorResponse(err))
	}

	addDiscountParams := db.AddDiscountParams{
		DiscountCode: sql.NullString{String: discountCode, Valid: true},
		CartID:       cartId,
	}

	db.DBQuery.AddDiscount(context.Background(), addDiscountParams)

	c.Status(fiber.StatusCreated).JSON(util.SuccessResponse(nil, "Discount Added"))
	return nil
}

func removeDiscount(c *fiber.Ctx) error {
	userId := c.Locals("userid").(int64)

	cartId, err := db.DBQuery.GetCartID(context.Background(), sql.NullInt32{Int32: int32(userId), Valid: true})

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(util.ErrorResponse(err))
	}

	removeDiscountParams := db.RemoveDiscountParams{
		CartID: cartId,
		UserID: sql.NullInt32{Int32: int32(userId), Valid: true},
	}

	db.DBQuery.RemoveDiscount(context.Background(), removeDiscountParams)

	c.Status(fiber.StatusOK).JSON(util.SuccessResponse(nil, "Discount Removed"))

	return nil
}

func getCartDetails(c *fiber.Ctx) error {
	userId := c.Locals("userid").(int64)

	cartId, err := db.DBQuery.GetCartID(context.Background(), sql.NullInt32{Int32: int32(userId), Valid: true})

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(util.ErrorResponse(err))
	}

	cartDetails, err := db.DBQuery.GetCartDetails(context.Background(), sql.NullInt32{Int32: int32(userId), Valid: true})

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(util.ErrorResponse(err))
	}

	cartItems, err := db.DBQuery.GetCartItems(context.Background(), sql.NullInt32{Int32: int32(cartId), Valid: true})

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(util.ErrorResponse(err))
	}

	result := make(map[string]interface{})

	result["cart"] = cartDetails
	result["items"] = cartItems

	c.Status(fiber.StatusOK).JSON(util.SuccessResponse(result, "Cart Fetched"))
	return nil
}