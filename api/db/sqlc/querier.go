// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.22.0

package db

import (
	"context"
	"database/sql"

	"github.com/google/uuid"
)

type Querier interface {
	AddDiscount(ctx context.Context, arg AddDiscountParams) error
	CheckCartDetail(ctx context.Context, arg CheckCartDetailParams) (int32, error)
	CountCartId(ctx context.Context, userID sql.NullInt32) (int64, error)
	CreateCart(ctx context.Context, userID sql.NullInt32) error
	CreateUser(ctx context.Context, arg CreateUserParams) (int32, error)
	DeleteCartItem(ctx context.Context, arg DeleteCartItemParams) error
	FindUserOne(ctx context.Context, email string) (FindUserOneRow, error)
	GetCartID(ctx context.Context, userID sql.NullInt32) (int32, error)
	GetDiscount(ctx context.Context, lower string) (uuid.UUID, error)
	GetOrderDetails(ctx context.Context, orderID sql.NullString) ([]OrderDetail, error)
	InsertCartItem(ctx context.Context, arg InsertCartItemParams) error
	ListOrder(ctx context.Context, userID int32) ([]ListOrderRow, error)
	ReadAllCategories(ctx context.Context) ([]ReadAllCategoriesRow, error)
	ReadAllProducts(ctx context.Context, arg ReadAllProductsParams) ([]ReadAllProductsRow, error)
	ReadCartItemQuantity(ctx context.Context, arg ReadCartItemQuantityParams) (sql.NullInt32, error)
	ReadCategoryItems(ctx context.Context, arg ReadCategoryItemsParams) ([]ReadCategoryItemsRow, error)
	ReadCategoryProduct(ctx context.Context, categoryID int32) ([]VProduct, error)
	ReadOneCategory(ctx context.Context, categoryID int32) (ReadOneCategoryRow, error)
	ReadOneProduct(ctx context.Context, productID int32) (ReadOneProductRow, error)
	ReadProductQuantity(ctx context.Context, productID int32) (sql.NullInt32, error)
	RemoveCartItem(ctx context.Context, arg RemoveCartItemParams) error
	UpdateCartItemQuantity(ctx context.Context, arg UpdateCartItemQuantityParams) error
}

var _ Querier = (*Queries)(nil)
