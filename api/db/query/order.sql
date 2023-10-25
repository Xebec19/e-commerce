-- name: ListOrder :many
select order_id, price, delivery_price, total from orders o where user_id = $1;

-- name: GetOrderDetails :many
select od_id, order_id, product_id, product_price, quantity, delivery_price
from order_details od where order_id = $1;

-- name: GetDiscountCount :one
select count(order_id) from orders where discount_code = $1;