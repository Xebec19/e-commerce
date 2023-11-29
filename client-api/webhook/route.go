package webhook

import "github.com/gofiber/fiber/v2"

func SetRoute(app *fiber.App) {
	router := app.Group("/webhook")

	rz := router.Group("/razorpay")
	rz.Post("/payment", confirmOrder)
}
