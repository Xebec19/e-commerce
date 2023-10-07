create table users (
	uid binary(16) primary key,
	first_name varchar(120) not null,
	last_name varchar(120),
	email varchar(120) unique not null,
	phone_num varchar(50),
	password varchar(50),
	type enum('user','admin'),
	created_on timestamp default current_timestamp,
	updated_on timestamp default current_timestamp
);

create table carts (
	cid binary(16) primary key,
	uuid binary(16) not null,
	created_on timestamp default CURRENT_TIMESTAMP,
	updated_on timestamp default CURRENT_TIMESTAMP
);

create table cart_items (
	ciid binary(16) primary key,
	cid binary(16) not null,
	pid binary(16) not null,
	quantity integer not null default 0,
	created_on timestamp default CURRENT_TIMESTAMP,
	updated_on timestamp default CURRENT_TIMESTAMP
);

create table products (
	pid binary(16) primary key,
	title varchar(120) not null,
	description text,
	quantity integer default 0,
	price integer,
	status enum('active','inactive'),
	created_on timestamp default CURRENT_TIMESTAMP,
	updated_on timestamp default CURRENT_TIMESTAMP,
	updated_by binary(16)
);

create table orders (
	oid binary(16) primary key,
	uid binary(16) not null,
	subtotal integer,
	delivery_cost integer,
	total integer,
	status enum('pending','approved','cancelled','completed'),
	discount_id binary(16),
	discount_amount integer
);

create table order_items (
	oiid binary(16) primary key,
	pid binary(16),
	quantity integer
);

CREATE TABLE discounts (
    did BINARY(16) PRIMARY KEY,
    code VARCHAR(120) UNIQUE NOT NULL,
    type ENUM('amount', 'percentage'),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by BINARY(16),
    value INTEGER,
    expire_on TIMESTAMP default current_timestamp
);
