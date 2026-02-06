-- Run this in Neon SQL editor

create extension if not exists pgcrypto;

alter table site_sections
  add column if not exists subtitle text,
  add column if not exists description text,
  add column if not exists image_url text,
  add column if not exists profile_image_url text,
  add column if not exists primary_cta_label text,
  add column if not exists primary_cta_href text,
  add column if not exists secondary_cta_label text,
  add column if not exists secondary_cta_href text;
