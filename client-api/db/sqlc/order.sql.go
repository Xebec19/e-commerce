// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.24.0
// source: order.sql

package db

import (
	"context"
	"database/sql"
)

const createOrder = `-- name: CreateOrder :one
INSERT INTO public.orders
(order_id, user_id, price, delivery_price, total, billing_first_name, billing_last_name, billing_email, billing_address, billing_phone, shipping_first_name, shipping_last_name, shipping_email, shipping_address, shipping_phone, discount_id)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) returning order_id
`

type CreateOrderParams struct {
	OrderID           string         `json:"order_id"`
	UserID            sql.NullInt32  `json:"user_id"`
	Price             sql.NullInt32  `json:"price"`
	DeliveryPrice     sql.NullInt32  `json:"delivery_price"`
	Total             sql.NullInt32  `json:"total"`
	BillingFirstName  string         `json:"billing_first_name"`
	BillingLastName   string         `json:"billing_last_name"`
	BillingEmail      string         `json:"billing_email"`
	BillingAddress    sql.NullString `json:"billing_address"`
	BillingPhone      sql.NullString `json:"billing_phone"`
	ShippingFirstName string         `json:"shipping_first_name"`
	ShippingLastName  string         `json:"shipping_last_name"`
	ShippingEmail     string         `json:"shipping_email"`
	ShippingAddress   sql.NullString `json:"shipping_address"`
	ShippingPhone     sql.NullString `json:"shipping_phone"`
	DiscountID        sql.NullInt32  `json:"discount_id"`
}

func (q *Queries) CreateOrder(ctx context.Context, arg CreateOrderParams) (string, error) {
	row := q.db.QueryRowContext(ctx, createOrder,
		arg.OrderID,
		arg.UserID,
		arg.Price,
		arg.DeliveryPrice,
		arg.Total,
		arg.BillingFirstName,
		arg.BillingLastName,
		arg.BillingEmail,
		arg.BillingAddress,
		arg.BillingPhone,
		arg.ShippingFirstName,
		arg.ShippingLastName,
		arg.ShippingEmail,
		arg.ShippingAddress,
		arg.ShippingPhone,
		arg.DiscountID,
	)
	var order_id string
	err := row.Scan(&order_id)
	return order_id, err
}

const createOrderItem = `-- name: CreateOrderItem :exec
INSERT INTO public.order_details
(order_id, product_id, product_price, quantity, delivery_price)
VALUES($1, $2, $3, $4, $5)
`

type CreateOrderItemParams struct {
	OrderID       sql.NullString `json:"order_id"`
	ProductID     sql.NullInt32  `json:"product_id"`
	ProductPrice  int32          `json:"product_price"`
	Quantity      int32          `json:"quantity"`
	DeliveryPrice int32          `json:"delivery_price"`
}

func (q *Queries) CreateOrderItem(ctx context.Context, arg CreateOrderItemParams) error {
	_, err := q.db.ExecContext(ctx, createOrderItem,
		arg.OrderID,
		arg.ProductID,
		arg.ProductPrice,
		arg.Quantity,
		arg.DeliveryPrice,
	)
	return err
}
