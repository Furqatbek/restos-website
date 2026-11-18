import { STATUSES } from '@/lib/leads';

// HTML for the owner's lead board. Lead names, venues and notes come from
// visitors, so every value is escaped here, and the page script only moves
// existing elements and sends updates — it never inserts visitor text as HTML.

const L = {
  uz: {
    title: 'Lidlar', add: "+ Lid qo'shish", addHint: "Instagram shakli, qo'ng'iroq yoki Telegram'dan kelgan mijoz",
    name: 'Ism', phone: 'Telefon', venue: 'Muassasa', via: 'Qayerdan', notes: 'Izoh', save: 'Saqlash', saved: 'Saqlandi',
    del: "O'chirish", confirmDel: "Bu lid butunlay o'chiriladi. Davom etasizmi?", call: "Qo'ng'iroq",
    deletes: "avtomatik o'chiriladi", from: 'Manba', empty: "Bo'sh", error: 'Xato, qayta urinib ko‘ring',
    col: { new: 'Yangi', no_answer: 'Javob bermadi', offer: 'Taklif kutmoqda', won: "Mijoz bo'ldi", lost: 'Rad etdi' },
    kind: { demo: 'Demo', foodcost: 'Fudkost', help: 'Yordam kartochkasi', manual: "Qo'lda" },
    viaOpts: { instagram: 'Instagram', facebook: 'Facebook', call: "Qo'ng'iroq", telegram: 'Telegram', other: 'Boshqa' },
    keep: "Mijoz bo'lganlarni o'z ro'yxatingizga ko'chiring: barcha lidlar kelgan kundan 12 oy o'tib o'chiriladi.",
    venues: (n) => `${n} ta filial`, nowOn: (s) => `hozir: ${s}`,
  },
  ru: {
    title: 'Лиды', add: '+ Добавить лид', addHint: 'Клиент из формы Instagram, звонка или Telegram',
    name: 'Имя', phone: 'Телефон', venue: 'Заведение', via: 'Откуда', notes: 'Заметка', save: 'Сохранить', saved: 'Сохранено',
    del: 'Удалить', confirmDel: 'Лид будет удалён навсегда. Продолжить?', call: 'Позвонить',
    deletes: 'удалится автоматически', from: 'Источник', empty: 'Пусто', error: 'Ошибка, попробуйте ещё раз',
    col: { new: 'Новые', no_answer: 'Не ответил', offer: 'Ждёт предложения', won: 'Стал клиентом', lost: 'Отказ' },
    kind: { demo: 'Демо', foodcost: 'Фудкост', help: 'Карточка помощи', manual: 'Вручную' },
    viaOpts: { instagram: 'Instagram', facebook: 'Facebook', call: 'Звонок', telegram: 'Telegram', other: 'Другое' },
    keep: 'Переносите клиентов в свой список: все лиды удаляются через 12 месяцев после поступления.',
    venues: (n) => `точек: ${n}`, nowOn: (s) => `сейчас: ${s}`,
  },
  en: {
    title: 'Leads', add: '+ Add lead', addHint: 'A client from an Instagram form, a call or Telegram',
    name: 'Name', phone: 'Phone', venue: 'Venue', via: 'Came from', notes: 'Note', save: 'Save', saved: 'Saved',
    del: 'Delete', confirmDel: 'This lead will be deleted for good. Continue?', call: 'Call',
    deletes: 'auto-deletes', from: 'Source', empty: 'Empty', error: 'Error, try again',
    col: { new: 'New', no_answer: 'No answer', offer: 'Waiting for offer', won: 'Won', lost: 'Lost' },
    kind: { demo: 'Demo', foodcost: 'Food-cost', help: 'Help card', manual: 'Manual' },
    viaOpts: { instagram: 'Instagram', facebook: 'Facebook', call: 'Phone call', telegram: 'Telegram', other: 'Other' },
    keep: 'Copy won clients to your own list: every lead is deleted 12 months after it arrived.',
    venues: (n) => `${n} venues`, nowOn: (s) => `now on ${s}`,
  },
};

const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
// SQLite stores UTC; show Tashkent time.
const day = (d) => {
  const dt = new Date(String(d || '').replace(' ', 'T') + 'Z');
  if (Number.isNaN(dt.getTime())) return '';
  return dt.toLocaleString('sv-SE', { timeZone: 'Asia/Tashkent' }).slice(0, 16);
};

function card(l, t) {
  const tel = String(l.phone).replace(/[^\d+]/g, '');
  const meta = [l.from && `${t.from}: ${l.from}`, l.cta && `cta: ${l.cta}`, l.landing].filter(Boolean).join(' · ');
  const details = [l.venuesCount && t.venues(l.venuesCount), l.currentSystem && t.nowOn(l.currentSystem), l.revenueBand].filter(Boolean);
  return `<article class="card" draggable="true" data-table="${esc(l.table)}" data-id="${esc(l.id)}">
  <div class="top"><span class="kind k-${esc(l.kind)}">${esc(t.kind[l.kind] || l.kind)}</span><time>${esc(day(l.createdAt))}</time></div>
  ${l.name || l.venue ? `<div class="who">${esc(l.name || l.venue)}</div>` : ''}
  ${l.name && l.venue ? `<div class="venue">${esc(l.venue)}</div>` : ''}
  <a class="phone${l.name || l.venue ? '' : ' big'}" href="tel:${esc(tel)}">${esc(l.phone)}</a>
  ${details.length ? `<div class="details">${esc(details.join(' · '))}</div>` : ''}
  ${meta ? `<div class="meta">${esc(meta)}</div>` : ''}
  <textarea class="notes" placeholder="${esc(t.notes)}" rows="2">${esc(l.notes)}</textarea>
  <div class="row">
    <select class="status" aria-label="status">${STATUSES.map((s) => `<option value="${s}"${s === l.status ? ' selected' : ''}>${esc(t.col[s])}</option>`).join('')}</select>
    <button class="del" type="button">${esc(t.del)}</button>
  </div>
  ${l.deletesOn ? `<div class="expiry">${esc(t.deletes)}: ${esc(l.deletesOn)}</div>` : ''}
</article>`;
}

export function renderBoard(leads, lang, langLink) {
  const t = L[lang] || L.uz;
  const cols = STATUSES.map((s) => {
    const items = leads.filter((l) => l.status === s);
    return `<section class="col" data-status="${s}">
  <h2>${esc(t.col[s])} <span class="count">${items.length}</span></h2>
  <div class="list">${items.map((l) => card(l, t)).join('') || ''}</div>
</section>`;
  }).join('');

  return `<!doctype html><html lang="${esc(lang)}"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow">
<title>RestOS · ${esc(t.title)}</title>
<style>
*{box-sizing:border-box}body{margin:0;font:14px/1.45 system-ui,sans-serif;background:#faf7f2;color:#1d2a24}
header{display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid #e4ddd0;background:#fff;position:sticky;top:0;z-index:5}
h1{font-size:20px;margin:0}.langs a{margin-left:10px;color:#0f2d24}.langs a.on{font-weight:700;text-decoration:none}
.keep{padding:10px 20px;background:#fff6dc;border-bottom:1px solid #f0e2b0;font-size:13px}
details.add{padding:12px 20px;border-bottom:1px solid #e4ddd0;background:#fff}
details.add summary{cursor:pointer;font-weight:600;color:#0f2d24}
.add form{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px;margin-top:12px;max-width:1000px}
.add input,.add select,.add textarea{width:100%;font:inherit;padding:8px 10px;border:1px solid #d9d1c2;border-radius:8px;background:#fff}
.add button{padding:9px 14px;border-radius:8px;background:#0f2d24;color:#faf7f2;border:0;font-weight:600;cursor:pointer}
.board{display:grid;grid-template-columns:repeat(5,minmax(240px,1fr));gap:14px;padding:16px 20px 60px;overflow-x:auto}
.col{background:#f1ebe0;border-radius:14px;padding:10px;min-height:200px}
.col.over{outline:2px dashed #0f2d24}
.col h2{font-size:14px;margin:4px 6px 10px;display:flex;justify-content:space-between}
.count{background:#0f2d24;color:#faf7f2;border-radius:999px;padding:0 8px;font-size:12px}
.col[data-status=won] h2 .count{background:#2f7a52}.col[data-status=lost] h2 .count{background:#9a5040}
.list{display:flex;flex-direction:column;gap:10px;min-height:60px}
.card{background:#fff;border:1px solid #e4ddd0;border-radius:12px;padding:10px 12px;cursor:grab}
.card.dragging{opacity:.5}
.top{display:flex;justify-content:space-between;font-size:11px;color:#7a857f}
.kind{padding:1px 7px;border-radius:999px;background:#eee7da;color:#0f2d24;font-weight:600}
.k-demo{background:#dfeee5}.k-help{background:#fbe9c4}.k-manual{background:#e3e4f5}
.who{font-weight:650;margin-top:6px}.phone.big{font-size:16px;margin-top:6px}.venue{color:#55625b}.phone{display:inline-block;margin-top:2px;color:#0f2d24;font-weight:600}
.details,.meta{font-size:12px;color:#7a857f;margin-top:4px;word-break:break-word}
.notes{width:100%;margin-top:8px;font:inherit;font-size:13px;border:1px solid #e4ddd0;border-radius:8px;padding:6px 8px;resize:vertical}
.row{display:flex;gap:6px;margin-top:6px}.status{flex:1;font:inherit;padding:5px;border-radius:8px;border:1px solid #d9d1c2}
.del{border:1px solid #e4c9c0;background:#fff;color:#9a5040;border-radius:8px;padding:4px 8px;cursor:pointer}
.expiry{font-size:11px;color:#a09884;margin-top:6px}
.toast{position:fixed;bottom:16px;left:50%;transform:translateX(-50%);background:#0f2d24;color:#faf7f2;padding:8px 14px;border-radius:999px;font-size:13px;opacity:0;transition:opacity .2s}
.toast.on{opacity:1}
@media (max-width:700px){.board{grid-template-columns:repeat(5,85vw);scroll-snap-type:x mandatory}.col{scroll-snap-align:start}}
</style></head><body>
<header><h1>RestOS · ${esc(t.title)} <span class="count">${leads.length}</span></h1>
<nav class="langs">${['uz', 'ru', 'en'].map((l) => `<a class="${l === lang ? 'on' : ''}" href="${esc(langLink(l))}">${l.toUpperCase()}</a>`).join('')}</nav></header>
<div class="keep">${esc(t.keep)}</div>
<details class="add"><summary>${esc(t.add)}</summary>
<form id="add"><input name="name" placeholder="${esc(t.name)}"><input name="phone" required placeholder="+998 90 123 45 67" inputmode="tel">
<input name="venue" placeholder="${esc(t.venue)}">
<select name="via" aria-label="${esc(t.via)}">${Object.entries(t.viaOpts).map(([k, v]) => `<option value="${k}">${esc(v)}</option>`).join('')}</select>
<input name="notes" placeholder="${esc(t.notes)}"><button type="submit">${esc(t.save)}</button></form>
<p style="margin:8px 0 0;color:#7a857f;font-size:12px">${esc(t.addHint)}</p></details>
<main class="board">${cols}</main>
<div class="toast" id="toast"></div>
<script>
(() => {
  const key = new URLSearchParams(location.search).get('key') || '';
  const T = ${JSON.stringify({ saved: t.saved, error: t.error, confirmDel: t.confirmDel }).replace(/</g, '\\u003c')};
  const toast = (msg) => { const el = document.getElementById('toast'); el.textContent = msg; el.classList.add('on'); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('on'), 1500); };
  const api = (method, body) => fetch('/api/leads', { method, headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + key }, body: JSON.stringify(body) })
    .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); });
  const counts = () => document.querySelectorAll('.col').forEach((c) => { c.querySelector('h2 .count').textContent = c.querySelectorAll('.card').length; });
  const ref = (card) => ({ table: card.dataset.table, id: Number(card.dataset.id) });
  const move = (card, status) => {
    const col = document.querySelector('.col[data-status="' + status + '"] .list');
    if (!col) return;
    const prev = card.parentElement;
    col.prepend(card); card.querySelector('.status').value = status; counts();
    api('PATCH', { ...ref(card), status }).then(() => toast(T.saved)).catch(() => { prev.prepend(card); counts(); toast(T.error); });
  };
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('dragstart', (e) => { card.classList.add('dragging'); e.dataTransfer.setData('text/plain', card.dataset.table + ':' + card.dataset.id); });
    card.addEventListener('dragend', () => card.classList.remove('dragging'));
    card.querySelector('.status').addEventListener('change', (e) => move(card, e.target.value));
    const notes = card.querySelector('.notes'); let last = notes.value;
    notes.addEventListener('blur', () => { if (notes.value === last) return; api('PATCH', { ...ref(card), notes: notes.value }).then(() => { last = notes.value; toast(T.saved); }).catch(() => toast(T.error)); });
    card.querySelector('.del').addEventListener('click', () => { if (!confirm(T.confirmDel)) return; api('DELETE', ref(card)).then(() => { card.remove(); counts(); }).catch(() => toast(T.error)); });
  });
  document.querySelectorAll('.col').forEach((col) => {
    col.addEventListener('dragover', (e) => { e.preventDefault(); col.classList.add('over'); });
    col.addEventListener('dragleave', () => col.classList.remove('over'));
    col.addEventListener('drop', (e) => {
      e.preventDefault(); col.classList.remove('over');
      const [table, id] = e.dataTransfer.getData('text/plain').split(':');
      const card = document.querySelector('.card[data-table="' + table + '"][data-id="' + id + '"]');
      if (card && card.closest('.col') !== col) move(card, col.dataset.status);
    });
  });
  document.getElementById('add').addEventListener('submit', (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target));
    api('POST', f).then(() => location.reload()).catch(() => toast(T.error));
  });
})();
</script></body></html>`;
}
