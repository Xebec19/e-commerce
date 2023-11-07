-- name: GetProductImages :many
SELECT img_id, product_id, image_url
FROM public.product_images where status = 'active' and product_id = $1;