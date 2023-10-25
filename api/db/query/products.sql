-- name: ReadCategoryProduct :many
SELECT * FROM v_products WHERE category_id = $1;

-- name: ReadAllProducts :many
SELECT product_id, product_name, product_image, quantity, product_desc from v_products limit $1 offset $2;

-- name: ReadCategoryItems :many
SELECT product_id, product_name, product_image, quantity, product_desc from v_products where category_id = $1 limit $2 offset $3;

-- name: ReadOneProduct :one
SELECT product_id, product_name, product_image, product_desc, price, delivery_price, category_id, category_name from v_products where product_id = $1;

-- name: ReadProductQuantity :one
SELECT quantity from v_products where product_id = $1;