package order

import "github.com/gofiber/fiber/v2"

func SetRoute(app *fiber.App) {
	router := app.Group("/order")

	router.Post("/v1/create-order", createOrder)
	router.Post("/v1/confirm-order", confirmOrder)
}
