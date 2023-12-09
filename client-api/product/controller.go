package product

import (
	"database/sql"
	"errors"
	"strconv"
	"strings"

	db "github.com/Xebec19/e-commerce/client-api/db/sqlc"
	"github.com/Xebec19/e-commerce/client-api/util"
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

	products, err := db.DBQuery.ReadAllProducts(c.Context(), args)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(util.ErrorResponse(err))
	}

	return c.Status(fiber.StatusOK).JSON(util.SuccessResponse(products, "Products fetched successfully"))
}

func readCategories(c *fiber.Ctx) error {
	category, err := db.DBQuery.ReadAllCategories(c.Context())

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	return c.Status(fiber.StatusOK).JSON(util.SuccessResponse(category, "Category fetched successfully"))
}

func readOneProduct(c *fiber.Ctx) error {
	slug := c.Params("slug", "0")
	entities := strings.Split(slug, "_")
	param := entities[len(entities)-1]
	productId, err := strconv.Atoi(param)

	product, err := db.DBQuery.ReadOneProduct(c.Context(), int32(productId))

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(util.ErrorResponse(err))
	}

	return c.Status(fiber.StatusOK).JSON(util.SuccessResponse(product, "Product fetched"))
}

func readNewProducts(c *fiber.Ctx) error {
	page, err := strconv.Atoi(c.Query("page", "0"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	size, err := strconv.Atoi(c.Query("size", "0"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	args := db.ReadNewProductsParams{
		Limit:  int32(size),
		Offset: int32(page * size),
	}

	products, err := db.DBQuery.ReadNewProducts(c.Context(), args)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(util.ErrorResponse(err))
	}

	c.Status(fiber.StatusOK).JSON(util.SuccessResponse(products, "Products fetched successfully"))
	return nil
}

// @Summary: returns same category products of given slug
//
// @Route: /product/v1/similar-products/:slug [get]
func readSimilarProduct(c *fiber.Ctx) error {

	slug := c.Params("slug", "0")
	entities := strings.Split(slug, "_")
	param := entities[len(entities)-1]
	productId, err := strconv.Atoi(param)

	if err != nil {
		c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
		return err
	}

	page, err := strconv.Atoi(c.Query("page", "0"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	size, err := strconv.Atoi(c.Query("size", "0"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	categoryId, err := db.DBQuery.ReadCategory(c.Context(), int32(productId))

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(errors.New("could not find product")))
	}

	categoryParams := db.ReadSimilarItemsParams{
		CategoryID: categoryId,
		ProductID:  int32(productId),
		Limit:      int32(size),
		Offset:     int32(page * size),
	}

	categoryItems, err := db.DBQuery.ReadSimilarItems(c.Context(), categoryParams)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(errors.New("could not find category items")))
	}

	c.Status(fiber.StatusOK).JSON(util.SuccessResponse(categoryItems, "similar products fetched"))

	return nil
}

// @Summary: returns array of product image of given product
//
// @Route /product/v1/product-images/:slug [get]
func readProductImages(c *fiber.Ctx) error {
	slug := c.Params("slug", "0")
	entities := strings.Split(slug, "_")
	productId, err := strconv.Atoi(entities[len(entities)-1])

	if err != nil {
		c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
		return err
	}

	productImages, err := db.DBQuery.GetProductImages(c.Context(), sql.NullInt32{Int32: int32(productId), Valid: true})

	if err != nil {
		c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(errors.New("could not fetch product images")))
		return err
	}

	c.Status(fiber.StatusOK).JSON(util.SuccessResponse(productImages, "product images fetched"))

	return nil
}

// @Summary: returns array of product for infinite scroll
//
// @Route /product/v1/products-scroll [get]
func readProductsScrolled(c *fiber.Ctx) error {
	page, err := strconv.Atoi(c.Query("page", "0"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	size, err := strconv.Atoi(c.Query("size", "0"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	argv := db.ReadProductsWithLengthParams{
		Limit:  int32(size),
		Offset: int32(page * size),
	}

	products, err := db.DBQuery.ReadProductsWithLength(c.Context(), argv)
	if err != nil {
		c.Status(fiber.StatusInternalServerError).JSON(util.ErrorResponse(errors.New("could not fetch products")))
		return err
	}

	c.Status(fiber.StatusOK).JSON(util.SuccessResponse(products, "products fetched"))
	return nil
}
