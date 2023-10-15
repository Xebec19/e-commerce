-- name: UpdateCartItemQuantity :exec
update cart_details set quantity = $1 + quantity where product_id = $2 and cart_id = $3;

-- name: CountCartId :one
select count(cart_id) from carts c where user_id = $1;

-- name: GetCartID :one
select cart_id from carts where user_id = $1;

-- name: InsertCartItem :exec
insert into cart_details (cart_id,product_id,product_price,quantity,delivery_price)
values($1,$2,(select price from products p where p.product_id = $2),$3,
(select delivery_price from products p where p.product_id = $2));

-- name: CheckCartDetail :one
select case when count(quantity) > 0 then 1 else 0 end as product_quantity from cart_details cd 
where cart_id = $1 and product_id = $2;

-- name: DeleteCartItem :exec
delete from cart_details where cart_id = $1 and product_id = $2;

-- name: RemoveCartItem :exec
update cart_details set quantity = quantity - $1 where cart_id = $2 and product_id = $3;

-- name: ReadCartItemQuantity :one
select quantity from cart_details where cart_id = $1 and product_id = $2;

-- name: CreateCart :exec
insert into carts (user_id) values ($1);

-- name: AddDiscount :exec
update carts set discount_id = $2 where cart_id = $1;