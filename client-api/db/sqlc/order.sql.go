// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.24.0
// source: order.sql

package db

import (
	"context"
	"database/sql"
)

const capturePayment = `-- name: CapturePayment :exec
UPDATE public.orders
SET status = 'processing'
WHERE order_id = $1 and status = 'pending-payment'
`

func (q *Queries) CapturePayment(ctx context.Context, orderID string) error {
	_, err := q.db.ExecContext(ctx, capturePayment, orderID)
	return err
}

const confirmOrderPayment = `-- name: ConfirmOrderPayment :exec
UPDATE public.orders
SET status = 'processing', payment_id = $1, transaction_signature = $2
WHERE order_id = $3
`

type ConfirmOrderPaymentParams struct {
	PaymentID            sql.NullString `json:"payment_id"`
	TransactionSignature sql.NullString `json:"transaction_signature"`
	OrderID              string         `json:"order_id"`
}

func (q *Queries) ConfirmOrderPayment(ctx context.Context, arg ConfirmOrderPaymentParams) error {
	_, err := q.db.ExecContext(ctx, confirmOrderPayment, arg.PaymentID, arg.TransactionSignature, arg.OrderID)
	return err
}

const createOrder = `-- name: CreateOrder :one
INSERT INTO public.orders
(order_id, user_id, price, delivery_price, total, billing_first_name, billing_last_name, billing_email, billing_address, billing_phone, shipping_first_name, shipping_last_name, shipping_email, shipping_address, shipping_phone, discount_code, discount_amount)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) returning order_id
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
	DiscountCode      sql.NullString `json:"discount_code"`
	DiscountAmount    sql.NullInt32  `json:"discount_amount"`
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
		arg.DiscountCode,
		arg.DiscountAmount,
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

const getOrder = `-- name: GetOrder :one
SELECT o.order_id, o.user_id, o.price, o.delivery_price, o.total, o.status, o.created_on, o.billing_first_name, o.billing_last_name, o.billing_email, o.billing_address, o.shipping_first_name, o.shipping_last_name, o.shipping_email, o.shipping_address, o.billing_phone, o.shipping_phone, o.payment_id, o.transaction_signature, o.discount_amount, o.discount_code, d.code as "discount_code" FROM public.orders o 
left join discounts d on d.code = o.discount_code 
WHERE order_id = $1
`

type GetOrderRow struct {
	OrderID              string              `json:"order_id"`
	UserID               sql.NullInt32       `json:"user_id"`
	Price                sql.NullInt32       `json:"price"`
	DeliveryPrice        sql.NullInt32       `json:"delivery_price"`
	Total                sql.NullInt32       `json:"total"`
	Status               NullEnumOrderStatus `json:"status"`
	CreatedOn            sql.NullTime        `json:"created_on"`
	BillingFirstName     string              `json:"billing_first_name"`
	BillingLastName      string              `json:"billing_last_name"`
	BillingEmail         string              `json:"billing_email"`
	BillingAddress       sql.NullString      `json:"billing_address"`
	ShippingFirstName    string              `json:"shipping_first_name"`
	ShippingLastName     string              `json:"shipping_last_name"`
	ShippingEmail        string              `json:"shipping_email"`
	ShippingAddress      sql.NullString      `json:"shipping_address"`
	BillingPhone         sql.NullString      `json:"billing_phone"`
	ShippingPhone        sql.NullString      `json:"shipping_phone"`
	PaymentID            sql.NullString      `json:"payment_id"`
	TransactionSignature sql.NullString      `json:"transaction_signature"`
	DiscountAmount       sql.NullInt32       `json:"discount_amount"`
	DiscountCode         sql.NullString      `json:"discount_code"`
	DiscountCode_2       sql.NullString      `json:"discount_code_2"`
}

func (q *Queries) GetOrder(ctx context.Context, orderID string) (GetOrderRow, error) {
	row := q.db.QueryRowContext(ctx, getOrder, orderID)
	var i GetOrderRow
	err := row.Scan(
		&i.OrderID,
		&i.UserID,
		&i.Price,
		&i.DeliveryPrice,
		&i.Total,
		&i.Status,
		&i.CreatedOn,
		&i.BillingFirstName,
		&i.BillingLastName,
		&i.BillingEmail,
		&i.BillingAddress,
		&i.ShippingFirstName,
		&i.ShippingLastName,
		&i.ShippingEmail,
		&i.ShippingAddress,
		&i.BillingPhone,
		&i.ShippingPhone,
		&i.PaymentID,
		&i.TransactionSignature,
		&i.DiscountAmount,
		&i.DiscountCode,
		&i.DiscountCode_2,
	)
	return i, err
}

const getOrderItems = `-- name: GetOrderItems :many
SELECT od.od_id, od.order_id, od.product_id, od.product_price, od.quantity, od.delivery_price, p.product_name, p.product_desc, p.category_id, pi2.image_url FROM public.order_details od
left join products p on p.product_id = od.product_id  
left join product_images pi2 on pi2.product_id = od.product_id
WHERE order_id = $1 and pi2.is_featured = true
`

type GetOrderItemsRow struct {
	OdID          int32          `json:"od_id"`
	OrderID       sql.NullString `json:"order_id"`
	ProductID     sql.NullInt32  `json:"product_id"`
	ProductPrice  int32          `json:"product_price"`
	Quantity      int32          `json:"quantity"`
	DeliveryPrice int32          `json:"delivery_price"`
	ProductName   sql.NullString `json:"product_name"`
	ProductDesc   sql.NullString `json:"product_desc"`
	CategoryID    sql.NullInt32  `json:"category_id"`
	ImageUrl      sql.NullString `json:"image_url"`
}

func (q *Queries) GetOrderItems(ctx context.Context, orderID sql.NullString) ([]GetOrderItemsRow, error) {
	rows, err := q.db.QueryContext(ctx, getOrderItems, orderID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetOrderItemsRow
	for rows.Next() {
		var i GetOrderItemsRow
		if err := rows.Scan(
			&i.OdID,
			&i.OrderID,
			&i.ProductID,
			&i.ProductPrice,
			&i.Quantity,
			&i.DeliveryPrice,
			&i.ProductName,
			&i.ProductDesc,
			&i.CategoryID,
			&i.ImageUrl,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getOrders = `-- name: GetOrders :many
SELECT o.order_id, o.price, o.delivery_price, o.total,
o.status, o.created_on, o.shipping_first_name, o.shipping_last_name, o.shipping_email,
o.shipping_address, o.shipping_phone, o.discount_code, o.discount_amount, COUNT(order_id) OVER () AS total_orders 
FROM public.orders o WHERE user_id = $1 order by created_on desc limit $2 offset $3
`

type GetOrdersParams struct {
	UserID sql.NullInt32 `json:"user_id"`
	Limit  int32         `json:"limit"`
	Offset int32         `json:"offset"`
}

type GetOrdersRow struct {
	OrderID           string              `json:"order_id"`
	Price             sql.NullInt32       `json:"price"`
	DeliveryPrice     sql.NullInt32       `json:"delivery_price"`
	Total             sql.NullInt32       `json:"total"`
	Status            NullEnumOrderStatus `json:"status"`
	CreatedOn         sql.NullTime        `json:"created_on"`
	ShippingFirstName string              `json:"shipping_first_name"`
	ShippingLastName  string              `json:"shipping_last_name"`
	ShippingEmail     string              `json:"shipping_email"`
	ShippingAddress   sql.NullString      `json:"shipping_address"`
	ShippingPhone     sql.NullString      `json:"shipping_phone"`
	DiscountCode      sql.NullString      `json:"discount_code"`
	DiscountAmount    sql.NullInt32       `json:"discount_amount"`
	TotalOrders       int64               `json:"total_orders"`
}

func (q *Queries) GetOrders(ctx context.Context, arg GetOrdersParams) ([]GetOrdersRow, error) {
	rows, err := q.db.QueryContext(ctx, getOrders, arg.UserID, arg.Limit, arg.Offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetOrdersRow
	for rows.Next() {
		var i GetOrdersRow
		if err := rows.Scan(
			&i.OrderID,
			&i.Price,
			&i.DeliveryPrice,
			&i.Total,
			&i.Status,
			&i.CreatedOn,
			&i.ShippingFirstName,
			&i.ShippingLastName,
			&i.ShippingEmail,
			&i.ShippingAddress,
			&i.ShippingPhone,
			&i.DiscountCode,
			&i.DiscountAmount,
			&i.TotalOrders,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}
