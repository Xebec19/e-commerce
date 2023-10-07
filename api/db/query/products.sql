-- name: GetProducts :many
SELECT pid, title, description, quantity, price, status, created_on, updated_on, updated_by FROM products ORDER BY ? LIMIT ? OFFSET ?; 