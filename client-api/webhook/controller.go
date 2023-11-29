package webhook

import (
	"github.com/Xebec19/e-commerce/client-api/util"
	"github.com/gofiber/fiber/v2"
)

// @Summary: it gets triggered by razorpay when an order is confirmed
//
// @Router: /webhook/razorpay/payment [post]
func confirmOrder(c *fiber.Ctx) error {
	c.Status(fiber.StatusOK).JSON(util.SuccessResponse(nil, "hi"))
	return nil
}
