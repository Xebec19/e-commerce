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
update carts set discount_code = $2 where cart_id = $1;

-- name: RemoveDiscount :exec
update carts set discount_code = null where cart_id = $1 and user_id = $2;

-- name: GetCartDetails :one
select cart_id, discount_code from carts where user_id = $1;

-- name: GetCartItems :many
select cd.cd_id, cd.cart_id, cd.product_id, cd.quantity, p.product_name, 
pi2.image_url, p.price, p.product_desc, p.delivery_price  
from cart_details cd 
left join products p on p.product_id = cd.product_id 
left join product_images pi2 on pi2.product_id = p.product_id where pi2.is_featured is true and cd.cart_id = $1;

-- name: ResetCart :exec
update carts set discount_code = null where cart_id = $1;

-- name: DeleteAllCartItems :exec
delete from cart_details where cart_id = $1;