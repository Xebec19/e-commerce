// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.22.0
// source: users.sql

package db

import (
	"context"
	"database/sql"
)

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

func (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) (int32, error) {
	row := q.db.QueryRowContext(ctx, createUser,
		arg.FirstName,
		arg.LastName,
		arg.Email,
		arg.Phone,
		arg.Password,
	)
	var user_id int32
	err := row.Scan(&user_id)
	return user_id, err
}

const findUserOne = `-- name: FindUserOne :one
SELECT user_id, email, CONCAT(first_name, ' ', last_name) AS user_name, password FROM USERS u 
WHERE u.EMAIL = $1
`

type FindUserOneRow struct {
	UserID   int32       `json:"user_id"`
	Email    string      `json:"email"`
	UserName interface{} `json:"user_name"`
	Password string      `json:"password"`
}

func (q *Queries) FindUserOne(ctx context.Context, email string) (FindUserOneRow, error) {
	row := q.db.QueryRowContext(ctx, findUserOne, email)
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

type ReadUserRow struct {
	UserID    int32          `json:"user_id"`
	FirstName string         `json:"first_name"`
	LastName  sql.NullString `json:"last_name"`
	Email     string         `json:"email"`
	Phone     sql.NullString `json:"phone"`
	Password  string         `json:"password"`
	CreatedOn sql.NullTime   `json:"created_on"`
	UpdatedOn sql.NullTime   `json:"updated_on"`
	Status    sql.NullString `json:"status"`
	Access    sql.NullString `json:"access"`
}

func (q *Queries) ReadUser(ctx context.Context, userID int32) (ReadUserRow, error) {
	row := q.db.QueryRowContext(ctx, readUser, userID)
	var i ReadUserRow
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
