// Transliterate Cyrillic (Russian + Uzbek) and clean any title into a
// URL-safe, keyword-rich slug. Used to give blog posts readable URLs
// like /blog/kak-snizit-fudkost instead of /blog/5.

const MAP = {
  // Russian + Uzbek Cyrillic
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'j', з: 'z',
  и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r',
  с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh',
  щ: 'sch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
  // Uzbek Cyrillic extras
  ў: 'o', ғ: 'g', қ: 'q', ҳ: 'h', ң: 'ng',
  // Uzbek Latin special letters
  'ʻ': '', 'ʼ': '', 'ʾ': '', 'ʿ': '', "'": '',
  'oʻ': 'o', 'gʻ': 'g',
};

export function slugify(input) {
  let s = String(input || '').toLowerCase().trim();

  // multi-char Uzbek latin first
  s = s.replace(/oʻ/g, 'o').replace(/gʻ/g, 'g');

  // transliterate char by char
  s = s.split('').map((ch) => (ch in MAP ? MAP[ch] : ch)).join('');

  // keep a-z, 0-9; everything else becomes a separator
  s = s
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');

  return s || 'post';
}

// Ensure uniqueness against an existence checker (exists(slug) => boolean).
export function uniqueSlug(base, exists) {
  let slug = base;
  let n = 2;
  while (exists(slug)) {
    slug = `${base}-${n}`;
    n += 1;
  }
  return slug;
}
