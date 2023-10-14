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

// @Summary Add a product to user's cart
// @Router /cart/add-product
func addProductIntoCart(c *fiber.Ctx) error {
	req := new(updateCartSchema)
	userId := c.Locals("userid").(int64)
	// parse and validate request body
	if err := c.BodyParser(req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
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

	if cartDetail.(int64) == 0 {
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

type deleteCartSchema struct {
	ProductId int32 `json:"product_id" binding:"required"`
	Quantity  int32 `json:"quantity" binding:"required"`
}

// @Summary Remove a product from user's cart
// @Router /cart/remove-product
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

	if cartDetail.(int64) == 0 {
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
