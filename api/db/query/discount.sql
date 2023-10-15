-- name: GetDiscount :one
select discount_id from public.discounts where lower(code) = lower($1) and status = 'active' and expired_on > current_timestamp;