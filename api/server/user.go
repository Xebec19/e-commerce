package server

import (
	"github.com/Xebec19/e-commerce/api/util"
	"github.com/gofiber/fiber/v2"
)

func (server *Server) userHealth(c *fiber.Ctx) error {
	c.Status(fiber.StatusAccepted).JSON(util.SuccessResponse(nil, "Active"))
	return nil
}
