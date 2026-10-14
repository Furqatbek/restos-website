# RestOS — Keyword Research (Uzbekistan market)

> **How to read this.** Volumes below are *directional estimates* based on the
> market, not pulled live. Before committing, validate each keyword in:
> - **Yandex Wordstat** (`wordstat.yandex.ru`) — the most accurate tool for the
>   RU/UZ market. Most of your audience searches on **Yandex**, not just Google.
> - **Google Keyword Planner** (free with a Google Ads account).
> Set the region to **Uzbekistan / Tashkent** in both.

Intent legend: **C** = commercial (ready to buy), **I** = informational
(researching), **L** = local ("near me"/city), **B** = branded.
Difficulty: how hard to rank (Low/Med/High) given a newer domain.

---

## 1. Primary commercial keywords (Russian) — money pages

These are your highest-value terms. Each should have a **dedicated landing page**
(we've shipped the first three).

| Keyword | Intent | Difficulty | Target page | Status |
|---|---|---|---|---|
| POS система для кафе / ресторанов | C | Med | `/ru/pos-sistema-dlya-kafe-i-restoranov` | ✅ built |
| автоматизация ресторана | C | Med | `/ru/avtomatizatsiya-restorana` | ✅ built |
| программа складского учёта для ресторана | C | Med | `/ru/programma-skladskogo-ucheta-dlya-restorana` | ✅ built |
| программа для кафе | C | Med | new LP | ☐ |
| система учёта для ресторана | C | Med | new LP | ☐ |
| программа для общепита | C | Low | new LP | ☐ |
| автоматизация кафе | C | Low | section on кафе LP | ☐ |
| программа лояльности для ресторана | C | Low | new LP | ☐ |
| KDS / кухонный экран для ресторана | C | Low | new LP | ☐ |
| программа для доставки еды | C | Med | new LP | ☐ |

## 2. Primary commercial keywords (Uzbek) — money pages

The Uzbek-language market is less contested → **easier wins**. High priority.

| Keyword | Intent | Difficulty | Target page | Status |
|---|---|---|---|---|
| kafe va restoranlar uchun POS tizimi | C | Low | `/uz/kafe-va-restoranlar-uchun-pos-tizimi` | ✅ built |
| restoran avtomatizatsiyasi | C | Low | new LP | ☐ |
| restoran boshqaruv tizimi | C | Low | new LP | ☐ |
| kafe uchun dastur | C | Low | new LP | ☐ |
| ombor hisobi dasturi (restoran) | C | Low | new LP | ☐ |

## 3. Local keywords — for the map pack (need Google/Yandex Business)

You **cannot** rank for these without a **Google Business Profile** and a
**Yandex Business** listing. These trigger the map/local pack above organic.

| Keyword | Intent | Notes |
|---|---|---|
| POS система Ташкент | C+L | geo modifier; high buy intent |
| автоматизация ресторана Ташкент / Узбекистан | C+L | |
| POS tizimi Toshkent | C+L | Uzbek geo |
| кассовая программа Ташкент | C+L | |

**Action:** create the profiles, use the exact same Name / Address / Phone (NAP)
as the `LocalBusiness` schema we added, collect reviews.

## 4. Informational keywords — blog content (top of funnel)

Lower buy-intent but high volume and easier to rank. These pull restaurant
owners in; you convert them later. → drives the **content plan**.

| Keyword / question | Intent | Difficulty | Article |
|---|---|---|---|
| как открыть кафе / ресторан | I | High | pillar guide |
| как снизить фудкост | I | Med | how-to |
| как считать себестоимость блюда | I | Low | how-to + calculator |
| как уменьшить расходы ресторана | I | Med | listicle |
| как вести складской учёт в кафе | I | Low | how-to (→ LP) |
| программы лояльности для ресторанов примеры | I | Low | listicle (→ LP) |
| какую кассу выбрать для кафе | I | Med | comparison (→ POS LP) |
| фудкост это что / норма фудкоста | I | Low | definition |

## 5. Branded (defensive — you should always rank #1 here)

`RestOS`, `RestOS Узбекистан`, `RestOS отзывы`, `РестОС`. Make sure these
resolve to you; create the `RestOS отзывы` story via reviews.

---

## Prioritisation (do in this order)

1. **Uzbek commercial LPs** — least competition, fastest wins.
2. **Google + Yandex Business profiles** — unlocks all local keywords.
3. **Remaining Russian commercial LPs** (программа для кафе, лояльность, KDS).
4. **Informational blog cluster** — steady stream, internal-link to the LPs.
5. **Reviews + backlinks** — the long game that decides the top 3.

## Mapping rule

- **Commercial keyword → landing page** (`/[lang]/[slug]`), one keyword per page.
- **Informational keyword → blog post** (`/[lang]/blog/[id]`), linking to the
  related landing page.
- Never target the same keyword with two pages (they cannibalise each other).
