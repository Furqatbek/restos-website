const DemoModal = ({ open, onClose, t, lang }) => {
  const [form, setForm] = React.useState({ name: "", phone: "", company: "" });
  const [submitted, setSubmitted] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const L = {
    en: { title: "Book a demo.", sub: "30 min. No slides. Real product.", name: "Full name", phone: "Phone", company: "Venue / company", submit: "Request demo", done: "Got it.", doneSub: "We'll call you within one business day.", close: "Close", req: "required" },
    ru: { title: "Заказать демо.", sub: "30 минут. Без слайдов. Живой продукт.", name: "Имя", phone: "Телефон", company: "Заведение / компания", submit: "Запросить демо", done: "Принято.", doneSub: "Перезвоним в течение рабочего дня.", close: "Закрыть", req: "обязательно" },
    uz: { title: "Demo buyurtma.", sub: "30 daqiqa. Slaydlarsiz. Jonli mahsulot.", name: "Ism", phone: "Telefon", company: "Muassasa / kompaniya", submit: "Demo so'rash", done: "Qabul qilindi.", doneSub: "Bir ish kuni ichida qo'ng'iroq qilamiz.", close: "Yopish", req: "majburiy" },
    "uz-cyr": { title: "Демо буюртма.", sub: "30 дақиқа. Слайдларсиз. Жонли маҳсулот.", name: "Исм", phone: "Телефон", company: "Муассаса / компания", submit: "Демо сўраш", done: "Қабул қилинди.", doneSub: "Бир иш куни ичида қўнғироқ қиламиз.", close: "Ёпиш", req: "мажбурий" },
    kaa: { title: "Demo buyurtpa.", sub: "30 minut. Slaydlarsız. Janlı ónim.", name: "At", phone: "Telefon", company: "Muassasa / kompaniya", submit: "Demo soraw", done: "Qabıl etildi.", doneSub: "Bir jumıs kúni ishinde qońıraw etemiz.", close: "Japıw", req: "zárúr" },
  };
  const l = L[lang] || L.en;

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.company) return;
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label={l.close}>×</button>
        {!submitted ? (
          <>
            <div className="modal-inner">
              <div style={{fontFamily:"var(--mono)", fontSize:11, textTransform:"uppercase", letterSpacing:"0.05em", color:"var(--muted)"}}>
                {t.nav.demo}
              </div>
              <h3 className="modal-title">{l.title}</h3>
              <p className="modal-sub">{l.sub}</p>
              <form className="modal-form" onSubmit={submit}>
                <label className="field">
                  <span>{l.name} <em>*</em></span>
                  <input type="text" required value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    placeholder="Dilnoza R."/>
                </label>
                <label className="field">
                  <span>{l.phone} <em>*</em></span>
                  <input type="tel" required value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                    placeholder="+998 71 200 0000"/>
                </label>
                <label className="field">
                  <span>{l.company} <em>*</em></span>
                  <input type="text" required value={form.company}
                    onChange={e => setForm({...form, company: e.target.value})}
                    placeholder="Chinor Bistro"/>
                </label>
                <button type="submit" className="btn btn-primary btn-lg" style={{width:"100%", justifyContent:"center", marginTop:8}}>
                  {l.submit} <Icon name="arrow" size={14}/>
                </button>
                <div style={{fontFamily:"var(--mono)", fontSize:11, color:"var(--muted)", textAlign:"center"}}>
                  {t.hero.trust}
                </div>
              </form>
            </div>
            <div className="modal-aside">
              <div style={{fontFamily:"var(--serif)", fontSize:40, color:"var(--gold)", lineHeight:1, fontStyle:"italic"}}>RestOS</div>
              <div style={{fontFamily:"var(--mono)", fontSize:11, color:"rgba(250,247,242,0.6)", textTransform:"uppercase", letterSpacing:"0.08em", marginTop:16}}>What you get</div>
              <ul className="modal-points">
                <li><span className="check"><Icon name="check" size={14} stroke={2.2}/></span>Live walkthrough of your 3 most-wanted modules</li>
                <li><span className="check"><Icon name="check" size={14} stroke={2.2}/></span>Menu imported from your current POS</li>
                <li><span className="check"><Icon name="check" size={14} stroke={2.2}/></span>Custom pricing for your venue size</li>
                <li><span className="check"><Icon name="check" size={14} stroke={2.2}/></span>30-day free trial, no card</li>
              </ul>
            </div>
          </>
        ) : (
          <div className="modal-inner" style={{textAlign:"center", padding:"64px 40px", minHeight:420, display:"flex", flexDirection:"column", justifyContent:"center"}}>
            <div style={{width:60, height:60, borderRadius:"50%", background:"var(--gold)", margin:"0 auto", display:"grid", placeItems:"center", color:"var(--forest)"}}>
              <Icon name="check" size={28} stroke={2.5}/>
            </div>
            <h3 className="modal-title" style={{marginTop:20}}>{l.done}</h3>
            <p className="modal-sub">{l.doneSub}</p>
            <button onClick={onClose} className="btn btn-outline btn-lg" style={{margin:"24px auto 0"}}>{l.close}</button>
          </div>
        )}
      </div>
    </div>
  );
};

window.DemoModal = DemoModal;
