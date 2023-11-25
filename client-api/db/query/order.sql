-- name: CreateOrder :one
INSERT INTO public.orders
(user_id, price, delivery_price, total, billing_first_name, billing_last_name, billing_email, billing_address, shipping_first_name, shipping_last_name, shipping_email, shipping_address, discount_id)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) returning order_id;

-- name: CreateOrderItem :exec
INSERT INTO public.order_details
(order_id, product_id, product_price, quantity, delivery_price)
VALUES($1, $2, $3, $4, $5);