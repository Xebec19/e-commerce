package server

import (
	db "github.com/Xebec19/e-commerce/api/db/sqlc"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

type Server struct {
	store  *db.Queries
	router *fiber.App
}

func NewServer(store *db.Queries) *Server {
	server := &Server{store: store}
	router := fiber.New()

	router.Use(cors.New())
	router.Use(logger.New())

	api := router.Group("/api")

	userRoutes := api.Group("/user")
	userRoutes.Get("/health", server.userHealth)

	server.router = router
	return server
}

func (server *Server) Start(address string) error {
	return server.router.Listen(address)
}
