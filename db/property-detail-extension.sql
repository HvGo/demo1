-- Run this in Neon SQL editor

create extension if not exists pgcrypto;

alter table properties
  add column if not exists status text not null default 'available',
  add column if not exists seller_message text,
  add column if not exists cta_label text not null default 'Get in touch',
  add column if not exists testimonial_id uuid;

alter table properties
  drop constraint if exists properties_status_check;

alter table properties
  add constraint properties_status_check check (status in ('available','reserved','sold'));

alter table properties
  drop constraint if exists properties_testimonial_id_fkey;

alter table properties
  add constraint properties_testimonial_id_fkey
  foreign key (testimonial_id) references testimonials(id) on delete set null;

create table if not exists property_highlights (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  title text not null,
  description text,
  icon_image_url text,
  icon_image_url_dark text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists property_highlights_property_id_idx on property_highlights(property_id);

create table if not exists property_offers (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  label text not null,
  icon text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists property_offers_property_id_idx on property_offers(property_id);
