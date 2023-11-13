package order

import (
	db "github.com/Xebec19/e-commerce/api/db/sqlc"
	"github.com/Xebec19/e-commerce/api/util"
	"github.com/gofiber/fiber/v2"
)

// @Summary	get list of orders in paginated way
// @Router		/order/read-order [get]
func listOrders(c *fiber.Ctx) error {
	userId := c.Locals("userid").(int64)

	orders, err := db.DBQuery.ListOrder(c.Context(), int32(userId))

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(util.SuccessResponse(nil, "Order Creation Failed"))
	}

	return c.Status(fiber.StatusFound).JSON(util.SuccessResponse(orders, "Orders Fetched"))
}

// @Summary	It sends list of items included in an order
//
// @Router		/order/order-details [get]
func listOrderItems(c *fiber.Ctx) error {
	return c.Status(fiber.StatusFound).JSON(util.SuccessResponse(nil, "Order Items Fetched"))
}

// @Summary prepares order
//
// @Router /order/create-order
func createOrder(c *fiber.Ctx) error {
	/**
	* todo create channels to insert order details
	* and calculate price and delivery using sync mutex
	* and then insert final record in order table
	 */
	c.Status(fiber.StatusOK).JSON(util.SuccessResponse(nil, "/order/create-order is working"))
	return nil
}
