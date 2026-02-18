postgres:
	docker run --name ecommerce -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -dp 5432:5432 postgres:12-alpine

createdb:
	docker exec -it ecommerce createdb --username=root --owner=root ecommerce

dropdb:
	docker exec -it ecommerce dropdb ecommerce

migrateup:
	migrate -path db/migrations -database "postgresql://root:root@localhost:5432/ecommerce?sslmode=disable" -verbose up

new-migration:
	migrate create -ext sql -dir db/migrations -seq migration

apply-migrate:
	 migrate -path db/migrations -database "postgres://root:root@localhost:5432/ecommerce?sslmode=disable" -versbose up

server:
	go run main.go

test:
	go test -v -cover ./...

sqlc:
	sqlc generate

swag: 
	exec ~/go/bin/swag init

swag-fmt:
	exec ~/go/bin/swag fmt

debug:
	air

.PHONY: postgres createdb dropdb test sqlc server migrateup new-migration apply-migrate swag swag-fmt debug