-- name: ReadAllCategories :many
SELECT category_id, category_name, image_url FROM categories
WHERE status = 'active';

-- name: ReadOneCategory :one
SELECT category_id, category_name, image_url FROM categories 
WHERE status = 'active' AND category_id = $1;