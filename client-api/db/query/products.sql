-- name: ReadCategoryProduct :many
SELECT * FROM v_products WHERE category_id = $1;

-- name: ReadNewProducts :many
SELECT product_id, product_name, image_url, quantity, product_desc, price, delivery_price from v_products order by created_on desc limit $1 offset $2;

-- name: ReadAllProducts :many
SELECT product_id, product_name, image_url, quantity, product_desc, price, delivery_price from v_products limit $1 offset $2;

-- name: ReadCategoryItems :many
SELECT product_id, product_name, image_url, quantity, product_desc from v_products where category_id = $1 limit $2 offset $3;

-- name: ReadOneProduct :one
SELECT product_id, product_name, image_url, product_desc, price, quantity, delivery_price, category_id, category_name from v_products where product_id = $1;

-- name: ReadProductQuantity :one
SELECT quantity from v_products where product_id = $1;

-- name: ReadCategory :one
select category_id from v_products where product_id = $1;

-- name: ReadSimilarItems :many
SELECT product_id, product_name, image_url, quantity, product_desc, price, delivery_price from v_products where category_id = $1 and product_id != $2 limit $3 offset $4;

-- name: ReadProductsWithLength :many
SELECT product_id, product_name, image_url, quantity, product_desc, price, delivery_price, count(product_id) over () as total_count from v_products order by created_on desc limit $1 offset $2;