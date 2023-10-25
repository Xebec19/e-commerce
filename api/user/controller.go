package user

import (
	"context"

	db "github.com/Xebec19/e-commerce/api/db/sqlc"
	"github.com/Xebec19/e-commerce/api/util"
	"github.com/gofiber/fiber/v2"
)

func readUser(c *fiber.Ctx) error {
	userId := c.Locals("userid").(int64)

	user, err := db.DBQuery.ReadUser(context.Background(), int32(userId))

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	c.Status(fiber.StatusOK).JSON(util.SuccessResponse(user, "User found"))
	return nil
}
