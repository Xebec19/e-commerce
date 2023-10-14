package order

import "github.com/gofiber/fiber"

func SetRoute(app *fiber.App) {
	router := app.Group("/order")
	// todo make it a post route
	// todo and check if user is making order
	// todo of only those products of which she
	// todo has made order
	router.Get("/read-order")
	router.Get("/order-details")
}
