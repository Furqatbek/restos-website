# RestOS — How to Write & Publish a Blog Post

Posts are created via the `POST /api/posts` endpoint. Publishing a post
(`status: "published"`) does three things automatically:

1. Publishes it on the site at a **keyword URL** — `/{lang}/blog/{slug}`
2. Posts a **card image + caption** to the Telegram channel
3. Adds it to the **sitemap** (within ~1h, cached) and shows a **related
   landing-page link** at the bottom

---

## Minimal post

Only `title` is required. Everything else has sensible defaults.

```bash
curl -X POST https://restos.uz/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Как снизить фудкост в ресторане",
    "excerpt": "Три привычки учёта, которые окупаются за месяц.",
    "body": "## Заголовок\n\nТекст статьи в **Markdown**...",
    "category": "Склад",
    "lang": "ru",
    "status": "published"
  }'
```

## Full post with SEO control

```bash
curl -X POST https://restos.uz/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Как снизить фудкост в ресторане",
    "excerpt": "Три привычки учёта, которые окупаются за месяц.",
    "body": "## Раздел\n\nТекст с ![повар](https://restos.uz/img/chef.jpg) картинкой.",
    "category": "Склад",
    "glyph": "Ф",
    "color": "b3",
    "read_time": 6,
    "lang": "ru",
    "featured": false,
    "status": "published",

    "slug": "kak-snizit-fudkost",
    "meta_title": "Как снизить фудкост — практичный гайд | RestOS",
    "meta_description": "Пошаговый гайд: как снизить фудкост в ресторане и кафе без потери качества.",
    "keywords": "фудкост, складской учёт, себестоимость"
  }'
```

## Fields

| Field | Required | Default | Notes |
|---|---|---|---|
| `title` | ✅ | — | The article headline (H1). |
| `body` | — | — | **Markdown**. Supports `## headings`, `**bold**`, `*italic*`, `` `code` ``, `[links](url)`, `> quotes`, `- lists`, `![alt](url)` images. |
| `excerpt` | — | — | Short summary. Shown on cards, in Telegram, and as the meta description fallback. |
| `category` | — | — | e.g. `Склад`, `POS`, `Маркетинг`. Also drives the related-landing-page match. |
| `lang` | — | `en` | `en` / `ru` / `uz` / `uz-cyr` / `kaa`. **Must match** the site language for the post to appear on `/{lang}/blog`. |
| `status` | — | `draft` | `published` publishes it + fires Telegram. |
| `featured` | — | `false` | Pins it to the big slot at the top of the blog. |
| `glyph` | — | `R` | The big letter on the card image. |
| `color` | — | `b1` | Card theme: `b1`–`b6` **only**. |
| `read_time` | — | `5` | Minutes. |

### SEO fields (all optional)

| Field | What it controls | Fallback if omitted |
|---|---|---|
| `slug` | The URL: `/{lang}/blog/{slug}` | Auto-generated from `title` (Cyrillic → latin, unique). |
| `meta_title` | The clickable title in Google results | `title` |
| `meta_description` | The grey snippet text in Google results | `excerpt` → first ~155 chars of `body` |
| `keywords` | Target keywords (comma-separated) | none |

> **Tip:** `meta_title` should include the keyword **and** the brand, ≤ ~60
> chars (e.g. `Как снизить фудкост — гайд | RestOS`). `meta_description`
> should sell the click in ≤ ~155 chars and include the keyword once.

## Editing a post

`PUT /api/posts/{id}` with any subset of fields. The **slug stays stable**
(good for SEO) unless you explicitly pass a new `slug`. Editing a published
post does **not** re-fire Telegram.

```bash
curl -X PUT https://restos.uz/api/posts/7 \
  -H "Content-Type: application/json" \
  -d '{ "meta_title": "Better title", "keywords": "фудкост, ресторан" }'
```

## Publishing an existing post to Telegram

Posts published before Telegram was configured won't have fired. Push one
manually:

```bash
curl -X POST https://restos.uz/api/posts/7/telegram
```

## SEO checklist per post

- [ ] `title` + `body` H2 contain the target keyword, written naturally
- [ ] `meta_title` set (keyword + brand), `meta_description` set (sells the click)
- [ ] `keywords` set to the one target keyword (+ close variants)
- [ ] `excerpt` filled (Telegram teaser + fallback description)
- [ ] `category` matches a theme so the right landing page auto-links
- [ ] `lang` correct; `status: "published"`
- [ ] 1 link in the body to the relevant landing page + 1–2 to other posts
- [ ] One target keyword per post — don't create two posts for the same term

See `docs/seo/keyword-research.md` for which keywords to target and
`docs/seo/blog-content-plan.md` for the article calendar.
