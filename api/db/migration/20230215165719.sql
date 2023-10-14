CREATE TABLE public.cart_details (
    cd_id integer NOT NULL,
    cart_id integer,
    product_id integer,
    product_price numeric,
    quantity integer,
    delivery_price numeric
);

CREATE SEQUENCE public.cart_details_cd_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.cart_details_cd_id_seq OWNED BY public.cart_details.cd_id;


CREATE TABLE public.carts (
    cart_id integer NOT NULL,
    user_id integer,
    price numeric,
    delivery_price numeric,
    created_on timestamp with time zone DEFAULT now(),
    updated_on timestamp with time zone DEFAULT now(),
    total numeric
);

CREATE SEQUENCE public.carts_cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.carts_cart_id_seq OWNED BY public.carts.cart_id;



CREATE TABLE public.categories (
    category_id integer NOT NULL,
    category_name text NOT NULL,
    created_on timestamp with time zone DEFAULT now(),
    image_url text,
    status text
);

CREATE SEQUENCE public.categories_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.categories_category_id_seq OWNED BY public.categories.category_id;

CREATE TABLE public.countries (
    country_id integer NOT NULL,
    country_name character varying(20),
    currency character varying(10),
    currency_symbol character varying(5)
);

CREATE SEQUENCE public.countries_country_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.countries_country_id_seq OWNED BY public.countries.country_id;


CREATE TABLE public.order (
    order_id character varying(20) NOT NULL,
    user_id integer NOT NULL,
    price numeric NOT NULL,
    delivery_price numeric NOT NULL,
    total numeric NOT NULL,
    created_on timestamp with time zone DEFAULT now(),
    email character varying(50) NOT NULL,
    address text NOT NULL
);
CREATE TABLE public.order_details (
    od_id integer NOT NULL,
    order_id character varying(20),
    product_id integer,
    product_price numeric,
    quantity integer,
    delivery_price numeric
);

CREATE SEQUENCE public.order_details_od_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.order_details_od_id_seq OWNED BY public.order_details.od_id;

CREATE TABLE public.products (
    product_id integer NOT NULL,
    category_id integer,
    product_name character varying NOT NULL,
    product_image character varying,
    quantity integer,
    created_on timestamp with time zone DEFAULT now(),
    updated_on timestamp with time zone DEFAULT now(),
    status text DEFAULT 'active'::text,
    price numeric NOT NULL,
    delivery_price numeric DEFAULT 0,
    product_desc character varying(500) DEFAULT 'No description'::character varying,
    gender character varying(10) DEFAULT 'Not specified'::character varying,
    country_id integer DEFAULT 1
);

CREATE SEQUENCE public.products_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- TOC entry 3156 (class 0 OID 0)
-- Dependencies: 206
-- Name: products_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_product_id_seq OWNED BY public.products.product_id;


--
-- TOC entry 203 (class 1259 OID 16536)
-- Name: tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tokens (
    token_id integer NOT NULL,
    user_id integer,
    token character varying NOT NULL,
    created_on timestamp with time zone DEFAULT now(),
    last_access timestamp with time zone DEFAULT now()
);

--
-- TOC entry 202 (class 1259 OID 16534)
-- Name: tokens_token_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tokens_token_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3157 (class 0 OID 0)
-- Dependencies: 202
-- Name: tokens_token_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tokens_token_id_seq OWNED BY public.tokens.token_id;


--
-- TOC entry 201 (class 1259 OID 16520)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    first_name text NOT NULL,
    last_name text,
    email character varying NOT NULL,
    phone bigint,
    password character varying NOT NULL,
    created_on timestamp with time zone DEFAULT now(),
    updated_on timestamp with time zone DEFAULT now(),
    status character varying(10) DEFAULT 'active'::character varying,
    access varchar(20) default 'user'
);


CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;

ALTER TABLE ONLY public.cart_details ALTER COLUMN cd_id SET DEFAULT nextval('public.cart_details_cd_id_seq'::regclass);


--
-- TOC entry 2980 (class 2604 OID 16591)
-- Name: carts cart_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts ALTER COLUMN cart_id SET DEFAULT nextval('public.carts_cart_id_seq'::regclass);


--
-- TOC entry 2970 (class 2604 OID 16557)
-- Name: categories category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN category_id SET DEFAULT nextval('public.categories_category_id_seq'::regclass);


--
-- TOC entry 2986 (class 2604 OID 25517)
-- Name: countries country_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries ALTER COLUMN country_id SET DEFAULT nextval('public.countries_country_id_seq'::regclass);


--
-- TOC entry 2985 (class 2604 OID 16762)
-- Name: order_details od_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_details ALTER COLUMN od_id SET DEFAULT nextval('public.order_details_od_id_seq'::regclass);


--
-- TOC entry 2972 (class 2604 OID 16569)
-- Name: products product_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN product_id SET DEFAULT nextval('public.products_product_id_seq'::regclass);


--
-- TOC entry 2967 (class 2604 OID 16539)
-- Name: tokens token_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens ALTER COLUMN token_id SET DEFAULT nextval('public.tokens_token_id_seq'::regclass);


--
-- TOC entry 2963 (class 2604 OID 16523)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 3000 (class 2606 OID 16608)
-- Name: cart_details cart_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_details
    ADD CONSTRAINT cart_details_pkey PRIMARY KEY (cd_id);


--
-- TOC entry 2998 (class 2606 OID 16595)
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (cart_id);


--
-- TOC entry 2994 (class 2606 OID 16563)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);


--
-- TOC entry 3006 (class 2606 OID 25521)
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (country_id);


--
-- TOC entry 3004 (class 2606 OID 16764)
-- Name: order_details order_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT order_details_pkey PRIMARY KEY (od_id);


--
-- TOC entry 3002 (class 2606 OID 16751)
-- Name: order order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order
    ADD CONSTRAINT order_pkey PRIMARY KEY (order_id);


--
-- TOC entry 2996 (class 2606 OID 16580)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);


--
-- TOC entry 2992 (class 2606 OID 16546)
-- Name: tokens tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_pkey PRIMARY KEY (token_id);


--
-- TOC entry 2988 (class 2606 OID 16533)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 2990 (class 2606 OID 16531)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3011 (class 2606 OID 16609)
-- Name: cart_details fk_cart; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_details
    ADD CONSTRAINT fk_cart FOREIGN KEY (cart_id) REFERENCES public.carts(cart_id) ON DELETE CASCADE;


--
-- TOC entry 3008 (class 2606 OID 16581)
-- Name: products fk_category; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES public.categories(category_id) ON DELETE CASCADE;


--
-- TOC entry 3009 (class 2606 OID 25522)
-- Name: products fk_country; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_country FOREIGN KEY (country_id) REFERENCES public.countries(country_id);


--
-- TOC entry 3014 (class 2606 OID 16765)
-- Name: order_details fk_order; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES public.order(order_id) ON DELETE CASCADE;


--
-- TOC entry 3012 (class 2606 OID 16614)
-- Name: cart_details fk_product; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_details
    ADD CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES public.products(product_id) ON DELETE CASCADE;


--
-- TOC entry 3015 (class 2606 OID 16770)
-- Name: order_details fk_product; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES public.products(product_id) ON DELETE CASCADE;


--
-- TOC entry 3013 (class 2606 OID 16752)
-- Name: order fk_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 3010 (class 2606 OID 16596)
-- Name: carts fk_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 3007 (class 2606 OID 16547)
-- Name: tokens fk_usertoken; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT fk_usertoken FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


-- Completed on 2021-10-28 21:51:55 IST

--
-- PostgreSQL database dump complete
--

create or replace view v_products as
select bp.product_id, bp.product_name, bp.product_image, bp.quantity, bp.created_on, 
bp.price, bp.delivery_price, bp.product_desc, bp.gender, bc.category_id, bc.category_name, bc2.country_id, bc2.country_name  
from products bp
join categories bc ON bp.category_id = bc.category_id 
join countries bc2 on bc2.country_id = bp.country_id 
where bc.status = 'active' and bp.status = 'active';

INSERT INTO categories
  (category_name, created_on, status)
  VALUES('Classical','3/11/2022','active'),
  ('Country','3/11/2022','active'),
  ('Jazz','3/11/2022','active'),
  ('Blues','3/11/2022','active'),
  ('Blues','3/11/2022','active'),
  ('Reggae','3/11/2022','active'),
  ('Rock','3/11/2022','active'),
  ('World','3/11/2022','active'),
  ('Hip Hop','3/11/2022','active'),
  ('Stage And Screen','3/11/2022','active'),
  ('Hip Hop','3/11/2022','active');
  
set datestyle = 'dmy';

insert into countries (country_name, currency, currency_symbol) values('india','rupees','₹');


INSERT INTO products
  (category_id, product_name, product_image, quantity, created_on, updated_on, status, price, delivery_price, product_desc, gender, country_id)
  VALUES(9,'Practical Granite Salad','http://placeimg.com/640/480/fashion',67734,'18/8/2022','3/11/2022','active',294.19,430.08,'Ut totam fugiat voluptatem facere velit eos. Voluptatibus provident provident nesciunt libero quas quidem. Ipsam voluptatem dolorem. Omnis harum amet aut non alias sequi dolores. Facere est velit molestiae soluta consequatur corporis sapiente unde debitis. Soluta repudiandae ab eaque at ut voluptates voluptatem.','Female',1),
  (2,'Unbranded Concrete Chair','http://placeimg.com/640/480/fashion',48994,'9/5/2022','3/11/2022','unactive',493.01,413.68,'Voluptatem aut dolores dolores tenetur. Perferendis voluptatem earum. Est et dignissimos nemo mollitia qui. Amet facilis dolorem et aut non et qui voluptate sed. Et sed dolor reiciendis sint maxime non. Commodi quos accusamus voluptas omnis magni.','Female',1),
  (7,'Practical Rubber Keyboard','http://placeimg.com/640/480/fashion',78618,'1/2/2022','3/11/2022','active',963.74,612.02,'Harum impedit sapiente non. Est cumque tenetur ratione est. Eius a sint in est quasi. Ipsam amet non quos. Recusandae vitae ad totam.','Female',1),
  (10,'Tasty Wooden Towels','http://placeimg.com/640/480/fashion',61825,'9/1/2022','3/11/2022','active',609.99,441.76,'Cupiditate ipsam autem est. Et dolorum voluptatem nihil enim autem ut dolorem. Necessitatibus quae enim et eaque similique harum sint. In voluptatem consequuntur voluptates voluptatibus deserunt. Quia et et voluptas.','Female',1),
  (10,'Generic Soft Fish','http://placeimg.com/640/480/fashion',48920,'3/8/2022','3/11/2022','unactive',57.97,999.09,'Eveniet rerum enim veniam cum voluptatem a voluptate facere. Nisi est ullam nulla expedita. Delectus dolor debitis. Suscipit voluptatem enim ut iure non vel iusto. Asperiores rem doloribus id odio voluptatum corrupti neque.','Female',1),
  (2,'Incredible Frozen Gloves','http://placeimg.com/640/480/fashion',60085,'14/11/2021','3/11/2022','unactive',252.32,285.96,'Reiciendis ab iure blanditiis. Incidunt iusto alias ut enim. Odit autem autem rerum. Qui sapiente ipsam et voluptatem. Omnis nulla tenetur quibusdam fugiat numquam magnam culpa officia. Et voluptas tempore est quo.','Female',1),
  (7,'Incredible Cotton Computer','http://placeimg.com/640/480/fashion',40821,'3/10/2022','3/11/2022','active',332.65,678.11,'Fugiat ab eveniet vel. Beatae id inventore ea odit est facilis qui. Odio eum perspiciatis ut eum et. Praesentium iure repellat omnis eaque non in libero. Ducimus voluptatibus eligendi recusandae rerum ipsa assumenda quia quos porro.','Female',1),
  (3,'Tasty Plastic Chicken','http://placeimg.com/640/480/fashion',17629,'7/3/2022','3/11/2022','unactive',996.15,343.74,'Voluptatibus enim nesciunt neque illo. Voluptatum omnis ipsum ut natus. Vel ex qui nihil consequatur aut ut sit. Dolorem explicabo sunt et laudantium.','Female',1),
  (4,'Fantastic Granite Shoes','http://placeimg.com/640/480/fashion',72444,'31/5/2022','3/11/2022','unactive',837.69,907.01,'Distinctio non iusto itaque dolorem in. Pariatur iure nostrum rerum consequatur aut voluptas autem necessitatibus. Sequi itaque est. Quia aspernatur cum et.','Female',1),
  (9,'Rustic Metal Towels','http://placeimg.com/640/480/fashion',51086,'13/1/2022','3/11/2022','unactive',443.51,721.38,'Porro nihil laboriosam. Dolor voluptas vel eos. Voluptate voluptates nesciunt distinctio. Qui inventore rem. Quod nisi consequatur et dolor.','Female',1),
  (11,'Awesome Plastic Pizza','http://placeimg.com/640/480/fashion',20492,'30/5/2022','3/11/2022','active',274.30,622.54,'Dolorum nisi eius qui explicabo doloribus quia rem iste. Quia sed sint et ut. Est quo aliquid. Nostrum soluta praesentium inventore dolorem ipsa eaque nam sapiente saepe.','Female',1),
  (2,'Fantastic Wooden Fish','http://placeimg.com/640/480/fashion',90269,'2/3/2022','3/11/2022','active',879.50,460.89,'Ea et beatae placeat ipsam asperiores ea esse voluptatem unde. Quos ut inventore asperiores voluptas. Dolor ipsa ut. Non eum quo quia velit consectetur labore voluptas.','Female',1),
  (7,'Unbranded Frozen Computer','http://placeimg.com/640/480/fashion',54845,'20/12/2021','3/11/2022','unactive',668.90,412.41,'Omnis sed maxime voluptate officia laboriosam consectetur distinctio placeat. Omnis molestiae commodi. Et dignissimos rerum nihil unde nostrum. Quis ipsa molestiae voluptatem inventore.','Female',1),
  (2,'Generic Steel Chicken','http://placeimg.com/640/480/fashion',74781,'30/4/2022','3/11/2022','active',542.47,803.81,'Est fugit omnis voluptate temporibus aliquam. Et autem aut harum. Eos aut aut fugiat quas tempora amet ut architecto aliquam.','Female',1),
  (11,'Unbranded Concrete Soap','http://placeimg.com/640/480/fashion',57376,'18/1/2022','3/11/2022','active',903.76,936.13,'Repellendus et et sit. Consequatur voluptas qui dolore. Veritatis recusandae autem delectus placeat labore rerum illum fugiat. Mollitia eos molestias esse et alias consequatur quia qui. Et odit natus.','Female',1),
  (4,'Licensed Soft Keyboard','http://placeimg.com/640/480/fashion',37839,'18/12/2021','3/11/2022','unactive',806.52,877.53,'Aut totam minima temporibus sit nesciunt est accusantium nihil. Consectetur fugiat et. Quasi ratione est sunt at. Veniam voluptas possimus rerum libero ipsam. Repudiandae voluptates quidem deserunt eveniet veniam modi aut blanditiis sed. Sunt repellendus perspiciatis ullam aut ea dolor minima ut veritatis.','Female',1),
  (10,'Intelligent Granite Chair','http://placeimg.com/640/480/fashion',52885,'26/1/2022','3/11/2022','unactive',336.97,193.14,'Et et sequi vel aliquam qui ut perspiciatis aut. Enim exercitationem repudiandae eos ab rem minima. At laudantium fugiat in qui sint sed sunt ab. Sunt itaque incidunt quod incidunt quo animi odio et.','Male',1),
  (7,'Small Granite Tuna','http://placeimg.com/640/480/fashion',86226,'28/4/2022','3/11/2022','unactive',860.03,7.24,'Sed voluptatem laboriosam nihil dolorem. Pariatur deserunt vitae ut voluptate harum. Mollitia quam quas aspernatur. Corrupti molestiae et voluptatibus perspiciatis et sapiente praesentium. Qui ut eius pariatur.','Female',1),
  (10,'Ergonomic Soft Gloves','http://placeimg.com/640/480/fashion',29456,'24/8/2022','2/11/2022','active',93.90,63.80,'Dolor voluptatem atque atque numquam aut tempora. Beatae reiciendis atque accusantium. Velit earum est qui ipsam nam omnis praesentium. Quis at accusantium qui qui velit aut. Enim iusto suscipit ipsa voluptas.','Female',1),
  (1,'Handcrafted Metal Keyboard','http://placeimg.com/640/480/fashion',92024,'12/6/2022','3/11/2022','unactive',113.03,456.40,'Omnis adipisci ut voluptas qui minus animi nam tempora. Numquam sit consequatur delectus beatae est. Necessitatibus ipsam libero dolor. Voluptatem nobis temporibus at nesciunt officia cum molestias.','Male',1),
  (9,'Fantastic Cotton Soap','http://placeimg.com/640/480/fashion',80281,'29/12/2021','3/11/2022','active',198.69,997.02,'Laudantium quisquam sit nihil voluptas accusantium perferendis dolore. Autem ab dicta est. Deserunt voluptatem quisquam omnis ea quo occaecati laborum dicta sed. Quaerat amet voluptas dolore et voluptate ipsum minima. Repellat eaque quidem.','Male',1),
  (10,'Intelligent Granite Keyboard','http://placeimg.com/640/480/fashion',60593,'6/6/2022','3/11/2022','unactive',339.98,379.23,'Tempore laboriosam necessitatibus ut quo vel sunt facere qui. Deleniti voluptas modi corporis eligendi. Repellendus in alias molestiae et ullam atque magni est. Praesentium vel autem illum vitae ut sit. Debitis dolores aut pariatur est.','Male',1),
  (6,'Refined Steel Hat','http://placeimg.com/640/480/fashion',18075,'23/6/2022','3/11/2022','unactive',863.72,646.94,'Recusandae occaecati sit quia nihil qui est non odio autem. Repellendus molestiae eum aut maiores et quo eos vero. Pariatur eum cum voluptatem nesciunt fugiat.','Male',1),
  (11,'Tasty Rubber Chair','http://placeimg.com/640/480/fashion',95435,'18/7/2022','3/11/2022','active',384.27,121.35,'Veniam hic quod sed. Eius animi natus. Aspernatur odio sit quisquam optio et porro. Architecto et est.','Female',1),
  (11,'Handcrafted Concrete Salad','http://placeimg.com/640/480/fashion',70149,'23/6/2022','3/11/2022','unactive',920.81,419.51,'Accusantium sed cumque exercitationem sed ipsum hic. Voluptatem error mollitia sapiente dolor natus repellat dolores quo. Architecto fugit hic tempora autem voluptas perferendis quia qui. Voluptatem ut in sit voluptatem ipsa ut sed ipsum ipsam. Veritatis eos dignissimos aspernatur nostrum.','Male',1),
  (9,'Licensed Cotton Pants','http://placeimg.com/640/480/fashion',6492,'25/1/2022','3/11/2022','active',94.01,280.16,'Facere maiores qui minima et et numquam tenetur voluptatem culpa. Optio ab quo magnam ea rerum vel. Aliquid eos eius et unde.','Female',1),
  (10,'Intelligent Rubber Shirt','http://placeimg.com/640/480/fashion',62099,'23/9/2022','3/11/2022','active',866.41,877.82,'Enim sint aut voluptatem praesentium molestias hic. Tenetur delectus et autem tempore et esse aliquam ipsam. Inventore omnis quia commodi harum. Aspernatur omnis omnis qui. Est et dolores et in.','Female',1),
  (11,'Gorgeous Metal Towels','http://placeimg.com/640/480/fashion',57724,'6/10/2022','3/11/2022','unactive',203.98,275.01,'Eum voluptas nemo velit dolore incidunt aut quae ullam. Dolorem explicabo neque. Velit omnis minus rerum quos. Magnam aliquid ea ut aut iusto debitis. Fugit quaerat quo reiciendis odio repudiandae voluptatum laboriosam sit aut. Rem consequuntur id distinctio blanditiis et.','Male',1),
  (8,'Rustic Cotton Ball','http://placeimg.com/640/480/fashion',66790,'3/7/2022','3/11/2022','unactive',305.10,737.51,'Sit vel nulla et nostrum est qui voluptas qui temporibus. Est et debitis incidunt dicta et. Molestias omnis autem omnis omnis aspernatur ut consequatur. Nostrum cum eveniet eos nihil doloremque ullam voluptate autem ducimus.','Female',1),
  (9,'Rustic Concrete Shoes','http://placeimg.com/640/480/fashion',40310,'11/9/2022','3/11/2022','active',633.57,71.64,'Excepturi itaque minima aut minus enim ut ad. Est ipsum et illum eum. Et sit labore dolorem nihil autem in incidunt. Vitae eveniet sapiente.','Male',1),
  (8,'Intelligent Steel Towels','http://placeimg.com/640/480/fashion',81222,'27/4/2022','3/11/2022','unactive',725.59,967.54,'Consequatur itaque saepe alias debitis corporis laudantium voluptatem quo molestiae. Est et et repellat inventore optio in. Aut et dolorum. Maiores a deleniti tempora.','Male',1),
  (6,'Handcrafted Plastic Computer','http://placeimg.com/640/480/fashion',62936,'30/5/2022','3/11/2022','active',408.92,737.15,'Atque non atque. Perspiciatis voluptatem cupiditate et. Ad illo vitae aliquam. Ad ea ut animi non repellat totam explicabo aut.','Male',1),
  (9,'Handmade Rubber Towels','http://placeimg.com/640/480/fashion',97781,'14/7/2022','3/11/2022','unactive',22.38,553.00,'Dolor quo nisi. Expedita totam eius odio sunt aut repellendus. A autem quaerat tempore quia.','Female',1),
  (7,'Tasty Plastic Soap','http://placeimg.com/640/480/fashion',48828,'8/10/2022','3/11/2022','unactive',702.05,783.96,'Eveniet aut eum a. Blanditiis sed doloribus. Velit et assumenda odio et. Et omnis rerum exercitationem.','Male',1),
  (9,'Awesome Rubber Chicken','http://placeimg.com/640/480/fashion',96118,'6/4/2022','3/11/2022','unactive',108.69,672.38,'Officia ullam vero necessitatibus provident dolore recusandae at ea ut. Quasi odit expedita itaque dolores. Sed ex nesciunt. Assumenda ad sequi.','Male',1),
  (6,'Ergonomic Granite Pants','http://placeimg.com/640/480/fashion',82942,'24/11/2021','3/11/2022','unactive',177.37,180.16,'Modi unde voluptatum aut dolores corporis animi. Ea omnis dolorem explicabo rerum illum ut et odit et. Nam est dignissimos aut temporibus. Consectetur tenetur aut atque esse quia. Ea commodi iusto ex.','Female',1),
  (3,'Licensed Frozen Car','http://placeimg.com/640/480/fashion',17034,'24/9/2022','3/11/2022','unactive',56.34,220.18,'Omnis at cumque quo natus minus ad atque perspiciatis. Fuga ut eos. Dolorem officiis voluptatum reiciendis omnis reprehenderit porro consectetur ut reiciendis.','Female',1),
  (4,'Gorgeous Soft Shoes','http://placeimg.com/640/480/fashion',18552,'7/2/2022','3/11/2022','unactive',404.08,750.54,'Perspiciatis aut aperiam et officia ex numquam magnam. Et magnam aut eligendi molestias impedit. Sequi in ad qui minima aliquid optio ut ipsum. Placeat voluptatum et tempora possimus at explicabo cumque quia et.','Female',1),
  (6,'Practical Plastic Chips','http://placeimg.com/640/480/fashion',17468,'12/4/2022','3/11/2022','unactive',515.50,300.73,'Minima repudiandae eos deleniti dolorem earum aliquam delectus possimus. Voluptate recusandae consequuntur deleniti aut dolorem voluptatem fugiat voluptatem molestias. Natus distinctio voluptas fugit veniam quod. Qui ut hic.','Female',1),
  (7,'Handmade Rubber Bike','http://placeimg.com/640/480/fashion',58653,'31/8/2022','3/11/2022','unactive',329.97,9.43,'Minus voluptatum dolores quidem est rerum voluptas. Et quia nulla voluptate nam. Eos ipsa voluptates facilis facere. Tenetur consequatur velit quis enim iste possimus possimus.','Female',1),
  (2,'Intelligent Fresh Cheese','http://placeimg.com/640/480/fashion',85739,'21/5/2022','3/11/2022','unactive',936.70,861.92,'Quia illo quia ut ut quia quaerat. Voluptatum dolor ab sit saepe autem aperiam repudiandae. Fuga debitis odio.','Male',1),
  (7,'Tasty Fresh Ball','http://placeimg.com/640/480/fashion',59567,'3/6/2022','3/11/2022','unactive',202.41,794.30,'Adipisci ab qui provident facilis iure. Ut aut ut non natus. Est quaerat autem quos sed nostrum amet quo eius aperiam.','Male',1),
  (4,'Tasty Frozen Table','http://placeimg.com/640/480/fashion',6729,'26/4/2022','3/11/2022','active',305.48,900.08,'Et ipsa consectetur officia qui suscipit deserunt laboriosam. Quia sapiente ad est ad id dolore. Dolore magni ea corrupti sit aut dignissimos fuga. Distinctio quia laborum vitae. Dolorem laborum voluptas ad rem laudantium. Est temporibus dolor est quisquam in officia minima.','Female',1),
  (7,'Sleek Fresh Table','http://placeimg.com/640/480/fashion',48839,'20/3/2022','3/11/2022','active',723.79,184.71,'Aut non dolore. Quia voluptas quia aut. Iusto soluta magni. Est ducimus quod rerum sed qui quasi voluptatum dolorum similique. Ducimus assumenda cum et. Et est fugit aut.','Male',1),
  (4,'Fantastic Wooden Shirt','http://placeimg.com/640/480/fashion',66517,'30/8/2022','3/11/2022','unactive',690.53,135.40,'Autem officia deserunt repellendus nesciunt rerum voluptatem dolorum reiciendis corrupti. Minima enim qui eos distinctio repellendus sit. Dolor iusto aut eius a temporibus placeat. Omnis repellat natus sed doloribus in ipsa. Eum pariatur provident consequuntur consectetur mollitia soluta nam.','Male',1),
  (6,'Small Granite Pants','http://placeimg.com/640/480/fashion',28601,'24/3/2022','3/11/2022','unactive',99.15,441.33,'Voluptatum qui voluptas ut quia voluptatum voluptatibus vitae error qui. Eius temporibus dolorum. Quam aut itaque. Facilis et voluptas molestias hic eum et. Autem atque quam quo qui.','Male',1),
  (9,'Practical Concrete Bacon','http://placeimg.com/640/480/fashion',16666,'19/5/2022','3/11/2022','unactive',11.43,477.46,'Architecto quia et at et quibusdam doloremque fugiat accusamus. Modi est officiis. Sit ullam vel non voluptatum minus. Autem aut qui ab at.','Male',1),
  (9,'Awesome Steel Chair','http://placeimg.com/640/480/fashion',9400,'16/2/2022','3/11/2022','active',906.91,229.88,'Quas at odit illo voluptatem nulla neque nesciunt nihil. Saepe et enim consequuntur dolore. Numquam similique consequuntur unde quia et.','Male',1),
  (3,'Practical Frozen Cheese','http://placeimg.com/640/480/fashion',60777,'17/7/2022','3/11/2022','active',132.82,604.31,'Laborum voluptatem praesentium possimus ducimus sint aut ad praesentium debitis. Amet aut voluptatum maiores est. Debitis est quo officiis doloremque sunt. Voluptatem non sunt commodi atque impedit consequatur vero accusamus aut.','Female',1),
  (4,'Fantastic Granite Fish','http://placeimg.com/640/480/fashion',27372,'27/12/2021','3/11/2022','unactive',800.89,425.27,'Laboriosam rerum omnis est repellendus perspiciatis. Amet nobis sunt est. Voluptatum tempora qui quidem deserunt nostrum. Dolores porro ipsum perspiciatis enim assumenda et tempore eligendi. Consequuntur quod omnis ducimus magnam. Et minus dolor magnam aut quas consequatur.','Male',1),
  (3,'Ergonomic Plastic Towels','http://placeimg.com/640/480/fashion',16910,'1/5/2022','3/11/2022','unactive',758.44,200.25,'Voluptas perferendis quasi id id. Excepturi qui maiores dolor autem quia rerum. Non ea vitae pariatur doloribus quae eos eaque. Quam voluptatibus vel doloribus. Vel voluptatibus dolorum earum.','Female',1),
  (6,'Generic Rubber Table','http://placeimg.com/640/480/fashion',31414,'8/6/2022','3/11/2022','unactive',478.45,44.08,'Magnam nihil atque. Voluptas dolorem iusto ipsum aut voluptate occaecati veritatis earum. Aliquam quos error occaecati est numquam. Iusto iusto consequatur ut. Impedit ut delectus. Aut ut aspernatur sit.','Male',1),
  (10,'Intelligent Frozen Chair','http://placeimg.com/640/480/fashion',34937,'13/8/2022','3/11/2022','unactive',360.91,260.26,'Magnam natus debitis aliquid perspiciatis consequuntur eum. Sit harum ad et porro autem. Aperiam quas quas id debitis. Sint illo dignissimos pariatur porro et ut fugiat occaecati qui.','Female',1),
  (4,'Licensed Fresh Bike','http://placeimg.com/640/480/fashion',33120,'19/12/2021','3/11/2022','active',155.95,134.62,'Explicabo in aut et deserunt quos. Ut sint optio dolor omnis. Ut hic velit aut aspernatur deserunt officiis porro explicabo sequi.','Female',1),
  (8,'Sleek Steel Cheese','http://placeimg.com/640/480/fashion',26740,'1/5/2022','3/11/2022','active',156.51,766.43,'Deleniti rerum asperiores. Nesciunt distinctio ducimus reiciendis facere repellendus maxime doloremque consequatur. Eius nesciunt est quibusdam sunt consequuntur sed illum dolore rem. Ea dolorem quod necessitatibus autem et. Sit aut aut soluta.','Female',1),
  (3,'Awesome Steel Towels','http://placeimg.com/640/480/fashion',82958,'28/1/2022','2/11/2022','active',5.72,608.96,'Eum delectus non similique iure nihil adipisci. Qui sed quo laboriosam sint. Soluta similique qui numquam ut voluptatem ut velit veniam. Repellendus quas dignissimos eos alias laborum. Dolorem necessitatibus voluptatem veritatis et similique possimus qui est.','Male',1),
  (2,'Rustic Steel Bike','http://placeimg.com/640/480/fashion',75867,'25/11/2021','3/11/2022','active',171.71,71.07,'Porro quas porro impedit eius. At occaecati ut est. Aut nobis et dolore voluptatem sed sapiente minima sunt cumque.','Female',1),
  (5,'Gorgeous Cotton Pizza','http://placeimg.com/640/480/fashion',79151,'20/10/2022','3/11/2022','active',661.61,787.12,'Quo aut ea rem quae magni ratione consequatur corrupti enim. Perspiciatis officia numquam quidem maxime nesciunt. Consectetur quaerat non reprehenderit totam quos iusto molestiae magnam. Aliquam distinctio ut quos error. Consequuntur perspiciatis vitae eligendi omnis et aspernatur voluptatem. Itaque quaerat optio inventore eos commodi consequatur et.','Female',1),
  (11,'Handcrafted Frozen Bacon','http://placeimg.com/640/480/fashion',55211,'2/1/2022','3/11/2022','unactive',370.92,216.56,'Nesciunt voluptatem suscipit vel voluptas alias. Quia molestias voluptas fugiat iusto repellat in. Ut esse nemo. Deleniti omnis sed minus molestias qui. Quisquam dolor vero quas quod est eum enim. Ea sed fuga ut cumque quod quia.','Female',1),
  (6,'Sleek Fresh Salad','http://placeimg.com/640/480/fashion',29208,'22/7/2022','3/11/2022','active',140.89,393.33,'Aut temporibus hic laudantium dolorum harum voluptate magnam praesentium. Quos eius nisi quo eius magni voluptate. Fugiat est eaque est culpa.','Female',1),
  (1,'Unbranded Metal Table','http://placeimg.com/640/480/fashion',9544,'3/11/2022','3/11/2022','active',66.59,475.32,'Sunt consectetur magni laboriosam sunt ratione quis quia autem. Qui velit expedita et magni dolore. Et voluptas eum nihil et quibusdam est dolorem illo qui. Soluta voluptas alias vel. Nesciunt nihil magnam pariatur recusandae esse dolorem.','Male',1),
  (4,'Sleek Steel Hat','http://placeimg.com/640/480/fashion',47459,'7/12/2021','3/11/2022','unactive',762.36,213.54,'Exercitationem assumenda aliquam sunt voluptatem sequi ea. Est explicabo laborum quia id. Eos voluptatem minus natus dignissimos veritatis. Molestiae occaecati est omnis. Consequatur enim suscipit quam.','Male',1),
  (2,'Tasty Steel Gloves','http://placeimg.com/640/480/fashion',58773,'2/8/2022','3/11/2022','active',684.04,94.46,'Voluptatum eos quis deleniti sint aliquam impedit deserunt rem enim. Corporis nobis quasi dolor et nostrum quibusdam quae in iure. Mollitia omnis accusantium corporis quo libero dicta eum harum quam. Sed reprehenderit hic qui laboriosam. Autem nesciunt quae.','Male',1),
  (9,'Practical Granite Computer','http://placeimg.com/640/480/fashion',23856,'15/3/2022','3/11/2022','active',811.10,745.66,'Ipsum cum molestias vel nesciunt amet at accusamus. Ut adipisci consectetur. A hic dolores. Assumenda neque ex sapiente qui. Sapiente quasi labore et dolores deleniti quibusdam autem non.','Male',1),
  (3,'Intelligent Granite Bacon','http://placeimg.com/640/480/fashion',58720,'12/7/2022','3/11/2022','active',467.26,997.84,'Veritatis et natus. Illo non est accusamus velit cumque amet. Ea quod amet. Velit quia architecto sint laborum expedita nostrum nam dolorem et.','Male',1),
  (10,'Generic Concrete Pants','http://placeimg.com/640/480/fashion',59809,'15/4/2022','2/11/2022','unactive',894.85,309.01,'Molestias amet perferendis. Aut placeat fugit est qui. Voluptatem optio et non enim. Labore atque consequatur excepturi occaecati rem. Cupiditate suscipit nisi ad quod. Aut inventore aut.','Female',1),
  (5,'Tasty Steel Keyboard','http://placeimg.com/640/480/fashion',60358,'7/9/2022','3/11/2022','unactive',835.12,336.09,'Aut ipsum sed quis quis dolores. Cumque autem voluptatem commodi nisi distinctio non numquam accusamus. Ut ad molestiae nemo voluptate expedita.','Male',1),
  (10,'Fantastic Wooden Shoes','http://placeimg.com/640/480/fashion',52751,'15/3/2022','3/11/2022','unactive',407.28,663.37,'Ut molestiae ad aut veritatis quisquam ut. Et enim quia. Adipisci mollitia omnis animi sit odio.','Male',1),
  (1,'Licensed Metal Gloves','http://placeimg.com/640/480/fashion',84971,'21/1/2022','3/11/2022','active',673.56,980.73,'Reiciendis sapiente ut aut. Aliquid asperiores veritatis. Rem repellendus sed et in nisi quia omnis laboriosam id. Numquam provident illum eligendi voluptas debitis modi provident consequatur.','Female',1),
  (7,'Awesome Soft Chicken','http://placeimg.com/640/480/fashion',57214,'20/4/2022','3/11/2022','unactive',541.18,701.89,'Accusamus non eos rerum ab eos nemo sunt voluptates voluptate. Consequatur incidunt dolorum iste omnis libero. Sunt et eos consequatur inventore amet facere quos cum quae. Consectetur quasi vel dignissimos quasi nesciunt non. Tempora optio aliquid sint nihil magni quis sed optio. Quas qui ut sit consequatur quae excepturi veritatis dolores dolores.','Female',1),
  (10,'Handcrafted Concrete Towels','http://placeimg.com/640/480/fashion',97978,'25/9/2022','3/11/2022','unactive',461.80,660.27,'Vel incidunt eius sint dolores ut modi ea qui. Voluptatem eaque culpa. Aut saepe a ut non sapiente.','Female',1),
  (9,'Intelligent Soft Ball','http://placeimg.com/640/480/fashion',99126,'18/11/2021','3/11/2022','unactive',483.12,383.96,'Eum quaerat quia explicabo vel nisi et incidunt. Iure accusamus praesentium nihil consequatur. Aut quasi quia ipsam officia autem aut.','Male',1),
  (7,'Fantastic Plastic Shoes','http://placeimg.com/640/480/fashion',44535,'21/4/2022','3/11/2022','active',188.31,267.36,'Ea maiores sed nostrum. Eius placeat a voluptas ab fugiat molestiae voluptatum impedit. Fugiat at deleniti sint exercitationem minima sunt.','Female',1),
  (5,'Rustic Wooden Soap','http://placeimg.com/640/480/fashion',57695,'11/12/2021','3/11/2022','unactive',708.55,437.84,'Porro nemo sed placeat. Ipsam autem tempora repudiandae sit itaque et perferendis fuga. Eligendi ipsum aut accusamus perferendis. Corrupti nesciunt sunt modi animi non ut rem.','Female',1),
  (5,'Licensed Cotton Salad','http://placeimg.com/640/480/fashion',55452,'14/8/2022','3/11/2022','active',626.47,499.93,'Atque quidem atque assumenda alias nostrum vel ea excepturi. Ipsam maiores quam quia explicabo dolor voluptatum iste aut qui. Non culpa voluptas voluptatem aspernatur quia. Officia dicta saepe aperiam rerum aut dolores dolore nostrum. Quis voluptatem tenetur.','Female',1),
  (5,'Fantastic Granite Bacon','http://placeimg.com/640/480/fashion',14353,'19/6/2022','3/11/2022','unactive',573.74,384.78,'Provident et et laborum in amet quod. Quisquam eius animi architecto est qui repudiandae vel quis sunt. Totam porro sint neque natus. Nostrum quia ea ut saepe et debitis.','Female',1),
  (4,'Ergonomic Frozen Chips','http://placeimg.com/640/480/fashion',24994,'27/2/2022','3/11/2022','unactive',62.09,271.40,'Eos aut voluptatem dolor qui alias debitis error eligendi. Laborum dicta facere voluptatem quae pariatur. Non quo inventore est quasi eos et vel.','Female',1),
  (8,'Refined Fresh Mouse','http://placeimg.com/640/480/fashion',36936,'13/7/2022','3/11/2022','active',399.02,166.59,'Ratione corporis consequatur recusandae nihil qui magnam. Rerum numquam quam sapiente deleniti quia quia iusto. Corrupti aperiam mollitia totam quod dolorem. Error velit deleniti labore impedit commodi non labore. Incidunt eaque at suscipit. Harum eius voluptatibus odit ea libero id.','Female',1),
  (5,'Incredible Frozen Cheese','http://placeimg.com/640/480/fashion',91840,'22/2/2022','2/11/2022','active',85.45,479.34,'Ut voluptas eos assumenda quam soluta minus nobis. Optio consequatur voluptas vel nam placeat assumenda quis dolores. Omnis quas vitae. Possimus expedita est voluptatibus aut voluptatum officiis. Pariatur molestias non. Facilis accusantium est a et possimus.','Female',1),
  (2,'Handmade Plastic Salad','http://placeimg.com/640/480/fashion',39698,'17/3/2022','3/11/2022','active',482.94,641.98,'Tempora nam et. Vitae veniam qui non iusto est et autem est voluptatem. Vero saepe sit harum ipsa odio distinctio expedita est sunt. Ipsa voluptatum non possimus in dolores. Dolorem autem aliquam esse doloribus amet. Dignissimos quas veniam dolor est.','Male',1),
  (6,'Practical Steel Shirt','http://placeimg.com/640/480/fashion',5493,'2/7/2022','3/11/2022','unactive',147.23,178.62,'Laborum cum dolorem incidunt placeat similique dicta molestiae eos ullam. Adipisci magni aut perspiciatis et ratione laboriosam. Eos ratione magnam quam ex. Ut ut quae magni cum. Repellendus laborum consectetur libero et ut.','Female',1),
  (11,'Handcrafted Steel Salad','http://placeimg.com/640/480/fashion',94644,'1/11/2022','3/11/2022','unactive',41.38,969.67,'Et dicta ipsum aut qui magni. Et eum nobis et voluptatem qui labore maxime quod. Autem commodi sapiente ea assumenda quam. Ea nesciunt adipisci ipsam rerum cum animi commodi consequatur maiores. Id quo provident sed perspiciatis earum sint magnam. Dolorem labore at sequi minus quae ipsa voluptatem.','Female',1),
  (6,'Awesome Rubber Sausages','http://placeimg.com/640/480/fashion',82854,'1/5/2022','3/11/2022','unactive',983.01,385.90,'Et aut praesentium incidunt illo. Earum eligendi illo explicabo in alias et id necessitatibus. Dolor et aut laudantium exercitationem nihil magni.','Female',1),
  (7,'Intelligent Rubber Mouse','http://placeimg.com/640/480/fashion',58014,'8/12/2021','3/11/2022','unactive',259.93,474.51,'Temporibus consectetur error voluptates sunt non enim ab consequatur recusandae. Vitae recusandae sint non qui placeat. Ducimus tenetur distinctio voluptate enim distinctio rerum occaecati. Saepe aliquid aperiam in unde. Ratione voluptatem incidunt nam asperiores.','Female',1),
  (3,'Awesome Granite Gloves','http://placeimg.com/640/480/fashion',61343,'22/1/2022','3/11/2022','unactive',381.76,785.45,'Provident dolores magnam ut aperiam id corrupti omnis provident eius. Quam necessitatibus aut et velit doloremque facilis. Sit corporis consequatur.','Male',1),
  (9,'Tasty Fresh Tuna','http://placeimg.com/640/480/fashion',73681,'19/8/2022','3/11/2022','unactive',603.95,231.46,'Fugiat repellat quibusdam blanditiis omnis nostrum rem consequatur voluptas unde. Atque nesciunt sapiente doloribus molestiae consequuntur. Repellat est exercitationem deleniti. Magni adipisci doloremque eius. Voluptatem officiis consequatur.','Male',1),
  (2,'Awesome Fresh Table','http://placeimg.com/640/480/fashion',17767,'1/6/2022','3/11/2022','active',94.73,883.56,'Autem fugit illum eum occaecati non. Aliquid quam voluptate. Saepe sit iure delectus ex recusandae corrupti eum. Accusantium voluptas quaerat quos explicabo.','Male',1),
  (9,'Ergonomic Steel Ball','http://placeimg.com/640/480/fashion',68411,'3/8/2022','3/11/2022','unactive',528.79,444.03,'Voluptas qui qui culpa dignissimos exercitationem. Odio optio in. Est natus rerum omnis voluptate cumque. Voluptatum eum deserunt quia doloremque possimus. Ex vel nisi quaerat.','Female',1),
  (5,'Ergonomic Metal Shirt','http://placeimg.com/640/480/fashion',4871,'6/10/2022','3/11/2022','unactive',316.37,504.34,'Nam esse et et dolor corporis laborum dolores. Adipisci molestiae et quo et. Dolorem consectetur non rerum rerum sit doloremque possimus libero.','Male',1),
  (3,'Handmade Concrete Soap','http://placeimg.com/640/480/fashion',56646,'6/9/2022','3/11/2022','active',236.33,945.41,'Autem incidunt rerum dignissimos et consectetur vitae. Officia cumque facere tempora veniam et. Ut voluptatem et ut dolor repellat perferendis illo ipsam tenetur.','Male',1),
  (8,'Unbranded Fresh Salad','http://placeimg.com/640/480/fashion',26193,'6/10/2022','2/11/2022','active',19.24,407.82,'Porro voluptatem omnis dicta et numquam. Expedita commodi similique aut hic. Voluptatem placeat iste odio distinctio explicabo deserunt amet autem iure. Accusamus voluptatem id omnis voluptates. Atque omnis est sed vel et libero.','Male',1),
  (8,'Small Cotton Keyboard','http://placeimg.com/640/480/fashion',36626,'26/9/2022','3/11/2022','active',179.22,671.78,'Rem autem vero. Consectetur consequatur quis aperiam adipisci ut ducimus rem sed quae. Nobis accusantium excepturi delectus fugiat nam perspiciatis.','Female',1),
  (5,'Unbranded Wooden Bacon','http://placeimg.com/640/480/fashion',78551,'21/4/2022','3/11/2022','active',154.20,722.76,'Est maxime illo et dignissimos. Nemo quos voluptatem eveniet illum. Eos et quis deleniti non dolor in. Fuga laboriosam ducimus commodi ad laboriosam laborum deserunt eos magnam.','Male',1),
  (2,'Gorgeous Steel Bacon','http://placeimg.com/640/480/fashion',43071,'9/2/2022','3/11/2022','active',213.96,114.83,'Animi cum quis. Ut adipisci praesentium. Pariatur minima autem iste eligendi aut maiores quo accusantium.','Female',1),
  (2,'Fantastic Granite Pizza','http://placeimg.com/640/480/fashion',18192,'5/6/2022','3/11/2022','active',507.44,606.51,'Voluptates repudiandae et eos. Voluptatem necessitatibus debitis eius eum a ipsa deleniti aut eveniet. Delectus enim deleniti.','Female',1),
  (11,'Gorgeous Concrete Hat','http://placeimg.com/640/480/fashion',83018,'19/10/2022','3/11/2022','active',329.07,967.13,'Aut totam iusto. Nulla voluptate accusantium qui. Quo consequuntur recusandae non. Recusandae aut eos ratione cumque soluta molestiae.','Female',1),
  (10,'Gorgeous Fresh Bike','http://placeimg.com/640/480/fashion',40490,'25/3/2022','3/11/2022','unactive',759.63,488.33,'Consequatur quo vel dolorum non sunt alias provident voluptatem. Ut laudantium laboriosam mollitia a asperiores repellendus corporis eveniet excepturi. Modi hic animi libero deserunt.','Female',1),
  (3,'Practical Wooden Hat','http://placeimg.com/640/480/fashion',48240,'15/6/2022','3/11/2022','active',189.34,603.94,'Voluptatem harum magni quia consequatur nostrum sed ut excepturi et. Ut error nam similique ut amet atque nihil. Impedit aliquid culpa quod culpa voluptatem natus ab et. Blanditiis iste rerum dolor nemo.','Female',1),
  (6,'Tasty Rubber Shirt','http://placeimg.com/640/480/fashion',92732,'22/1/2022','3/11/2022','active',968.54,421.97,'Dolores corrupti in hic. Id omnis et inventore. Rerum cumque velit et fuga. Enim velit non sint.','Female',1),
  (9,'Unbranded Steel Mouse','http://placeimg.com/640/480/fashion',90818,'7/4/2022','3/11/2022','active',489.26,429.15,'Reiciendis est fugiat consequatur assumenda recusandae. Veniam adipisci ullam. Incidunt dolore aut praesentium beatae velit libero voluptatem molestiae magni. Praesentium reiciendis voluptatem officiis omnis excepturi perspiciatis assumenda.','Female',1);
  
create view v_cart as select c.user_id, c.cart_id, cd.cd_id as "card_item_id", cd.product_id, p.price, cd.quantity, p.delivery_price
from cart_details cd
join carts c on c.cart_id = cd.cart_id 
join products p on cd.product_id = p.product_id;

ALTER TABLE public."order" RENAME TO orders;
