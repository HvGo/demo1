-- Run this in Neon SQL editor

create extension if not exists pgcrypto;

create table if not exists faqs (
  id uuid primary key default gen_random_uuid(),
  section_key text not null default 'home',
  question text not null,
  answer text not null,
  is_visible boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists faqs_section_key_idx on faqs(section_key);
create index if not exists faqs_visible_sort_idx on faqs(is_visible, sort_order);
