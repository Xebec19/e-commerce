package main

import (
	"database/sql"
	"log"

	db "github.com/Xebec19/e-commerce/api/db/sqlc"
	"github.com/Xebec19/e-commerce/api/server"
	"github.com/Xebec19/e-commerce/api/util"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	config, err := util.LoadConfig(".")
	if err != nil {
		log.Fatal("cannot connect to db:", err)
	}

	conn, err := sql.Open(config.DB_DRIVER, config.DB_SOURCE)
	if err != nil {
		log.Fatal("cannot connect to db: ", err)
	}

	store := db.New(conn)
	api := server.NewServer(store)

	err = api.Start(config.SERVER_ADDRESS)

	if err != nil {
		log.Fatal("cannot start server: ", err)
	}
}
