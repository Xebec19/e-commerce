package auth

import (
	"context"
	"database/sql"
	"time"

	db "github.com/Xebec19/e-commerce/api/db/sqlc"
	"github.com/Xebec19/e-commerce/api/util"
	"github.com/gofiber/fiber/v2"
)

type registerSchema struct {
	FirstName string `json:"first_name" binding:"required"`
	LastName  string `json:"last_name" binding:"required"`
	Email     string `json:"email" binding:"required,email"`
	Phone     int64  `json:"phone" binding:"e164"`
	Password  string `json:"password" binding:"required,min=8"`
}

type loginSchema struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=8"`
}

/*
register expects first_name, last_name, email, phone, and password,
and creates a new user
*/
func register(c *fiber.Ctx) error {
	req := new(registerSchema)
	// parse and validate request body
	if err := c.BodyParser(req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	// descript md5 hash
	req.Password = util.DecryptMD5(req.Password)

	passwordHash, err := util.HashPassword(req.Password)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	args := db.CreateUserParams{
		FirstName: req.FirstName,
		LastName:  sql.NullString{String: req.LastName, Valid: true},
		Email:     req.Email,
		Phone:     sql.NullInt64{Int64: req.Phone, Valid: true},
		Password:  passwordHash,
	}
	// save user in db
	user, err := db.DBQuery.CreateUser(context.Background(), args)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	return c.Status(fiber.StatusCreated).JSON(util.SuccessResponse(user, "User registered successfully"))
}

/*
login finds email in db, decrypt password and generates jwt token after checking credentials
*/
func login(c *fiber.Ctx) error {
	req := new(loginSchema)
	// parse and validate request body
	if err := c.BodyParser(req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}
	// Find a user with given email
	user, err := db.DBQuery.FindUserOne(context.Background(), req.Email)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(util.ErrorResponse(err))
	}

	// descript md5 hash
	req.Password = util.DecryptMD5(req.Password)

	// check user password
	err = util.CheckPassword(req.Password, user.Password)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(util.ErrorResponse(err))
	}

	// generate token to user
	token, err := util.CreateToken(user.UserID, 24*time.Hour)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(util.ErrorResponse(err))
	}
	return c.Status(fiber.StatusCreated).JSON(util.SuccessResponse(token, "User logged in"))
}
