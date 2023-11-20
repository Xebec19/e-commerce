--
-- PostgreSQL database dump
--

-- Dumped from database version 12.16 (Ubuntu 12.16-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.16 (Ubuntu 12.16-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: enum_access; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_access AS ENUM (
    'user',
    'admin'
);


ALTER TYPE public.enum_access OWNER TO postgres;

--
-- Name: enum_gender; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_gender AS ENUM (
    'male',
    'female',
    'undefined'
);


ALTER TYPE public.enum_gender OWNER TO postgres;

--
-- Name: enum_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_status AS ENUM (
    'active',
    'inactive'
);


ALTER TYPE public.enum_status OWNER TO postgres;

--
-- Name: enum_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_type AS ENUM (
    'voucher',
    'coupon'
);


ALTER TYPE public.enum_type OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cart_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart_details (
    cd_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    cart_id uuid,
    product_id uuid,
    product_price numeric,
    quantity numeric,
    delivery_price numeric
);


ALTER TABLE public.cart_details OWNER TO postgres;

--
-- Name: carts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carts (
    cart_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid,
    discount_code character varying(20),
    created_on timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_on timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.carts OWNER TO postgres;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    category_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    category_name character varying(200) NOT NULL,
    created_on timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    image_url text,
    status public.enum_status DEFAULT 'active'::public.enum_status
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: countries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.countries (
    country_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    country_name character varying(200) NOT NULL,
    currency character varying(200) NOT NULL,
    currency_symbol character varying(5) NOT NULL
);


ALTER TABLE public.countries OWNER TO postgres;

--
-- Name: discounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.discounts (
    discount_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    code character varying(20) NOT NULL,
    status public.enum_status DEFAULT 'active'::public.enum_status,
    type public.enum_type DEFAULT 'voucher'::public.enum_type,
    value integer DEFAULT 10,
    created_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_by uuid,
    updated_by uuid,
    expired_on timestamp without time zone DEFAULT (CURRENT_TIMESTAMP + '1 year'::interval)
);


ALTER TABLE public.discounts OWNER TO postgres;

--
-- Name: order_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_details (
    od_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    order_id uuid,
    product_id uuid,
    product_price numeric NOT NULL,
    quantity numeric NOT NULL,
    delivery_price numeric NOT NULL
);


ALTER TABLE public.order_details OWNER TO postgres;

--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    order_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid,
    price numeric DEFAULT 0,
    delivery_price numeric DEFAULT 0,
    total numeric DEFAULT 0,
    created_on timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    billing_first_name character varying(200) NOT NULL,
    billing_last_name character varying(200) NOT NULL,
    billing_email character varying(200) NOT NULL,
    billing_address text,
    shipping_first_name character varying(200) NOT NULL,
    shipping_last_name character varying(200) NOT NULL,
    shipping_email character varying(200) NOT NULL,
    shipping_address text
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: product_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_images (
    img_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    product_id uuid,
    image_url text NOT NULL,
    created_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_by uuid,
    status public.enum_status DEFAULT 'active'::public.enum_status,
    is_featured boolean DEFAULT false
);


ALTER TABLE public.product_images OWNER TO postgres;

--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    product_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    category_id uuid,
    product_name character varying(200) NOT NULL,
    price numeric DEFAULT 0,
    delivery_price numeric DEFAULT 0,
    gender public.enum_gender DEFAULT 'undefined'::public.enum_gender,
    product_desc text,
    quantity numeric DEFAULT 0,
    country_id uuid,
    created_on timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_on timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    status public.enum_status DEFAULT 'active'::public.enum_status
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: schema_migration; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.schema_migration (
    version character varying(14) NOT NULL
);


ALTER TABLE public.schema_migration OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    first_name character varying(200) NOT NULL,
    last_name character varying(200),
    email character varying(200),
    phone character varying(20),
    password character varying(200) NOT NULL,
    created_on timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_on timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    status public.enum_status DEFAULT 'active'::public.enum_status,
    access public.enum_access DEFAULT 'user'::public.enum_access
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: v_products; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.v_products AS
 SELECT bp.product_id,
    bp.product_name,
    pi2.image_url,
    bp.quantity,
    bp.created_on,
    bp.price,
    bp.delivery_price,
    bp.product_desc,
    bp.gender,
    bc.category_id,
    bc.category_name,
    bc2.country_id,
    bc2.country_name
   FROM (((public.products bp
     JOIN public.categories bc ON ((bp.category_id = bc.category_id)))
     JOIN public.countries bc2 ON ((bc2.country_id = bp.country_id)))
     JOIN public.product_images pi2 ON ((pi2.product_id = bp.product_id)))
  WHERE ((bc.status = 'active'::public.enum_status) AND (bp.status = 'active'::public.enum_status) AND pi2.is_featured);


ALTER TABLE public.v_products OWNER TO postgres;

--
-- Name: cart_details cart_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_details
    ADD CONSTRAINT cart_details_pkey PRIMARY KEY (cd_id);


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (cart_id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);


--
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (country_id);


--
-- Name: discounts discounts_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discounts
    ADD CONSTRAINT discounts_code_key UNIQUE (code);


--
-- Name: discounts discounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discounts
    ADD CONSTRAINT discounts_pkey PRIMARY KEY (discount_id);


--
-- Name: order_details order_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT order_details_pkey PRIMARY KEY (od_id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (order_id);


--
-- Name: product_images product_images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_pkey PRIMARY KEY (img_id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);


--
-- Name: schema_migration schema_migration_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schema_migration
    ADD CONSTRAINT schema_migration_pkey PRIMARY KEY (version);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: schema_migration_version_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX schema_migration_version_idx ON public.schema_migration USING btree (version);


--
-- Name: cart_details cart_details_cart_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_details
    ADD CONSTRAINT cart_details_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.carts(cart_id);


--
-- Name: cart_details cart_details_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_details
    ADD CONSTRAINT cart_details_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- Name: carts carts_discount_code_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_discount_code_fkey FOREIGN KEY (discount_code) REFERENCES public.discounts(code);


--
-- Name: carts carts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: discounts discounts_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discounts
    ADD CONSTRAINT discounts_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(user_id);


--
-- Name: discounts discounts_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discounts
    ADD CONSTRAINT discounts_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(user_id);


--
-- Name: order_details order_details_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT order_details_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(order_id);


--
-- Name: order_details order_details_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT order_details_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: product_images product_images_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- Name: product_images product_images_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(user_id);


--
-- Name: products products_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(category_id);


--
-- Name: products products_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_country_id_fkey FOREIGN KEY (country_id) REFERENCES public.countries(country_id);


--
-- PostgreSQL database dump complete
--

