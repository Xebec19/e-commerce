-- name: CreateOrder :one
INSERT INTO public.orders
(order_id, user_id, price, delivery_price, total, billing_first_name, billing_last_name, billing_email, billing_address, billing_phone, shipping_first_name, shipping_last_name, shipping_email, shipping_address, shipping_phone, discount_code, discount_amount)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) returning order_id;

-- name: CreateOrderItem :exec
INSERT INTO public.order_details
(order_id, product_id, product_price, quantity, delivery_price)
VALUES($1, $2, $3, $4, $5);

-- name: ConfirmOrderPayment :exec
UPDATE public.orders
SET status = 'processing', payment_id = $1, transaction_signature = $2
WHERE order_id = $3;

-- name: GetOrder :one
SELECT o.*, d.code as "discount_code" FROM public.orders o 
left join discounts d on d.code = o.discount_code 
WHERE order_id = $1;

-- name: GetOrderItems :many
SELECT od.*, p.product_name, p.product_desc, p.category_id, pi2.image_url FROM public.order_details od
left join products p on p.product_id = od.product_id  
left join product_images pi2 on pi2.product_id = od.product_id
WHERE order_id = $1 and pi2.is_featured = true;