# Recommendations / Pending Enhancements

This file collects recommendations discussed during development that are **not yet implemented** (or are optional follow-ups). It helps keep track of next improvements without mixing them into the main implementation.

## Header / Navigation

### Make header icon/text contrast fully consistent

- **Problem**
  - On image-based heroes (Home), even with a glass navbar, some elements can lose contrast depending on the photo.

- **Recommendation**
  - Ensure `phone` link and theme icons have a consistent readable color in `Home + not sticky` state.
  - Optionally add a subtle `drop-shadow` to the header content.

- **Implementation idea**
  - Add a dedicated computed state like `isHeroHeader = isHomepage && !sticky` and apply:
    - `text-white` (with slight opacity) for phone text and icons
    - or force a stronger navbar background `bg-white/35` and `border-white/40`.

### Enforce one `cover` image per property

- **Problem**
  - `property_images` uses `is_cover` to determine the hero image; multiple cover images can create ambiguous ordering.

- **Recommendation**
  - Add a partial unique index (Postgres): only one row with `is_cover = true` per `property_id`.

- **Implementation idea**
  - `create unique index ... on property_images(property_id) where is_cover = true;`

## Home Hero (Bottom area)

### Consider structured items instead of a single description

- **Current**
  - The bottom area can be managed with `site_sections.description`.

- **Optional enhancement**
  - If you want icon/value pairs (like the previous stats) to be administrable:
    - Create `site_section_items` table.

- **Schema idea**
  - `site_section_items`:
    - `id uuid`
    - `section_key text` (FK or plain reference to `site_sections.key`)
    - `icon text` (Iconify string or image url)
    - `label text`
    - `value text`
    - `sort_order int`
    - `is_visible boolean`

## Property Detail

### Make the map embed administrable

- **Problem**
  - The Google Maps `<iframe>` is still hardcoded.

- **Recommendation**
  - Store a `map_embed_url` (or full embed HTML) per property.

- **Implementation idea**
  - Add `properties.map_embed_url text`.

### Rich text / multiple paragraphs for `properties.description`

- **Problem**
  - If you want multiple paragraphs, plain text needs formatting.

- **Recommendation**
  - Store markdown in DB and render with markdown renderer.

- **Implementation idea**
  - Add `properties.description_markdown` (or reuse `description` as markdown) and render with `react-markdown`.

## Content Management / Admin

### Admin UI and validation

- **Recommendation**
  - When adding an admin UI:
    - validate `status` values (`available | reserved | sold`)
    - validate hero section keys (like `home_hero`)
    - provide sorting UI for `property_highlights`, `property_offers`, `faqs`.

## Operations

### Add a local verification checklist

- **Recommendation**
  - A short checklist to prevent regressions:
    - `npm install`
    - `npm run build`
    - `npm run start`
    - verify Home Hero pulls from `site_sections`
    - verify FAQs pull from `faqs`
    - verify Property Detail pulls highlights/offers/testimonial/status
