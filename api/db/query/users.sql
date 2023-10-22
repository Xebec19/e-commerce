-- name: CreateUser :one
INSERT INTO USERS (first_name, last_name, email, phone, password)
values ($1,$2,$3,$4,$5) RETURNING user_id;

-- name: FindUserOne :one
SELECT user_id, email, CONCAT(first_name, ' ', last_name) AS user_name, password FROM USERS u 
WHERE u.EMAIL = $1;

-- name: ReadUser :one
SELECT user_id, first_name, last_name, email, phone, "password", created_on, updated_on, status, "access"
FROM public.users WHERE user_id = $1;