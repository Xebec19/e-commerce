// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.23.0

package db

import (
	"context"
	"database/sql"
)

type Querier interface {
	AddDiscount(ctx context.Context, arg AddDiscountParams) error
	CheckCartDetail(ctx context.Context, arg CheckCartDetailParams) (int32, error)
	CountCartId(ctx context.Context, userID sql.NullInt32) (int64, error)
	CountUser(ctx context.Context, lower string) (int64, error)
	CreateCart(ctx context.Context, userID sql.NullInt32) error
	CreateOrder(ctx context.Context, arg CreateOrderParams) (Order, error)
	CreateOrderDetails(ctx context.Context, arg CreateOrderDetailsParams) error
	CreateUser(ctx context.Context, arg CreateUserParams) (int32, error)
	DeleteCartItem(ctx context.Context, arg DeleteCartItemParams) error
	FindUserOne(ctx context.Context, lower string) (FindUserOneRow, error)
	GetCartDetails(ctx context.Context, userID sql.NullInt32) (GetCartDetailsRow, error)
	GetCartID(ctx context.Context, userID sql.NullInt32) (int32, error)
	GetCartItems(ctx context.Context, cartID sql.NullInt32) ([]GetCartItemsRow, error)
	GetDiscount(ctx context.Context, lower string) (GetDiscountRow, error)
	GetDiscountCount(ctx context.Context, discountCode sql.NullString) (int64, error)
	GetOrderDetails(ctx context.Context, orderID sql.NullString) ([]OrderDetail, error)
	GetProductImages(ctx context.Context, productID sql.NullInt32) ([]GetProductImagesRow, error)
	InsertCartItem(ctx context.Context, arg InsertCartItemParams) error
	ListOrder(ctx context.Context, userID int32) ([]ListOrderRow, error)
	ReadAllCategories(ctx context.Context) ([]ReadAllCategoriesRow, error)
	ReadAllProducts(ctx context.Context, arg ReadAllProductsParams) ([]ReadAllProductsRow, error)
	ReadCartItemQuantity(ctx context.Context, arg ReadCartItemQuantityParams) (sql.NullInt32, error)
	ReadCategory(ctx context.Context, productID int32) (int32, error)
	ReadCategoryItems(ctx context.Context, arg ReadCategoryItemsParams) ([]ReadCategoryItemsRow, error)
	ReadCategoryProduct(ctx context.Context, categoryID int32) ([]VProduct, error)
	ReadNewProducts(ctx context.Context, arg ReadNewProductsParams) ([]ReadNewProductsRow, error)
	ReadOneCategory(ctx context.Context, categoryID int32) (ReadOneCategoryRow, error)
	ReadOneProduct(ctx context.Context, productID int32) (ReadOneProductRow, error)
	ReadProductQuantity(ctx context.Context, productID int32) (sql.NullInt32, error)
	ReadSimilarItems(ctx context.Context, arg ReadSimilarItemsParams) ([]ReadSimilarItemsRow, error)
	ReadUser(ctx context.Context, userID int32) (ReadUserRow, error)
	RemoveCartItem(ctx context.Context, arg RemoveCartItemParams) error
	RemoveDiscount(ctx context.Context, arg RemoveDiscountParams) error
	UpdateCartItemQuantity(ctx context.Context, arg UpdateCartItemQuantityParams) error
}

var _ Querier = (*Queries)(nil)