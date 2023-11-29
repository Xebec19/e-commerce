package webhook

import (
	"errors"

	db "github.com/Xebec19/e-commerce/client-api/db/sqlc"
	"github.com/Xebec19/e-commerce/client-api/util"
	"github.com/gofiber/fiber/v2"
)

// @Summary: it gets triggered by razorpay when an order is confirmed
//
// @Router: /webhook/razorpay/payment [post]
func paymentCapture(c *fiber.Ctx) error {
	body := string(c.Body())
	event, err := util.ParseRazorpayWebhookEvent(body)
	if err != nil {
		c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
		return err
	}

	if event.Type == "payment.captured" {
		orderId := event.Payload.Payment.Entity.OrderId
		db.DBQuery.CapturePayment(c.Context(), orderId)

		c.Status(fiber.StatusOK).JSON(util.SuccessResponse(nil, "hi"))
		return nil
	}

	c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(errors.New("unknown event")))
	return errors.New("unknown event")
}
