package user

import (
	"github.com/gofiber/fiber/v2"
)

func SetRoute(app *fiber.App) {
	router := app.Group("/user")
	router.Get("/profile", readUser)
}
