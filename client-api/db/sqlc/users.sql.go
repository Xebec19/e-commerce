// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.23.0
// source: users.sql

package db

import (
	"context"
	"database/sql"

	"github.com/google/uuid"
)

const countUser = `-- name: CountUser :one
SELECT count(user_id) from USERS u WHERE lower(u.EMAIL) = lower($1)
`

func (q *Queries) CountUser(ctx context.Context, lower string) (int64, error) {
	row := q.db.QueryRowContext(ctx, countUser, lower)
	var count int64
	err := row.Scan(&count)
	return count, err
}

const createUser = `-- name: CreateUser :one
INSERT INTO USERS (first_name, last_name, email, phone, password)
values ($1,$2,$3,$4,$5) RETURNING user_id
`

type CreateUserParams struct {
	FirstName string         `json:"first_name"`
	LastName  sql.NullString `json:"last_name"`
	Email     string         `json:"email"`
	Phone     sql.NullString `json:"phone"`
	Password  string         `json:"password"`
}

func (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) (uuid.UUID, error) {
	row := q.db.QueryRowContext(ctx, createUser,
		arg.FirstName,
		arg.LastName,
		arg.Email,
		arg.Phone,
		arg.Password,
	)
	var user_id uuid.UUID
	err := row.Scan(&user_id)
	return user_id, err
}

const findUserOne = `-- name: FindUserOne :one
SELECT user_id, email, CONCAT(first_name, ' ', last_name) AS user_name, password FROM USERS u 
WHERE lower(u.EMAIL) = lower($1)
`

type FindUserOneRow struct {
	UserID   uuid.UUID   `json:"user_id"`
	Email    string      `json:"email"`
	UserName interface{} `json:"user_name"`
	Password string      `json:"password"`
}

func (q *Queries) FindUserOne(ctx context.Context, lower string) (FindUserOneRow, error) {
	row := q.db.QueryRowContext(ctx, findUserOne, lower)
	var i FindUserOneRow
	err := row.Scan(
		&i.UserID,
		&i.Email,
		&i.UserName,
		&i.Password,
	)
	return i, err
}

const readUser = `-- name: ReadUser :one
SELECT user_id, first_name, last_name, email, phone, "password", created_on, updated_on, status, "access"
FROM public.users WHERE user_id = $1
`

func (q *Queries) ReadUser(ctx context.Context, userID uuid.UUID) (User, error) {
	row := q.db.QueryRowContext(ctx, readUser, userID)
	var i User
	err := row.Scan(
		&i.UserID,
		&i.FirstName,
		&i.LastName,
		&i.Email,
		&i.Phone,
		&i.Password,
		&i.CreatedOn,
		&i.UpdatedOn,
		&i.Status,
		&i.Access,
	)
	return i, err
}
