create type enum_status as enum ('active','inactive');

create type enum_access as enum('user','admin');

create type "type" as enum_type ('voucher','coupon'); -- voucher would be % type discount and coupon would be absolute value discount

create table users (
    user_id uuid default uuid_generate_v4() primary key,
    first_name varchar(200) not null,
    last_name varchar(200),
    email varchar(200) unique,
    phone varchar(20) unique,
    password varchar(200) not null,
    created_on timestamp with time zone default current_timestamp,
    updated_on timestamp with time zone default current_timestamp,
    status enum_status default 'active',
    access enum_access default 'user'
);

create table discounts (
	discount_id uuid default uuid_generate_v4() primary key,
	code varchar(20) not null unique,
	"status" status default 'active',
	"type" enum_type default 'voucher',
	value integer default 10,
	created_on timestamp default current_timestamp,
	updated_on timestamp default current_timestamp,
	created_by integer references users(user_id),
	updated_by integer references users(user_id),
	expired_on timestamp default current_timestamp + interval '1 year'
);

-- create a dummy discount code
insert into discounts (code, created_by, updated_by) values ('WELCOME10',1,1);

create table categories (
    category_id uuid default uuid_generate_v4() primary key,
    category_name varchar(200) not null,
    created_on timestamp with time zone default current_timestamp,
    image_url text,
    status enum_status default 'active'
)

create table products (
    product_id uuid default uuid_generate_v4() primary key,
    category_id uuid references categories(category_id),
    product_name varchar(200) not null,
    quantity integer default 0,
    created_on timestamp with time zone DEFAULT current_timestamp,
    updated_on timestamp with time zone DEFAULT current_timestamp,
)

create table product_images (
    img_id uuid default uuid_generate_v4() primary key,
    product_id int references products(product_id),
    image_url text not null,
    created_on timestamp default current_timestamp,
    updated_on timestamp default current_timestamp,
    updated_by int references users(user_id),
    status status default 'active'
);