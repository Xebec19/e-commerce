-- name: GetDiscount :one
select discount_id, code, type, value from public.discounts where lower(code) = lower($1) and status = 'active' and expired_on > current_timestamp;

-- name: GetDiscountCount :one
select count(discount_id) from orders where discount_id = $1 and user_id = $2;