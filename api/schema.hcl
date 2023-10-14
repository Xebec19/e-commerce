-- Add new schema named "public"
CREATE SCHEMA IF NOT EXISTS "public";
-- create "users" table
CREATE TABLE "public"."users" ("user_id" serial NOT NULL, "first_name" text NOT NULL, "last_name" text NULL, "email" character varying NOT NULL, "phone" bigint NULL, "password" character varying NOT NULL, "created_on" timestamptz NULL DEFAULT now(), "updated_on" timestamptz NULL DEFAULT now(), "status" character varying(10) NULL DEFAULT 'active', "access" character varying(20) NULL DEFAULT 'user', PRIMARY KEY ("user_id"));
-- create index "users_email_key" to table: "users"
CREATE UNIQUE INDEX "users_email_key" ON "public"."users" ("email");
-- create "carts" table
CREATE TABLE "public"."carts" ("cart_id" serial NOT NULL, "user_id" integer NULL, "price" numeric NULL, "delivery_price" numeric NULL, "created_on" timestamptz NULL DEFAULT now(), "updated_on" timestamptz NULL DEFAULT now(), "total" numeric NULL, PRIMARY KEY ("cart_id"), CONSTRAINT "fk_users" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("user_id") ON UPDATE NO ACTION ON DELETE CASCADE);
-- create "categories" table
CREATE TABLE "public"."categories" ("category_id" serial NOT NULL, "category_name" text NOT NULL, "created_on" timestamptz NULL DEFAULT now(), "image_url" text NULL, "status" text NULL, PRIMARY KEY ("category_id"));
-- create "countries" table
CREATE TABLE "public"."countries" ("country_id" serial NOT NULL, "country_name" character varying(20) NULL, "currency" character varying(10) NULL, "currency_symbol" character varying(5) NULL, PRIMARY KEY ("country_id"));
-- create "products" table
CREATE TABLE "public"."products" ("product_id" serial NOT NULL, "category_id" integer NULL, "product_name" character varying NOT NULL, "product_image" character varying NULL, "quantity" integer NULL, "created_on" timestamptz NULL DEFAULT now(), "updated_on" timestamptz NULL DEFAULT now(), "status" text NULL DEFAULT 'active', "price" numeric NOT NULL, "delivery_price" numeric NULL DEFAULT 0, "product_desc" character varying(500) NULL DEFAULT 'No description', "gender" character varying(10) NULL DEFAULT 'Not specified', "country_id" integer NULL DEFAULT 1, PRIMARY KEY ("product_id"), CONSTRAINT "fk_category" FOREIGN KEY ("category_id") REFERENCES "public"."categories" ("category_id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "fk_country" FOREIGN KEY ("country_id") REFERENCES "public"."countries" ("country_id") ON UPDATE NO ACTION ON DELETE NO ACTION);
-- create "cart_details" table
CREATE TABLE "public"."cart_details" ("cd_id" serial NOT NULL, "cart_id" integer NULL, "product_id" integer NULL, "product_price" numeric NULL, "quantity" integer NULL, "delivery_price" numeric NULL, PRIMARY KEY ("cd_id"), CONSTRAINT "fk_cart" FOREIGN KEY ("cart_id") REFERENCES "public"."carts" ("cart_id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "fk_product" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("product_id") ON UPDATE NO ACTION ON DELETE CASCADE);
-- create "order" table
CREATE TABLE "public"."order" ("order_id" character varying(20) NOT NULL, "user_id" integer NOT NULL, "price" numeric NOT NULL, "delivery_price" numeric NOT NULL, "total" numeric NOT NULL, "created_on" timestamptz NULL DEFAULT now(), "email" character varying(50) NOT NULL, "address" text NOT NULL, PRIMARY KEY ("order_id"), CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("user_id") ON UPDATE NO ACTION ON DELETE CASCADE);
-- create "order_details" table
CREATE TABLE "public"."order_details" ("od_id" serial NOT NULL, "order_id" character varying(20) NULL, "product_id" integer NULL, "product_price" numeric NULL, "quantity" integer NULL, "delivery_price" numeric NULL, PRIMARY KEY ("od_id"), CONSTRAINT "fk_order" FOREIGN KEY ("order_id") REFERENCES "public"."order" ("order_id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "fk_product" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("product_id") ON UPDATE NO ACTION ON DELETE CASCADE);
-- create "tokens" table
CREATE TABLE "public"."tokens" ("token_id" serial NOT NULL, "user_id" integer NULL, "token" character varying NOT NULL, "created_on" timestamptz NULL DEFAULT now(), "last_access" timestamptz NULL DEFAULT now(), PRIMARY KEY ("token_id"), CONSTRAINT "fk_usertoken" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("user_id") ON UPDATE NO ACTION ON DELETE CASCADE);
