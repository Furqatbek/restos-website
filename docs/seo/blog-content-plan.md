# RestOS — Blog Content Plan

Goal: turn the blog into a **content engine** that ranks for informational
queries restaurant owners search, then funnels them to the commercial landing
pages. One article = one target query.

**Cadence:** 1 article/week is plenty to start. Consistency beats volume.
**Language:** publish each piece in **Russian** first (largest audience), then
translate the winners to **Uzbek** (publish as a separate post with `lang: "uz"`).

**Every article must:**
- Target exactly one keyword (in the title, H1, first paragraph, one H2).
- Be genuinely useful — Google ranks the most helpful answer, not the longest.
- Link internally to the relevant **landing page** and 1–2 other posts.
- Include a soft CTA (book a demo / try free) near the end.
- Use the `body` Markdown field; add an image with `![alt](url)` where it helps.

---

## Quarter 1 — 12 articles

| # | Working title (RU) | Target keyword | Intent | Links to |
|---|---|---|---|---|
| 1 | Как вернуть гостя, который пришёл один раз | удержание гостей / программа лояльности | I→C | Лояльность LP |
| 2 | Что такое фудкост и какой считается нормой | фудкост это / норма фудкоста | I | Складской учёт LP |
| 3 | Как считать себестоимость блюда (с примером) | себестоимость блюда расчёт | I | Складской учёт LP |
| 4 | 7 способов снизить расходы ресторана без потери качества | как снизить расходы ресторана | I | Автоматизация LP |
| 5 | Какую кассу выбрать для кафе: чек-лист | какую кассу выбрать для кафе | I→C | POS LP |
| 6 | Как вести складской учёт в кафе и перестать списывать | складской учёт в кафе | I→C | Складской учёт LP |
| 7 | Как открыть кофейню в Ташкенте: пошаговый гайд | как открыть кофейню | I (pillar) | POS + Автоматизация LP |
| 8 | Почему бумажные тикеты убивают кухню в час пик (про KDS) | кухонный экран / KDS | I→C | KDS LP |
| 9 | Доставка через Yandex Eats, Wolt, Glovo: как не утонуть в планшетах | автоматизация доставки еды | I→C | Доставка LP |
| 10 | 5 отчётов, которые владелец ресторана должен смотреть каждую неделю | отчёты для ресторана | I | Автоматизация LP |
| 11 | Сколько стоит автоматизировать ресторан в Узбекистане | стоимость автоматизации ресторана | C | Автоматизация LP + /#pricing |
| 12 | Как запустить программу лояльности за неделю | программа лояльности для ресторана | I→C | Лояльность LP |

> Article #1 already exists (the "Как вернуть гостя" post) — good template to follow.

## Article template (structure that ranks)

```
H1: <contains the keyword, written for a human>
Intro (2–3 sentences): name the problem, promise the answer, use the keyword once.

## <Subheading with a related term>
Useful, specific content. Real numbers from RestOS data where possible
(−11% labour, −3pt food cost, 48h setup, 2.4× turns).

## <How-to / steps / example>
Concrete, do-this-now advice. A table or numbered list.

## <Where RestOS fits> (soft, not salesy)
One paragraph connecting the problem to the product, linking the landing page.

> A pull-quote or key stat.

Closing + CTA: link to the landing page / book a demo.
```

## Pillar + cluster strategy

Pick **"Как открыть кафе/ресторан в Узбекистане"** as a long **pillar** article.
Then each cluster post (фудкост, касса, склад, лояльность, доставка) links *up*
to the pillar, and the pillar links *down* to each. This topical cluster tells
Google you're an authority on restaurant operations — and every cluster post
also links to the matching commercial landing page.

## Publishing checklist (per post)

- [ ] Title + H1 contain the keyword, read naturally
- [ ] `excerpt` filled (it becomes the meta description + Telegram teaser)
- [ ] `category` matches a keyword theme (POS, Склад, Лояльность, Доставка…)
- [ ] `lang` set correctly (`ru` / `uz`), `status: "published"`
- [ ] 1 link to the relevant landing page + 1–2 to other posts
- [ ] Posts auto-appear in the sitemap and auto-post to Telegram

## Measuring what works (monthly)

In **Google Search Console → Performance**, sort by Impressions. For each post:
- Rising impressions but low clicks → improve the title/excerpt (the snippet).
- Ranking #5–15 for a keyword → expand the post, add internal links — small
  push often moves it onto page 1.
- Zero impressions after 6–8 weeks → the keyword was too competitive; pivot to
  a longer, more specific variant.
