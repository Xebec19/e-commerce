package auth

import (
	"context"
	"database/sql"
	"errors"
	"strings"
	"time"

	db "github.com/Xebec19/e-commerce/api/db/sqlc"
	"github.com/Xebec19/e-commerce/api/util"
	"github.com/gofiber/fiber/v2"
)

type registerSchema struct {
	FirstName string `json:"first_name" binding:"required"`
	LastName  string `json:"last_name"`
	Email     string `json:"email" binding:"required,email"`
	Phone     string `json:"phone"`
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

	count, err := db.DBQuery.CountUser(context.Background(), strings.ToLower(req.Email))

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	if count > 0 {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(errors.New("user already exists")))
	}

	// decrypt md5 hash
	req.Password, err = util.DecryptBase64(req.Password)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	passwordHash, err := util.HashPassword(req.Password)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(util.ErrorResponse(err))
	}

	args := db.CreateUserParams{
		FirstName: req.FirstName,
		LastName:  sql.NullString{String: req.LastName, Valid: true},
		Email:     strings.ToLower(req.Email),
		Phone:     sql.NullString{String: req.Phone, Valid: true},
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
	user, err := db.DBQuery.FindUserOne(context.Background(), strings.ToLower(req.Email))
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(util.ErrorResponse(errors.New("no user found")))
	}

	// decode base64 hash
	req.Password, err = util.DecryptBase64(req.Password)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(util.ErrorResponse(err))
	}

	// check user password
	err = util.CheckPassword(req.Password, user.Password)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(util.ErrorResponse(errors.New("invalid password")))
	}

	// generate token to user
	token, err := util.CreateToken(user.UserID, 24*time.Hour)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(util.ErrorResponse(err))
	}
	return c.Status(fiber.StatusCreated).JSON(util.SuccessResponse(token, "User logged in"))
}
