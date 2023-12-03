package order

import "github.com/gofiber/fiber/v2"

func SetRoute(app *fiber.App) {
	router := app.Group("/order")
	router.Post("/v1/create-order", createOrder)
	router.Post("/v1/confirm-order", confirmOrder)
	router.Get("/v1/get-order/:orderId", getOrder)
	router.Get("/v1/get-orders", getOrders)
}
