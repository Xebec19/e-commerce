-- name: CreateOrder :one
INSERT INTO public.orders
(order_id, user_id, price, delivery_price, total, billing_first_name, billing_last_name, billing_email, billing_address, billing_phone, shipping_first_name, shipping_last_name, shipping_email, shipping_address, shipping_phone, discount_id)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) returning order_id;

-- name: CreateOrderItem :exec
INSERT INTO public.order_details
(order_id, product_id, product_price, quantity, delivery_price)
VALUES($1, $2, $3, $4, $5);

-- name: ConfirmOrderPayment :exec
UPDATE public.orders
SET status = 'processing', payment_id = $1, transaction_signature = $2
WHERE order_id = $3;
