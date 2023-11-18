// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.23.0

package db

import (
	"database/sql"
	"database/sql/driver"
	"fmt"

	"github.com/google/uuid"
)

type Status string

const (
	StatusActive   Status = "active"
	StatusInactive Status = "inactive"
)

func (e *Status) Scan(src interface{}) error {
	switch s := src.(type) {
	case []byte:
		*e = Status(s)
	case string:
		*e = Status(s)
	default:
		return fmt.Errorf("unsupported scan type for Status: %T", src)
	}
	return nil
}

type NullStatus struct {
	Status Status `json:"status"`
	Valid  bool   `json:"valid"` // Valid is true if Status is not NULL
}

// Scan implements the Scanner interface.
func (ns *NullStatus) Scan(value interface{}) error {
	if value == nil {
		ns.Status, ns.Valid = "", false
		return nil
	}
	ns.Valid = true
	return ns.Status.Scan(value)
}

// Value implements the driver Valuer interface.
func (ns NullStatus) Value() (driver.Value, error) {
	if !ns.Valid {
		return nil, nil
	}
	return string(ns.Status), nil
}

type Type string

const (
	TypeVoucher Type = "voucher"
	TypeCoupon  Type = "coupon"
)

func (e *Type) Scan(src interface{}) error {
	switch s := src.(type) {
	case []byte:
		*e = Type(s)
	case string:
		*e = Type(s)
	default:
		return fmt.Errorf("unsupported scan type for Type: %T", src)
	}
	return nil
}

type NullType struct {
	Type  Type `json:"type"`
	Valid bool `json:"valid"` // Valid is true if Type is not NULL
}

// Scan implements the Scanner interface.
func (ns *NullType) Scan(value interface{}) error {
	if value == nil {
		ns.Type, ns.Valid = "", false
		return nil
	}
	ns.Valid = true
	return ns.Type.Scan(value)
}

// Value implements the driver Valuer interface.
func (ns NullType) Value() (driver.Value, error) {
	if !ns.Valid {
		return nil, nil
	}
	return string(ns.Type), nil
}

type Cart struct {
	CartID       int32          `json:"cart_id"`
	UserID       sql.NullInt32  `json:"user_id"`
	CreatedOn    sql.NullTime   `json:"created_on"`
	UpdatedOn    sql.NullTime   `json:"updated_on"`
	DiscountCode sql.NullString `json:"discount_code"`
}

type CartDetail struct {
	CdID          int32          `json:"cd_id"`
	CartID        sql.NullInt32  `json:"cart_id"`
	ProductID     sql.NullInt32  `json:"product_id"`
	ProductPrice  sql.NullString `json:"product_price"`
	Quantity      sql.NullInt32  `json:"quantity"`
	DeliveryPrice sql.NullString `json:"delivery_price"`
}

type Category struct {
	CategoryID   int32          `json:"category_id"`
	CategoryName string         `json:"category_name"`
	CreatedOn    sql.NullTime   `json:"created_on"`
	ImageUrl     sql.NullString `json:"image_url"`
	Status       sql.NullString `json:"status"`
}

type Country struct {
	CountryID      int32          `json:"country_id"`
	CountryName    sql.NullString `json:"country_name"`
	Currency       sql.NullString `json:"currency"`
	CurrencySymbol sql.NullString `json:"currency_symbol"`
}

type Discount struct {
	DiscountID uuid.UUID     `json:"discount_id"`
	Code       string        `json:"code"`
	Status     NullStatus    `json:"status"`
	Type       NullType      `json:"type"`
	Value      sql.NullInt32 `json:"value"`
	CreatedOn  sql.NullTime  `json:"created_on"`
	UpdatedOn  sql.NullTime  `json:"updated_on"`
	CreatedBy  sql.NullInt32 `json:"created_by"`
	UpdatedBy  sql.NullInt32 `json:"updated_by"`
	ExpiredOn  sql.NullTime  `json:"expired_on"`
}

type Order struct {
	OrderID        string         `json:"order_id"`
	UserID         int32          `json:"user_id"`
	Price          string         `json:"price"`
	DeliveryPrice  string         `json:"delivery_price"`
	Total          string         `json:"total"`
	CreatedOn      sql.NullTime   `json:"created_on"`
	Email          string         `json:"email"`
	Address        string         `json:"address"`
	DiscountAmount sql.NullInt32  `json:"discount_amount"`
	DiscountCode   sql.NullString `json:"discount_code"`
}

type OrderDetail struct {
	OdID          int32          `json:"od_id"`
	OrderID       sql.NullString `json:"order_id"`
	ProductID     sql.NullInt32  `json:"product_id"`
	ProductPrice  sql.NullString `json:"product_price"`
	Quantity      sql.NullInt32  `json:"quantity"`
	DeliveryPrice sql.NullString `json:"delivery_price"`
}

type Product struct {
	ProductID     int32          `json:"product_id"`
	CategoryID    sql.NullInt32  `json:"category_id"`
	ProductName   string         `json:"product_name"`
	ProductImage  sql.NullString `json:"product_image"`
	Quantity      sql.NullInt32  `json:"quantity"`
	CreatedOn     sql.NullTime   `json:"created_on"`
	UpdatedOn     sql.NullTime   `json:"updated_on"`
	Status        sql.NullString `json:"status"`
	Price         string         `json:"price"`
	DeliveryPrice sql.NullString `json:"delivery_price"`
	ProductDesc   sql.NullString `json:"product_desc"`
	Gender        sql.NullString `json:"gender"`
	CountryID     sql.NullInt32  `json:"country_id"`
	IsFeatured    sql.NullBool   `json:"is_featured"`
}

type ProductImage struct {
	ImgID     uuid.UUID     `json:"img_id"`
	ProductID sql.NullInt32 `json:"product_id"`
	ImageUrl  string        `json:"image_url"`
	CreatedOn sql.NullTime  `json:"created_on"`
	UpdatedOn sql.NullTime  `json:"updated_on"`
	UpdatedBy sql.NullInt32 `json:"updated_by"`
	Status    NullStatus    `json:"status"`
}

type Token struct {
	TokenID    int32         `json:"token_id"`
	UserID     sql.NullInt32 `json:"user_id"`
	Token      string        `json:"token"`
	CreatedOn  sql.NullTime  `json:"created_on"`
	LastAccess sql.NullTime  `json:"last_access"`
}

type User struct {
	UserID    int32          `json:"user_id"`
	FirstName string         `json:"first_name"`
	LastName  sql.NullString `json:"last_name"`
	Email     string         `json:"email"`
	Password  string         `json:"password"`
	CreatedOn sql.NullTime   `json:"created_on"`
	UpdatedOn sql.NullTime   `json:"updated_on"`
	Status    sql.NullString `json:"status"`
	Access    sql.NullString `json:"access"`
	Phone     sql.NullString `json:"phone"`
}

type VCart struct {
	UserID        sql.NullInt32  `json:"user_id"`
	CartID        int32          `json:"cart_id"`
	CardItemID    int32          `json:"card_item_id"`
	ProductID     sql.NullInt32  `json:"product_id"`
	Price         string         `json:"price"`
	Quantity      sql.NullInt32  `json:"quantity"`
	DeliveryPrice sql.NullString `json:"delivery_price"`
}

type VProduct struct {
	ProductID     int32          `json:"product_id"`
	ProductName   string         `json:"product_name"`
	ProductImage  sql.NullString `json:"product_image"`
	Quantity      sql.NullInt32  `json:"quantity"`
	CreatedOn     sql.NullTime   `json:"created_on"`
	Price         string         `json:"price"`
	DeliveryPrice sql.NullString `json:"delivery_price"`
	ProductDesc   sql.NullString `json:"product_desc"`
	Gender        sql.NullString `json:"gender"`
	CategoryID    int32          `json:"category_id"`
	CategoryName  string         `json:"category_name"`
	CountryID     int32          `json:"country_id"`
	CountryName   sql.NullString `json:"country_name"`
}