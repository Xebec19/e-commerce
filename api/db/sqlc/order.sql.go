// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.23.0
// source: order.sql

package db

import (
	"context"
	"database/sql"
)

const getDiscountCount = `-- name: GetDiscountCount :one
select count(order_id) from orders where discount_code = $1
`

func (q *Queries) GetDiscountCount(ctx context.Context, discountCode sql.NullString) (int64, error) {
	row := q.db.QueryRowContext(ctx, getDiscountCount, discountCode)
	var count int64
	err := row.Scan(&count)
	return count, err
}

const getOrderDetails = `-- name: GetOrderDetails :many
select od_id, order_id, product_id, product_price, quantity, delivery_price
from order_details od where order_id = $1
`

func (q *Queries) GetOrderDetails(ctx context.Context, orderID sql.NullString) ([]OrderDetail, error) {
	rows, err := q.db.QueryContext(ctx, getOrderDetails, orderID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []OrderDetail
	for rows.Next() {
		var i OrderDetail
		if err := rows.Scan(
			&i.OdID,
			&i.OrderID,
			&i.ProductID,
			&i.ProductPrice,
			&i.Quantity,
			&i.DeliveryPrice,
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

const listOrder = `-- name: ListOrder :many
select order_id, price, delivery_price, total from orders o where user_id = $1
`

type ListOrderRow struct {
	OrderID       string `json:"order_id"`
	Price         string `json:"price"`
	DeliveryPrice string `json:"delivery_price"`
	Total         string `json:"total"`
}

func (q *Queries) ListOrder(ctx context.Context, userID int32) ([]ListOrderRow, error) {
	rows, err := q.db.QueryContext(ctx, listOrder, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []ListOrderRow
	for rows.Next() {
		var i ListOrderRow
		if err := rows.Scan(
			&i.OrderID,
			&i.Price,
			&i.DeliveryPrice,
			&i.Total,
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
