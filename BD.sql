-- DROP SCHEMA public;

CREATE SCHEMA public AUTHORIZATION pg_database_owner;

-- DROP SEQUENCE public.contacts_id_seq;

CREATE SEQUENCE public.contacts_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.content_id_seq;

CREATE SEQUENCE public.content_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.flow_executions_id_seq;

CREATE SEQUENCE public.flow_executions_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.flows_id_seq;

CREATE SEQUENCE public.flows_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.roles_id_seq;

CREATE SEQUENCE public.roles_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.users_id_seq;

CREATE SEQUENCE public.users_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;-- public.blog_posts definition

-- Drop table

-- DROP TABLE public.blog_posts;

CREATE TABLE public.blog_posts (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	slug text NOT NULL,
	title text NOT NULL,
	excerpt text NULL,
	cover_image_url text NULL,
	content_markdown text NOT NULL,
	is_published bool DEFAULT false NOT NULL,
	published_at timestamptz NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	updated_at timestamptz DEFAULT now() NOT NULL,
	author text NULL,
	author_image_url text NULL,
	tag text NULL,
	detail text NULL,
	CONSTRAINT blog_posts_pkey PRIMARY KEY (id),
	CONSTRAINT blog_posts_slug_key UNIQUE (slug)
);
CREATE INDEX idx_blog_posts_published ON public.blog_posts USING btree (is_published, published_at DESC);


-- public.categories definition

-- Drop table

-- DROP TABLE public.categories;

CREATE TABLE public.categories (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	slug text NOT NULL,
	"name" text NOT NULL,
	description text NULL,
	is_active bool DEFAULT true NOT NULL,
	sort_order int4 DEFAULT 0 NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	updated_at timestamptz DEFAULT now() NOT NULL,
	CONSTRAINT categories_pkey PRIMARY KEY (id),
	CONSTRAINT categories_slug_key UNIQUE (slug)
);
CREATE INDEX idx_categories_active_sort ON public.categories USING btree (is_active, sort_order, name);


-- public.contacts definition

-- Drop table

-- DROP TABLE public.contacts;

CREATE TABLE public.contacts (
	id serial4 NOT NULL,
	"name" varchar(100) NOT NULL,
	email varchar(100) NOT NULL,
	message text NOT NULL,
	ip_address inet NULL,
	is_bot bool DEFAULT false NULL,
	user_agent text NULL,
	created_at timestamp DEFAULT now() NULL,
	CONSTRAINT contacts_pkey PRIMARY KEY (id)
);


-- public.faqs definition

-- Drop table

-- DROP TABLE public.faqs;

CREATE TABLE public.faqs (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	section_key text DEFAULT 'home'::text NOT NULL,
	question text NOT NULL,
	answer text NOT NULL,
	is_visible bool DEFAULT true NOT NULL,
	sort_order int4 DEFAULT 0 NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	CONSTRAINT faqs_pkey PRIMARY KEY (id)
);
CREATE INDEX faqs_section_key_idx ON public.faqs USING btree (section_key);
CREATE INDEX faqs_visible_sort_idx ON public.faqs USING btree (is_visible, sort_order);


-- public.roles definition

-- Drop table

-- DROP TABLE public.roles;

CREATE TABLE public.roles (
	id serial4 NOT NULL,
	"name" varchar(50) NOT NULL,
	description varchar(255) NULL,
	permissions json NOT NULL,
	created_at timestamp NOT NULL,
	updated_at timestamp NOT NULL,
	CONSTRAINT roles_pkey PRIMARY KEY (id)
);
CREATE INDEX ix_roles_id ON public.roles USING btree (id);
CREATE UNIQUE INDEX ix_roles_name ON public.roles USING btree (name);


-- public.site_sections definition

-- Drop table

-- DROP TABLE public.site_sections;

CREATE TABLE public.site_sections (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	"key" text NOT NULL,
	title text NULL,
	is_visible bool DEFAULT true NOT NULL,
	sort_order int4 DEFAULT 0 NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	updated_at timestamptz DEFAULT now() NOT NULL,
	subtitle text NULL,
	description text NULL,
	image_url text NULL,
	primary_cta_label text NULL,
	primary_cta_href text NULL,
	secondary_cta_label text NULL,
	secondary_cta_href text NULL,
	profile_image_url text NULL,
	CONSTRAINT site_sections_key_key UNIQUE (key),
	CONSTRAINT site_sections_pkey PRIMARY KEY (id)
);
CREATE INDEX site_sections_visible_sort_idx ON public.site_sections USING btree (is_visible, sort_order);


-- public.testimonials definition

-- Drop table

-- DROP TABLE public.testimonials;

CREATE TABLE public.testimonials (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	author_name text NOT NULL,
	author_title text NULL,
	author_image_url text NULL,
	"content" text NOT NULL,
	rating int4 NULL,
	is_visible bool DEFAULT true NOT NULL,
	sort_order int4 DEFAULT 0 NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	updated_at timestamptz DEFAULT now() NOT NULL,
	CONSTRAINT testimonials_pkey PRIMARY KEY (id)
);
CREATE INDEX idx_testimonials_visible_sort ON public.testimonials USING btree (is_visible, sort_order);


-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	id serial4 NOT NULL,
	email varchar(255) NOT NULL,
	hashed_password varchar(255) NOT NULL,
	full_name varchar(255) NULL,
	is_active bool NOT NULL,
	is_superuser bool NOT NULL,
	is_verified bool NOT NULL,
	created_at timestamp NOT NULL,
	updated_at timestamp NOT NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id)
);
CREATE UNIQUE INDEX ix_users_email ON public.users USING btree (email);
CREATE INDEX ix_users_id ON public.users USING btree (id);


-- public.flows definition

-- Drop table

-- DROP TABLE public.flows;

CREATE TABLE public.flows (
	id serial4 NOT NULL,
	"name" varchar(255) NOT NULL,
	description text NULL,
	flow_type varchar(100) NOT NULL,
	config json NOT NULL,
	input_schema json NOT NULL,
	output_schema json NOT NULL,
	is_active bool NOT NULL,
	created_by int4 NULL,
	created_at timestamp NOT NULL,
	updated_at timestamp NOT NULL,
	CONSTRAINT flows_pkey PRIMARY KEY (id),
	CONSTRAINT flows_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id)
);
CREATE INDEX ix_flows_id ON public.flows USING btree (id);
CREATE UNIQUE INDEX ix_flows_name ON public.flows USING btree (name);


-- public.properties definition

-- Drop table

-- DROP TABLE public.properties;

CREATE TABLE public.properties (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	slug text NOT NULL,
	title text NOT NULL,
	description text NULL,
	category_id uuid NOT NULL,
	price numeric(14, 2) NULL,
	currency text DEFAULT 'USD'::text NULL,
	address text NULL,
	city text NULL,
	state text NULL,
	country text NULL,
	bedrooms int4 NULL,
	bathrooms int4 NULL,
	area_m2 numeric(12, 2) NULL,
	is_active bool DEFAULT true NOT NULL,
	is_featured bool DEFAULT false NOT NULL,
	sort_order int4 DEFAULT 0 NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	updated_at timestamptz DEFAULT now() NOT NULL,
	status text DEFAULT 'available'::text NOT NULL,
	seller_message text NULL,
	cta_label text DEFAULT 'Get in touch'::text NOT NULL,
	testimonial_id uuid NULL,
	CONSTRAINT properties_pkey PRIMARY KEY (id),
	CONSTRAINT properties_slug_key UNIQUE (slug),
	CONSTRAINT properties_status_check CHECK ((status = ANY (ARRAY['available'::text, 'reserved'::text, 'sold'::text]))),
	CONSTRAINT properties_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id),
	CONSTRAINT properties_testimonial_id_fkey FOREIGN KEY (testimonial_id) REFERENCES public.testimonials(id) ON DELETE SET NULL
);
CREATE INDEX idx_properties_category_active ON public.properties USING btree (category_id, is_active);
CREATE INDEX idx_properties_featured_active ON public.properties USING btree (is_featured, is_active);


-- public.property_highlights definition

-- Drop table

-- DROP TABLE public.property_highlights;

CREATE TABLE public.property_highlights (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	property_id uuid NOT NULL,
	title text NOT NULL,
	description text NULL,
	icon_image_url text NULL,
	icon_image_url_dark text NULL,
	sort_order int4 DEFAULT 0 NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	CONSTRAINT property_highlights_pkey PRIMARY KEY (id),
	CONSTRAINT property_highlights_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(id) ON DELETE CASCADE
);
CREATE INDEX property_highlights_property_id_idx ON public.property_highlights USING btree (property_id);


-- public.property_images definition

-- Drop table

-- DROP TABLE public.property_images;

CREATE TABLE public.property_images (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	property_id uuid NOT NULL,
	image_url text NOT NULL,
	alt_text text NULL,
	sort_order int4 DEFAULT 0 NOT NULL,
	is_cover bool DEFAULT false NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	CONSTRAINT property_images_pkey PRIMARY KEY (id),
	CONSTRAINT property_images_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(id) ON DELETE CASCADE
);
CREATE INDEX idx_property_images_property_sort ON public.property_images USING btree (property_id, sort_order);
CREATE UNIQUE INDEX uq_property_one_cover ON public.property_images USING btree (property_id) WHERE (is_cover = true);


-- public.property_offers definition

-- Drop table

-- DROP TABLE public.property_offers;

CREATE TABLE public.property_offers (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	property_id uuid NOT NULL,
	"label" text NOT NULL,
	icon text NULL,
	sort_order int4 DEFAULT 0 NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	CONSTRAINT property_offers_pkey PRIMARY KEY (id),
	CONSTRAINT property_offers_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(id) ON DELETE CASCADE
);
CREATE INDEX property_offers_property_id_idx ON public.property_offers USING btree (property_id);


-- public.user_roles definition

-- Drop table

-- DROP TABLE public.user_roles;

CREATE TABLE public.user_roles (
	user_id int4 NOT NULL,
	role_id int4 NOT NULL,
	CONSTRAINT user_roles_pkey PRIMARY KEY (user_id, role_id),
	CONSTRAINT user_roles_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE CASCADE,
	CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE
);


-- public.flow_executions definition

-- Drop table

-- DROP TABLE public.flow_executions;

CREATE TABLE public.flow_executions (
	id serial4 NOT NULL,
	flow_id int4 NOT NULL,
	user_id int4 NOT NULL,
	input_data json NOT NULL,
	output_data json NULL,
	status varchar(50) NOT NULL,
	error_message text NULL,
	execution_time_ms int4 NULL,
	started_at timestamp NOT NULL,
	completed_at timestamp NULL,
	CONSTRAINT flow_executions_pkey PRIMARY KEY (id),
	CONSTRAINT flow_executions_flow_id_fkey FOREIGN KEY (flow_id) REFERENCES public.flows(id),
	CONSTRAINT flow_executions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE INDEX ix_flow_executions_id ON public.flow_executions USING btree (id);


-- public."content" definition

-- Drop table

-- DROP TABLE public."content";

CREATE TABLE public."content" (
	id serial4 NOT NULL,
	execution_id int4 NOT NULL,
	user_id int4 NOT NULL,
	content_type varchar(100) NOT NULL,
	title varchar(500) NULL,
	"data" json NOT NULL,
	text_content text NULL,
	extra_metadata json NOT NULL,
	created_at timestamp NOT NULL,
	updated_at timestamp NOT NULL,
	publish_status varchar(50) DEFAULT 'draft'::character varying NOT NULL,
	scheduled_at timestamp NULL,
	published_at timestamp NULL,
	auto_publish_enabled bool DEFAULT false NOT NULL,
	last_publish_error varchar(500) NULL,
	CONSTRAINT content_pkey PRIMARY KEY (id),
	CONSTRAINT content_execution_id_fkey FOREIGN KEY (execution_id) REFERENCES public.flow_executions(id),
	CONSTRAINT content_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE INDEX ix_content_id ON public.content USING btree (id);









-- DROP FUNCTION public.armor(bytea);

CREATE OR REPLACE FUNCTION public.armor(bytea)
 RETURNS text
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pgcrypto', $function$pg_armor$function$
;

-- DROP FUNCTION public.armor(bytea, _text, _text);

CREATE OR REPLACE FUNCTION public.armor(bytea, text[], text[])
 RETURNS text
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pgcrypto', $function$pg_armor$function$
;

-- DROP FUNCTION public.crypt(text, text);

CREATE OR REPLACE FUNCTION public.crypt(text, text)
 RETURNS text
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pgcrypto', $function$pg_crypt$function$
;

-- DROP FUNCTION public.dearmor(text);

CREATE OR REPLACE FUNCTION public.dearmor(text)
 RETURNS bytea
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pgcrypto', $function$pg_dearmor$function$
;

-- DROP FUNCTION public.decrypt(bytea, bytea, text);

CREATE OR REPLACE FUNCTION public.decrypt(bytea, bytea, text)
 RETURNS bytea
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pgcrypto', $function$pg_decrypt$function$
;

-- DROP FUNCTION public.decrypt_iv(bytea, bytea, bytea, text);

CREATE OR REPLACE FUNCTION public.decrypt_iv(bytea, bytea, bytea, text)
 RETURNS bytea
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pgcrypto', $function$pg_decrypt_iv$function$
;

-- DROP FUNCTION public.digest(bytea, text);

CREATE OR REPLACE FUNCTION public.digest(bytea, text)
 RETURNS bytea
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pgcrypto', $function$pg_digest$function$
;

-- DROP FUNCTION public.digest(text, text);

CREATE OR REPLACE FUNCTION public.digest(text, text)
 RETURNS bytea
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pgcrypto', $function$pg_digest$function$
;

-- DROP FUNCTION public.encrypt(bytea, bytea, text);

CREATE OR REPLACE FUNCTION public.encrypt(bytea, bytea, text)
 RETURNS bytea
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pgcrypto', $function$pg_encrypt$function$
;

-- DROP FUNCTION public.encrypt_iv(bytea, bytea, bytea, text);

CREATE OR REPLACE FUNCTION public.encrypt_iv(bytea, bytea, bytea, text)
 RETURNS bytea
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pgcrypto', $function$pg_encrypt_iv$function$
;

-- DROP FUNCTION public.gen_random_bytes(int4);

CREATE OR REPLACE FUNCTION public.gen_random_bytes(integer)
 RETURNS bytea
 LANGUAGE c
 PARALLEL SAFE STRICT
AS '$libdir/pgcrypto', $function$pg_random_bytes$function$
;

-- DROP FUNCTION public.gen_random_uuid();

CREATE OR REPLACE FUNCTION public.gen_random_uuid()
 RETURNS uuid
 LANGUAGE c
 PARALLEL SAFE
AS '$libdir/pgcrypto', $function$pg_random_uuid$function$
;

-- DROP FUNCTION public.gen_salt(text, int4);

CREATE OR REPLACE FUNCTION public.gen_salt(text, integer)
 RETURNS text
 LANGUAGE c
 PARALLEL SAFE STRICT
AS '$libdir/pgcrypto', $function$pg_gen_salt_rounds$function$
;

-- DROP FUNCTION public.gen_salt(text);

CREATE OR REPLACE FUNCTION public.gen_salt(text)
 RETURNS text
 LANGUAGE c
 PARALLEL SAFE STRICT
AS '$libdir/pgcrypto', $function$pg_gen_salt$function$
;

-- DROP FUNCTION public.hmac(text, text, text);

CREATE OR REPLACE FUNCTION public.hmac(text, text, text)
 RETURNS bytea
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pgcrypto', $function$pg_hmac$function$
;

-- DROP FUNCTION public.hmac(bytea, bytea, text);

CREATE OR REPLACE FUNCTION public.hmac(bytea, bytea, text)
 RETURNS bytea
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pgcrypto', $function$pg_hmac$function$
;

-- DROP FUNCTION public.pgp_armor_headers(in text, out text, out text);

CREATE OR REPLACE FUNCTION public.pgp_armor_headers(text, OUT key text, OUT value text)
 RETURNS SETOF record
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pgcrypto', $function$pgp_armor_headers$function$
;

-- DROP FUNCTION public.pgp_key_id(bytea);

CREATE OR REPLACE FUNCTION public.pgp_key_id(bytea)
 RETURNS text
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pgcrypto', $function$pgp_key_id_w$function$
;

-- DROP FUNCTION public.pgp_pub_decrypt(bytea, bytea, text);

CREATE OR REPLACE FUNCTION public.pgp_pub_decrypt(bytea, bytea, text)
 RETURNS text
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pgcrypto', $function$pgp_pub_decrypt_text$function$
;

-- DROP FUNCTION public.pgp_pub_decrypt(bytea, bytea);

CREATE OR REPLACE FUNCTION public.pgp_pub_decrypt(bytea, bytea)
 RETURNS text
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pgcrypto', $function$pgp_pub_decrypt_text$function$
;

-- DROP FUNCTION public.pgp_pub_decrypt(bytea, bytea, text, text);

CREATE OR REPLACE FUNCTION public.pgp_pub_decrypt(bytea, bytea, text, text)
 RETURNS text
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pgcrypto', $function$pgp_pub_decrypt_text$function$
;

-- DROP FUNCTION public.pgp_pub_decrypt_bytea(bytea, bytea, text);

CREATE OR REPLACE FUNCTION public.pgp_pub_decrypt_bytea(bytea, bytea, text)
 RETURNS bytea
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pgcrypto', $function$pgp_pub_decrypt_bytea$function$
;

-- DROP FUNCTION public.pgp_pub_decrypt_bytea(bytea, bytea, text, text);

CREATE OR REPLACE FUNCTION public.pgp_pub_decrypt_bytea(bytea, bytea, text, text)
 RETURNS bytea
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pgcrypto', $function$pgp_pub_decrypt_bytea$function$
;

-- DROP FUNCTION public.pgp_pub_decrypt_bytea(bytea, bytea);

CREATE OR REPLACE FUNCTION public.pgp_pub_decrypt_bytea(bytea, bytea)
 RETURNS bytea
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pgcrypto', $function$pgp_pub_decrypt_bytea$function$
;

-- DROP FUNCTION public.pgp_pub_encrypt(text, bytea);

CREATE OR REPLACE FUNCTION public.pgp_pub_encrypt(text, bytea)
 RETURNS bytea
 LANGUAGE c
 PARALLEL SAFE STRICT
AS '$libdir/pgcrypto', $function$pgp_pub_encrypt_text$function$
;

-- DROP FUNCTION public.pgp_pub_encrypt(text, bytea, text);

CREATE OR REPLACE FUNCTION public.pgp_pub_encrypt(text, bytea, text)
 RETURNS bytea
 LANGUAGE c
 PARALLEL SAFE STRICT
AS '$libdir/pgcrypto', $function$pgp_pub_encrypt_text$function$
;

-- DROP FUNCTION public.pgp_pub_encrypt_bytea(bytea, bytea, text);

CREATE OR REPLACE FUNCTION public.pgp_pub_encrypt_bytea(bytea, bytea, text)
 RETURNS bytea
 LANGUAGE c
 PARALLEL SAFE STRICT
AS '$libdir/pgcrypto', $function$pgp_pub_encrypt_bytea$function$
;

-- DROP FUNCTION public.pgp_pub_encrypt_bytea(bytea, bytea);

CREATE OR REPLACE FUNCTION public.pgp_pub_encrypt_bytea(bytea, bytea)
 RETURNS bytea
 LANGUAGE c
 PARALLEL SAFE STRICT
AS '$libdir/pgcrypto', $function$pgp_pub_encrypt_bytea$function$
;

-- DROP FUNCTION public.pgp_sym_decrypt(bytea, text);

CREATE OR REPLACE FUNCTION public.pgp_sym_decrypt(bytea, text)
 RETURNS text
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pgcrypto', $function$pgp_sym_decrypt_text$function$
;

-- DROP FUNCTION public.pgp_sym_decrypt(bytea, text, text);

CREATE OR REPLACE FUNCTION public.pgp_sym_decrypt(bytea, text, text)
 RETURNS text
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pgcrypto', $function$pgp_sym_decrypt_text$function$
;

-- DROP FUNCTION public.pgp_sym_decrypt_bytea(bytea, text, text);

CREATE OR REPLACE FUNCTION public.pgp_sym_decrypt_bytea(bytea, text, text)
 RETURNS bytea
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pgcrypto', $function$pgp_sym_decrypt_bytea$function$
;

-- DROP FUNCTION public.pgp_sym_decrypt_bytea(bytea, text);

CREATE OR REPLACE FUNCTION public.pgp_sym_decrypt_bytea(bytea, text)
 RETURNS bytea
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pgcrypto', $function$pgp_sym_decrypt_bytea$function$
;

-- DROP FUNCTION public.pgp_sym_encrypt(text, text, text);

CREATE OR REPLACE FUNCTION public.pgp_sym_encrypt(text, text, text)
 RETURNS bytea
 LANGUAGE c
 PARALLEL SAFE STRICT
AS '$libdir/pgcrypto', $function$pgp_sym_encrypt_text$function$
;

-- DROP FUNCTION public.pgp_sym_encrypt(text, text);

CREATE OR REPLACE FUNCTION public.pgp_sym_encrypt(text, text)
 RETURNS bytea
 LANGUAGE c
 PARALLEL SAFE STRICT
AS '$libdir/pgcrypto', $function$pgp_sym_encrypt_text$function$
;

-- DROP FUNCTION public.pgp_sym_encrypt_bytea(bytea, text, text);

CREATE OR REPLACE FUNCTION public.pgp_sym_encrypt_bytea(bytea, text, text)
 RETURNS bytea
 LANGUAGE c
 PARALLEL SAFE STRICT
AS '$libdir/pgcrypto', $function$pgp_sym_encrypt_bytea$function$
;

-- DROP FUNCTION public.pgp_sym_encrypt_bytea(bytea, text);

CREATE OR REPLACE FUNCTION public.pgp_sym_encrypt_bytea(bytea, text)
 RETURNS bytea
 LANGUAGE c
 PARALLEL SAFE STRICT
AS '$libdir/pgcrypto', $function$pgp_sym_encrypt_bytea$function$
;