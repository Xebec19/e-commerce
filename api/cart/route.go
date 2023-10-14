package cart

import (
	"github.com/gofiber/fiber/v2"
)

func SetRoute(app *fiber.App) {
	router := app.Group("/cart")
	router.Post("/add-product", addProductIntoCart)
	router.Post("/remove-product", removeProductFromCart)
}
