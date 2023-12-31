// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.24.0
// source: discount.sql

package db

import (
	"context"
	"database/sql"
)

const getDiscount = `-- name: GetDiscount :one
select discount_id, code, type, value from public.discounts where lower(code) = lower($1) and status = 'active' and expired_on > current_timestamp
`

type GetDiscountRow struct {
	DiscountID int32         `json:"discount_id"`
	Code       string        `json:"code"`
	Type       NullEnumType  `json:"type"`
	Value      sql.NullInt32 `json:"value"`
}

func (q *Queries) GetDiscount(ctx context.Context, lower string) (GetDiscountRow, error) {
	row := q.db.QueryRowContext(ctx, getDiscount, lower)
	var i GetDiscountRow
	err := row.Scan(
		&i.DiscountID,
		&i.Code,
		&i.Type,
		&i.Value,
	)
	return i, err
}

const getDiscountCount = `-- name: GetDiscountCount :one
select count(discount_code) from orders where discount_code = $1 and user_id = $2
`

type GetDiscountCountParams struct {
	DiscountCode sql.NullString `json:"discount_code"`
	UserID       sql.NullInt32  `json:"user_id"`
}

func (q *Queries) GetDiscountCount(ctx context.Context, arg GetDiscountCountParams) (int64, error) {
	row := q.db.QueryRowContext(ctx, getDiscountCount, arg.DiscountCode, arg.UserID)
	var count int64
	err := row.Scan(&count)
	return count, err
}
