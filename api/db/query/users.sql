-- name: CreateUser :one
INSERT INTO USERS (first_name, last_name, email, phone, password)
values ($1,$2,$3,$4,$5) RETURNING user_id;

-- name: FindUserOne :one
SELECT user_id, email, CONCAT(first_name, ' ', last_name) AS user_name, password FROM USERS u 
WHERE u.EMAIL = $1;