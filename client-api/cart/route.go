package cart

import (
	"github.com/gofiber/fiber/v2"
)

func SetRoute(app *fiber.App) {
	router := app.Group("/cart")
	router.Get("/cart-details", getCartDetails)
	router.Post("/add-product", addProductIntoCart)
	router.Post("/remove-product", removeProductFromCart)
	router.Post("/delete-product", deleteProduct)
	router.Post("/add-discount", addDiscount)
	router.Get("/remove-discount", removeDiscount)
}
