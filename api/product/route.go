package product

import "github.com/gofiber/fiber/v2"

func SetRoute(app *fiber.App) {
	router := app.Group("/product")
	router.Get("/v1/list", readProducts)
	router.Get("/v1/category-list", readCategories)
	router.Get("/v1/category/:cid", readCategoryItems)
	router.Get("/v1/details/:pid", readOneProduct)
}
