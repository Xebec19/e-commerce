// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.22.0

package db

import (
	"context"
)

type Querier interface {
	GetProducts(ctx context.Context, arg GetProductsParams) ([]Product, error)
}

var _ Querier = (*Queries)(nil)
