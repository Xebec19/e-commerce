package middleware

import (
	"github.com/Xebec19/e-commerce/api/util"
	"github.com/gofiber/fiber"
)

// it checks if the request is signed with jwt header
func JwtVerify(ctx *fiber.Ctx) error {
	token := ctx.Get("Authorization")
	claims, err := util.VerifyToken(token)

	if err != nil {
		return ctx.Status(fiber.StatusUnauthorized).JSON(util.ErrorResponse(err))
	}

	ctx.Locals("user", claims)

	ctx.Next()
	return nil
}
