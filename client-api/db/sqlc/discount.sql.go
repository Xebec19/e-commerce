// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.23.0
// source: discount.sql

package db

import (
	"context"
	"database/sql"
)

const getDiscount = `-- name: GetDiscount :one
select code, type, value from public.discounts where lower(code) = lower($1) and status = 'active' and expired_on > current_timestamp
`

type GetDiscountRow struct {
	Code  string        `json:"code"`
	Type  NullType      `json:"type"`
	Value sql.NullInt32 `json:"value"`
}

func (q *Queries) GetDiscount(ctx context.Context, lower string) (GetDiscountRow, error) {
	row := q.db.QueryRowContext(ctx, getDiscount, lower)
	var i GetDiscountRow
	err := row.Scan(&i.Code, &i.Type, &i.Value)
	return i, err
}