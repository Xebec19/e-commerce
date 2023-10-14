package util

import "github.com/gofiber/fiber/v2"

func ErrResponse(err error) fiber.Map {
	return fiber.Map{
		"status":  false,
		"payload": err.Error(),
		"message": err.Error(),
	}
}

func SuccessResponse(data interface{}, message string) fiber.Map {
	return fiber.Map{
		"status":  true,
		"payload": data,
		"message": message,
	}
}
