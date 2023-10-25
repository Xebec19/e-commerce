// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.23.0
// source: cart.sql

package db

import (
	"context"
	"database/sql"
)

const addDiscount = `-- name: AddDiscount :exec
update carts set discount_code = $2 where cart_id = $1
`

type AddDiscountParams struct {
	CartID       int32          `json:"cart_id"`
	DiscountCode sql.NullString `json:"discount_code"`
}

func (q *Queries) AddDiscount(ctx context.Context, arg AddDiscountParams) error {
	_, err := q.db.ExecContext(ctx, addDiscount, arg.CartID, arg.DiscountCode)
	return err
}

const checkCartDetail = `-- name: CheckCartDetail :one
select case when count(quantity) > 0 then 1 else 0 end as product_quantity from cart_details cd 
where cart_id = $1 and product_id = $2
`

type CheckCartDetailParams struct {
	CartID    sql.NullInt32 `json:"cart_id"`
	ProductID sql.NullInt32 `json:"product_id"`
}

func (q *Queries) CheckCartDetail(ctx context.Context, arg CheckCartDetailParams) (int32, error) {
	row := q.db.QueryRowContext(ctx, checkCartDetail, arg.CartID, arg.ProductID)
	var product_quantity int32
	err := row.Scan(&product_quantity)
	return product_quantity, err
}

const countCartId = `-- name: CountCartId :one
select count(cart_id) from carts c where user_id = $1
`

func (q *Queries) CountCartId(ctx context.Context, userID sql.NullInt32) (int64, error) {
	row := q.db.QueryRowContext(ctx, countCartId, userID)
	var count int64
	err := row.Scan(&count)
	return count, err
}

const createCart = `-- name: CreateCart :exec
insert into carts (user_id) values ($1)
`

func (q *Queries) CreateCart(ctx context.Context, userID sql.NullInt32) error {
	_, err := q.db.ExecContext(ctx, createCart, userID)
	return err
}

const deleteCartItem = `-- name: DeleteCartItem :exec
delete from cart_details where cart_id = $1 and product_id = $2
`

type DeleteCartItemParams struct {
	CartID    sql.NullInt32 `json:"cart_id"`
	ProductID sql.NullInt32 `json:"product_id"`
}

func (q *Queries) DeleteCartItem(ctx context.Context, arg DeleteCartItemParams) error {
	_, err := q.db.ExecContext(ctx, deleteCartItem, arg.CartID, arg.ProductID)
	return err
}

const getCartDetails = `-- name: GetCartDetails :one
select cart_id, discount_code from carts where user_id = $1
`

type GetCartDetailsRow struct {
	CartID       int32          `json:"cart_id"`
	DiscountCode sql.NullString `json:"discount_code"`
}

func (q *Queries) GetCartDetails(ctx context.Context, userID sql.NullInt32) (GetCartDetailsRow, error) {
	row := q.db.QueryRowContext(ctx, getCartDetails, userID)
	var i GetCartDetailsRow
	err := row.Scan(&i.CartID, &i.DiscountCode)
	return i, err
}

const getCartID = `-- name: GetCartID :one
select cart_id from carts where user_id = $1
`

func (q *Queries) GetCartID(ctx context.Context, userID sql.NullInt32) (int32, error) {
	row := q.db.QueryRowContext(ctx, getCartID, userID)
	var cart_id int32
	err := row.Scan(&cart_id)
	return cart_id, err
}

const getCartItems = `-- name: GetCartItems :many
select cd.cd_id, cd.cart_id, cd.product_id, cd.quantity, p.product_name, 
p.product_image, p.price, p.product_desc, p.delivery_price  
from cart_details cd 
left join products p on p.product_id = cd.product_id where cd.cart_id = $1
`

type GetCartItemsRow struct {
	CdID          int32          `json:"cd_id"`
	CartID        sql.NullInt32  `json:"cart_id"`
	ProductID     sql.NullInt32  `json:"product_id"`
	Quantity      sql.NullInt32  `json:"quantity"`
	ProductName   sql.NullString `json:"product_name"`
	ProductImage  sql.NullString `json:"product_image"`
	Price         sql.NullString `json:"price"`
	ProductDesc   sql.NullString `json:"product_desc"`
	DeliveryPrice sql.NullString `json:"delivery_price"`
}

func (q *Queries) GetCartItems(ctx context.Context, cartID sql.NullInt32) ([]GetCartItemsRow, error) {
	rows, err := q.db.QueryContext(ctx, getCartItems, cartID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetCartItemsRow
	for rows.Next() {
		var i GetCartItemsRow
		if err := rows.Scan(
			&i.CdID,
			&i.CartID,
			&i.ProductID,
			&i.Quantity,
			&i.ProductName,
			&i.ProductImage,
			&i.Price,
			&i.ProductDesc,
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

const insertCartItem = `-- name: InsertCartItem :exec
insert into cart_details (cart_id,product_id,product_price,quantity,delivery_price)
values($1,$2,(select price from products p where p.product_id = $2),$3,
(select delivery_price from products p where p.product_id = $2))
`

type InsertCartItemParams struct {
	CartID    sql.NullInt32 `json:"cart_id"`
	ProductID sql.NullInt32 `json:"product_id"`
	Quantity  sql.NullInt32 `json:"quantity"`
}

func (q *Queries) InsertCartItem(ctx context.Context, arg InsertCartItemParams) error {
	_, err := q.db.ExecContext(ctx, insertCartItem, arg.CartID, arg.ProductID, arg.Quantity)
	return err
}

const readCartItemQuantity = `-- name: ReadCartItemQuantity :one
select quantity from cart_details where cart_id = $1 and product_id = $2
`

type ReadCartItemQuantityParams struct {
	CartID    sql.NullInt32 `json:"cart_id"`
	ProductID sql.NullInt32 `json:"product_id"`
}

func (q *Queries) ReadCartItemQuantity(ctx context.Context, arg ReadCartItemQuantityParams) (sql.NullInt32, error) {
	row := q.db.QueryRowContext(ctx, readCartItemQuantity, arg.CartID, arg.ProductID)
	var quantity sql.NullInt32
	err := row.Scan(&quantity)
	return quantity, err
}

const removeCartItem = `-- name: RemoveCartItem :exec
update cart_details set quantity = quantity - $1 where cart_id = $2 and product_id = $3
`

type RemoveCartItemParams struct {
	Quantity  sql.NullInt32 `json:"quantity"`
	CartID    sql.NullInt32 `json:"cart_id"`
	ProductID sql.NullInt32 `json:"product_id"`
}

func (q *Queries) RemoveCartItem(ctx context.Context, arg RemoveCartItemParams) error {
	_, err := q.db.ExecContext(ctx, removeCartItem, arg.Quantity, arg.CartID, arg.ProductID)
	return err
}

const removeDiscount = `-- name: RemoveDiscount :exec
update carts set discount_code = null where cart_id = $1 and user_id = $2
`

type RemoveDiscountParams struct {
	CartID int32         `json:"cart_id"`
	UserID sql.NullInt32 `json:"user_id"`
}

func (q *Queries) RemoveDiscount(ctx context.Context, arg RemoveDiscountParams) error {
	_, err := q.db.ExecContext(ctx, removeDiscount, arg.CartID, arg.UserID)
	return err
}

const updateCartItemQuantity = `-- name: UpdateCartItemQuantity :exec
update cart_details set quantity = $1 + quantity where product_id = $2 and cart_id = $3
`

type UpdateCartItemQuantityParams struct {
	Quantity  sql.NullInt32 `json:"quantity"`
	ProductID sql.NullInt32 `json:"product_id"`
	CartID    sql.NullInt32 `json:"cart_id"`
}

func (q *Queries) UpdateCartItemQuantity(ctx context.Context, arg UpdateCartItemQuantityParams) error {
	_, err := q.db.ExecContext(ctx, updateCartItemQuantity, arg.Quantity, arg.ProductID, arg.CartID)
	return err
}
