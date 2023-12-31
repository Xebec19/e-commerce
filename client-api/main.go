package main

import (
	"log"
	"os"

	"github.com/Xebec19/e-commerce/client-api/auth"
	"github.com/Xebec19/e-commerce/client-api/cart"
	db "github.com/Xebec19/e-commerce/client-api/db/sqlc"
	_ "github.com/Xebec19/e-commerce/client-api/docs"
	"github.com/Xebec19/e-commerce/client-api/order"
	"github.com/Xebec19/e-commerce/client-api/product"
	"github.com/Xebec19/e-commerce/client-api/user"
	util "github.com/Xebec19/e-commerce/client-api/util"
	"github.com/Xebec19/e-commerce/client-api/webhook"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/swagger"
)

// @title			e-commerce api
// @version		1.0
// @description	This is a Go application having JWT authentication, Unit tests,etc using postgresql as database
// @host			localhost:8080
// @BasePath		/
// @schemes		http
// @contact.name	Rohan Kumar Thakur
// @contact.email	rohandeveloper106@gmail.com
// @license.name	GNU GENERAL PUBLIC LICENSE
func main() {

	file, err := os.OpenFile("./my_logs.log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		log.Fatalf("error opening file: %v", err)
	}
	defer file.Close()

	// Set config for logger
	loggerConfig := logger.Config{
		Output: file, // add file to save output
	}

	// load env
	config, err := util.LoadConfig(".")
	if err != nil {
		log.Fatal("cannot load config:", err)
	}

	app := fiber.New()

	app.Get("/swagger/*", swagger.HandlerDefault)

	// set up rate limiter
	// if config.Env != "development" {
	// 	app.Use(limiter.New())
	// }

	// set up logger
	app.Use(logger.New(loggerConfig))
	app.Use(logger.New())

	// set up cors
	app.Use(cors.New())

	// set up cache
	// app.Use(cache.New())

	// Connect to database
	db.Connect()

	// Public Routes
	auth.SetRoute(app)
	product.SetRoute(app)
	user.SetRoute(app)
	webhook.SetRoute(app)

	app.Use(util.JwtValidate)

	// Private Routes
	cart.SetRoute(app)
	order.SetRoute(app)

	// start server
	log.Printf("Server listening on %v", config.ServerAddress)
	app.Listen(config.ServerAddress)
}
