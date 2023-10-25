package product

import (
	"context"
	"strconv"

	db "github.com/Xebec19/e-commerce/api/db/sqlc"
	"github.com/Xebec19/e-commerce/api/util"
	"github.com/gofiber/fiber/v2"
)

func readProducts(c *fiber.Ctx) error {
	page, err := strconv.Atoi(c.Query("page", "0"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	size, err := strconv.Atoi(c.Query("size", "0"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	args := db.ReadAllProductsParams{
		Limit:  int32(size),
		Offset: int32(page * size),
	}

	products, err := db.DBQuery.ReadAllProducts(context.Background(), args)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(util.ErrorResponse(err))
	}

	return c.Status(fiber.StatusOK).JSON(util.SuccessResponse(products, "Products fetched successfully"))
}

func readCategories(c *fiber.Ctx) error {
	category, err := db.DBQuery.ReadAllCategories(context.Background())

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	return c.Status(fiber.StatusOK).JSON(util.SuccessResponse(category, "Category fetched successfully"))
}

func readCategoryItems(c *fiber.Ctx) error {
	categoryId, err := strconv.Atoi(c.Params("cid", "0"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	page, err := strconv.Atoi(c.Query("page", "0"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	size, err := strconv.Atoi(c.Query("size", "0"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	argv := db.ReadCategoryItemsParams{
		CategoryID: int32(categoryId),
		Offset:     int32(page) * int32(size),
		Limit:      int32(size),
	}

	items, err := db.DBQuery.ReadCategoryItems(context.Background(), argv)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(util.ErrorResponse(err))
	}

	return c.Status(fiber.StatusFound).JSON(util.SuccessResponse(items, "Category items fetched"))
}

func readOneProduct(c *fiber.Ctx) error {
	productId, err := strconv.Atoi(c.Params("pid", "0"))

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	product, err := db.DBQuery.ReadOneProduct(context.Background(), int32(productId))

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(util.ErrorResponse(err))
	}

	return c.Status(fiber.StatusFound).JSON(util.SuccessResponse(product, "Product fetched"))
}
