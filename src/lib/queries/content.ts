import { sql } from "@/lib/db";

export type DbTestimonial = {
  review: string;
  name: string;
  position: string;
  image: string;
};

export type DbPropertyHome = {
  name: string;
  slug: string;
  location: string;
  rate: string;
  beds: number;
  baths: number;
  area: number;
  images: { src: string }[];
};

export type DbPropertyHighlight = {
  title: string;
  description: string;
  iconImageUrl: string;
  iconImageUrlDark: string;
};

export type DbPropertyOffer = {
  label: string;
  icon: string;
};

export type DbFaq = {
  question: string;
  answer: string;
};

export type DbSiteSection = {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  profileImageUrl: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  isVisible: boolean;
};

export type DbBlogListItem = {
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  slug: string;
  detail: string;
  tag: string;
};

export type DbBlogPost = DbBlogListItem & {
  author: string;
  authorImage: string;
  content: string;
};

function formatPrice(value: number | null, currency: string | null) {
  if (value === null || Number.isNaN(value)) return "";
  const cur = currency || "USD";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cur,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);
  }
}

function formatRateForCard(value: number | null) {
  if (value === null || Number.isNaN(value)) return "";
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);
}

export async function getTestimonials(limit?: number): Promise<DbTestimonial[]> {
  const { rows } = await sql<{
    author_name: string;
    author_title: string | null;
    author_image_url: string | null;
    content: string;
  }>(
    `
    select author_name, author_title, author_image_url, content
    from testimonials
    where is_visible = true
    order by sort_order asc, created_at asc
    ${typeof limit === "number" ? "limit $1" : ""}
    `,
    typeof limit === "number" ? [limit] : []
  );

  return rows.map((r) => ({
    review: r.content,
    name: r.author_name,
    position: r.author_title || "",
    image: r.author_image_url || "",
  }));
}

export async function getFaqs(sectionKey: string = "home"): Promise<DbFaq[]> {
  const { rows } = await sql<{
    question: string;
    answer: string;
  }>(
    `
    select question, answer
    from faqs
    where is_visible = true
      and section_key = $1
    order by sort_order asc, created_at asc
    `,
    [sectionKey]
  );

  return rows.map((r) => ({
    question: r.question,
    answer: r.answer,
  }));
}

export async function getSiteSectionByKey(sectionKey: string): Promise<DbSiteSection | null> {
  const { rows } = await sql<{
    title: string | null;
    subtitle: string | null;
    description: string | null;
    image_url: string | null;
    profile_image_url: string | null;
    primary_cta_label: string | null;
    primary_cta_href: string | null;
    secondary_cta_label: string | null;
    secondary_cta_href: string | null;
    is_visible: boolean;
  }>(
    `
    select title, subtitle, description, image_url, profile_image_url,
           primary_cta_label, primary_cta_href,
           secondary_cta_label, secondary_cta_href,
           is_visible
    from site_sections
    where key = $1
    limit 1
    `,
    [sectionKey]
  );

  const r = rows[0];
  if (!r) return null;

  return {
    title: r.title || "",
    subtitle: r.subtitle || "",
    description: r.description || "",
    imageUrl: r.image_url || "",
    profileImageUrl: r.profile_image_url || "",
    primaryCtaLabel: r.primary_cta_label || "",
    primaryCtaHref: r.primary_cta_href || "",
    secondaryCtaLabel: r.secondary_cta_label || "",
    secondaryCtaHref: r.secondary_cta_href || "",
    isVisible: r.is_visible,
  };
}

async function getPropertyImages(propertyId: string, limit?: number) {
  const { rows } = await sql<{ image_url: string }>(
    `
    select image_url
    from property_images
    where property_id = $1
    order by is_cover desc, sort_order asc, created_at asc
    ${typeof limit === "number" ? "limit $2" : ""}
    `,
    typeof limit === "number" ? [propertyId, limit] : [propertyId]
  );

  return rows.map((r) => ({ src: r.image_url }));
}

function mapPropertyRowToHome(row: {
  id: string;
  slug: string;
  title: string;
  address: string | null;
  price: string | number | null;
  currency: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  area_m2: string | number | null;
}): Omit<DbPropertyHome, "images"> {
  const priceNum = row.price === null ? null : Number(row.price);
  const areaNum = row.area_m2 === null ? null : Number(row.area_m2);

  return {
    name: row.title,
    slug: row.slug,
    location: row.address || "",
    rate: formatRateForCard(priceNum),
    beds: row.bedrooms || 0,
    baths: row.bathrooms || 0,
    area: areaNum ? Math.round(areaNum) : 0,
  };
}

export async function getFeaturedProperties(limit?: number): Promise<DbPropertyHome[]> {
  const { rows } = await sql<{
    id: string;
    slug: string;
    title: string;
    address: string | null;
    price: string | number | null;
    currency: string | null;
    bedrooms: number | null;
    bathrooms: number | null;
    area_m2: string | number | null;
  }>(
    `
    select p.id, p.slug, p.title, p.address, p.price, p.currency, p.bedrooms, p.bathrooms, p.area_m2
    from properties p
    where p.is_active = true
      and p.is_featured = true
    order by p.sort_order asc, p.created_at desc
    ${typeof limit === "number" ? "limit $1" : ""}
    `,
    typeof limit === "number" ? [limit] : []
  );

  const withImages = await Promise.all(
    rows.map(async (r) => ({
      ...mapPropertyRowToHome(r),
      images: await getPropertyImages(r.id, 4),
    }))
  );

  return withImages;
}

export async function getPropertiesByCategorySlug(
  categorySlug: string,
  limit?: number
): Promise<DbPropertyHome[]> {
  const params: any[] = [categorySlug];
  if (typeof limit === "number") params.push(limit);

  const { rows } = await sql<{
    id: string;
    slug: string;
    title: string;
    address: string | null;
    price: string | number | null;
    currency: string | null;
    bedrooms: number | null;
    bathrooms: number | null;
    area_m2: string | number | null;
  }>(
    `
    select p.id, p.slug, p.title, p.address, p.price, p.currency, p.bedrooms, p.bathrooms, p.area_m2
    from properties p
    join categories c on c.id = p.category_id
    where p.is_active = true
      and c.is_active = true
      and c.slug = $1
    order by p.sort_order asc, p.created_at desc
    ${typeof limit === "number" ? "limit $2" : ""}
    `,
    params
  );

  const withImages = await Promise.all(
    rows.map(async (r) => ({
      ...mapPropertyRowToHome(r),
      images: await getPropertyImages(r.id, 4),
    }))
  );

  return withImages;
}

export async function getPropertyDetailBySlug(slug: string) {
  const { rows } = await sql<{
    id: string;
    slug: string;
    title: string;
    description: string | null;
    address: string | null;
    price: string | number | null;
    currency: string | null;
    bedrooms: number | null;
    bathrooms: number | null;
    area_m2: string | number | null;
    status: string | null;
    seller_message: string | null;
    cta_label: string | null;
    testimonial_content: string | null;
    testimonial_author_name: string | null;
    testimonial_author_title: string | null;
    testimonial_author_image_url: string | null;
  }>(
    `
    select p.id, p.slug, p.title, p.description, p.address, p.price, p.currency, p.bedrooms, p.bathrooms, p.area_m2,
           p.status, p.seller_message, p.cta_label,
           t.content as testimonial_content,
           t.author_name as testimonial_author_name,
           t.author_title as testimonial_author_title,
           t.author_image_url as testimonial_author_image_url
    from properties p
    left join testimonials t on t.id = p.testimonial_id and t.is_visible = true
    where p.slug = $1
      and p.is_active = true
    limit 1
    `,
    [slug]
  );

  const row = rows[0];
  if (!row) return null;

  const priceNum = row.price === null ? null : Number(row.price);
  const areaNum = row.area_m2 === null ? null : Number(row.area_m2);

  const highlightsRes = await sql<{
    title: string;
    description: string | null;
    icon_image_url: string | null;
    icon_image_url_dark: string | null;
  }>(
    `
    select title, description, icon_image_url, icon_image_url_dark
    from property_highlights
    where property_id = $1
    order by sort_order asc, created_at asc
    `,
    [row.id]
  );

  const offersRes = await sql<{
    label: string;
    icon: string | null;
  }>(
    `
    select label, icon
    from property_offers
    where property_id = $1
    order by sort_order asc, created_at asc
    `,
    [row.id]
  );

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    address: row.address || "",
    rate: formatRateForCard(priceNum),
    priceLabel: formatPrice(priceNum, row.currency),
    bedrooms: row.bedrooms || 0,
    bathrooms: row.bathrooms || 0,
    area: areaNum ? Math.round(areaNum) : 0,
    images: await getPropertyImages(row.id),
    status: row.status || "available",
    sellerMessage: row.seller_message || "",
    ctaLabel: row.cta_label || "Get in touch",
    testimonial:
      row.testimonial_content && row.testimonial_author_name
        ? {
            review: row.testimonial_content,
            name: row.testimonial_author_name,
            position: row.testimonial_author_title || "",
            image: row.testimonial_author_image_url || "",
          }
        : null,
    highlights: highlightsRes.rows.map((h) => ({
      title: h.title,
      description: h.description || "",
      iconImageUrl: h.icon_image_url || "",
      iconImageUrlDark: h.icon_image_url_dark || "",
    })),
    offers: offersRes.rows.map((o) => ({
      label: o.label,
      icon: o.icon || "",
    })),
  };
}

export async function getBlogPosts(limit?: number): Promise<DbBlogListItem[]> {
  const { rows } = await sql<{
    slug: string;
    title: string;
    excerpt: string | null;
    cover_image_url: string | null;
    tag: string | null;
    detail: string | null;
    published_at: string | null;
    created_at: string;
  }>(
    `
    select slug, title, excerpt, cover_image_url, tag, detail,
           coalesce(published_at::text, created_at::text) as published_at,
           created_at::text as created_at
    from blog_posts
    where is_published = true
    order by published_at desc nulls last, created_at desc
    ${typeof limit === "number" ? "limit $1" : ""}
    `,
    typeof limit === "number" ? [limit] : []
  );

  return rows.map((r) => ({
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt || "",
    coverImage: r.cover_image_url || "",
    tag: r.tag || "",
    detail: r.detail || "",
    date: r.published_at || r.created_at,
  }));
}

export async function getBlogPostBySlug(slug: string): Promise<DbBlogPost | null> {
  const { rows } = await sql<{
    slug: string;
    title: string;
    excerpt: string | null;
    cover_image_url: string | null;
    tag: string | null;
    detail: string | null;
    content_markdown: string;
    author: string | null;
    author_image_url: string | null;
    published_at: string | null;
    created_at: string;
  }>(
    `
    select slug, title, excerpt, cover_image_url, tag, detail, content_markdown,
           author, author_image_url,
           coalesce(published_at::text, created_at::text) as published_at,
           created_at::text as created_at
    from blog_posts
    where slug = $1
      and is_published = true
    limit 1
    `,
    [slug]
  );

  const r = rows[0];
  if (!r) return null;

  return {
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt || "",
    coverImage: r.cover_image_url || "",
    tag: r.tag || "",
    detail: r.detail || "",
    content: r.content_markdown,
    author: r.author || "",
    authorImage: r.author_image_url || "",
    date: r.published_at || r.created_at,
  };
}
