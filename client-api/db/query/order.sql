-- name: ListOrder :many
select order_id, price, delivery_price, total from orders o where user_id = $1;

-- name: GetOrderDetails :many
select od_id, order_id, product_id, product_price, quantity, delivery_price
from order_details od where order_id = $1;

-- name: GetDiscountCount :one
select count(order_id) from orders where discount_code = $1;

-- name: CreateOrder :one
INSERT INTO public.orders
(order_id, user_id, price, delivery_price, total, created_on, email, address, discount_amount, discount_code)
VALUES($1, $2, $3, $4, $5, now(), $6, $7, $8, $9) RETURNING *;

-- name: CreateOrderDetails :exec
INSERT INTO public.order_details
(order_id, product_id, product_price, quantity, delivery_price)
VALUES($1, $2, $3, $4, $5);