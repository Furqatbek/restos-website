// Live mini-demos for each module — all strings localized via useDemoLang()

// 1. Waiter App
const WaiterDemo = () => {
  const D = useDemoLang().waiter;
  const [items, setItems] = React.useState(D.items);
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => { setItems(D.items); }, [D]);
  React.useEffect(() => {
    const t = setInterval(() => setTick(x => x + 1), 2800);
    return () => clearInterval(t);
  }, []);
  React.useEffect(() => {
    if (tick === 0) return;
    setItems(prev => {
      const next = [...prev];
      if (next.length > 4) next.shift();
      next.push(D.pool[tick % D.pool.length]);
      return next;
    });
  }, [tick]);

  const total = items.reduce((s, i) => s + i.q * i.p, 0);

  return (
    <div style={{display:"flex", alignItems:"center", justifyContent:"center", width:"100%"}}>
      <div className="phone-frame">
        <div className="phone-notch"/>
        <div className="phone-screen">
          <div className="phone-bar">
            <div>
              <div className="s">{D.table}</div>
              <div className="t">{D.order}</div>
            </div>
            <Icon name="bell" size={16}/>
          </div>
          <div className="phone-section">
            <span className="phone-table-pill"><Icon name="clock" size={12}/> {D.guests}</span>
          </div>
          <div style={{flex:1, overflow:"hidden"}}>
            {items.map((it, i) => (
              <div key={i+it.n} className="phone-item" style={{animation: i === items.length - 1 ? "fadein .4s" : undefined}}>
                <div style={{display:"flex", gap:10, alignItems:"center"}}>
                  <span className="q">{it.q}</span>
                  <span>{it.n}</span>
                </div>
                <span style={{fontFamily:"var(--mono)", fontSize:11, color:"var(--muted)"}}>{(it.q*it.p).toFixed(0)}k</span>
              </div>
            ))}
          </div>
          <div className="phone-cta">{D.cta} · {total}k UZS</div>
        </div>
      </div>
      <style>{`@keyframes fadein { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: none; } }`}</style>
    </div>
  );
};

// 2. Self-service / QR menus
const SelfDemo = () => {
  const D = useDemoLang().self;
  return (
  <div className="widget">
    <div className="widget-top"><span className="dots"><span/><span/><span/></span>chinor.bistro/menu</div>
    <div className="widget-body">
      <div className="ss-grid">
        <div style={{display:"flex", flexDirection:"column", gap:10}}>
          <div className="qr-box">
            <svg viewBox="0 0 21 21" shapeRendering="crispEdges">
              {(() => {
                const pattern = [
                  "111111101011101111111","100000101101101000001","101110100100101011101",
                  "101110101111101011101","101110100001001011101","100000101010101000001",
                  "111111101010101111111","000000001100100000000","110111110010111001011",
                  "100010101011010110100","011011011011001011110","110001001101110100010",
                  "001111101010010111011","000000001011110010100","111111101001011011011",
                  "100000101100110100010","101110100110110010111","101110100010011011001",
                  "101110101101101110110","100000101010111000101","111111101001010110110"
                ];
                return pattern.map((row, y) =>
                  [...row].map((c, x) => c === "1" ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="#e8b84d"/> : null)
                );
              })()}
            </svg>
          </div>
          <div style={{fontFamily:"var(--mono)", fontSize:10, color:"var(--muted)", textAlign:"center"}}>{D.scan}</div>
        </div>
        <div style={{display:"flex", flexDirection:"column", gap:10}}>
          <div style={{fontFamily:"var(--serif)", fontSize:20, color:"var(--forest)"}}>{D.title}</div>
          <div className="menu-list">
            {D.menu.map((m,i) => (
              <div className="menu-card" key={i}>
                <div>
                  <div className="nm">{m.n}</div>
                  {m.hot && <div style={{fontSize:10, color:"var(--terra)", fontFamily:"var(--mono)"}}>{D.chefPick}</div>}
                </div>
                <div className="pr">{m.p}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

// 3. Delivery integrations
const DeliveryDemo = () => {
  const D = useDemoLang().delivery;
  const [orders, setOrders] = React.useState({yandex: 18, wolt: 12, glovo: 9, uber: 6, own: 23});
  React.useEffect(() => {
    const t = setInterval(() => {
      setOrders(o => {
        const k = ["yandex","wolt","glovo","uber","own"][Math.floor(Math.random()*5)];
        return {...o, [k]: o[k] + 1};
      });
    }, 2200);
    return () => clearInterval(t);
  }, []);
  const items = [
    {k:"yandex", nm:"Yandex Eats", bg:"#ff3d00", sym:"Y"},
    {k:"wolt", nm:"Wolt", bg:"#00c2e8", sym:"W"},
    {k:"glovo", nm:"Glovo", bg:"#ffc244", sym:"G"},
    {k:"uber", nm:"Uber Eats", bg:"#06c167", sym:"U"},
    {k:"own", nm:D.direct, bg:"#0f2d24", sym:"⌂"},
  ];
  return (
    <div className="widget">
      <div className="widget-top"><span className="dots"><span/><span/><span/></span>{D.feed}</div>
      <div className="widget-body" style={{gap:8}}>
        {items.map(it => (
          <div key={it.k} className="int-row">
            <div className="int-logo" style={{background: it.bg}}>{it.sym}</div>
            <div>
              <div className="nm">{it.nm}</div>
              <div className="meta">{D.meta(orders[it.k])}</div>
            </div>
            <span className="status">{D.live}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 4. Payment
const PaymentDemo = () => {
  const D = useDemoLang().payment;
  const [active, setActive] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setActive(x => (x+1) % 12), 1400);
    return () => clearInterval(t);
  }, []);
  const methods = ["CLICK","PAYME","UZUM","APELSIN","HUMO","UZCARD","VISA","MC","APPLE","GOOGLE","CASH","SPLIT"];
  return (
    <div className="widget">
      <div className="widget-top"><span className="dots"><span/><span/><span/></span>{D.checkout}</div>
      <div className="widget-body">
        <div style={{fontFamily:"var(--serif)", fontSize:48, color:"var(--forest)", letterSpacing:"-0.02em", lineHeight:1}}>
          248 500 <span style={{fontSize:20, color:"var(--muted)"}}>UZS</span>
        </div>
        <div style={{fontSize:12, color:"var(--muted)", marginTop:-4}}>{D.guests}</div>
        <div style={{fontFamily:"var(--mono)", fontSize:10, color:"var(--muted)", textTransform:"uppercase", letterSpacing:"0.05em", marginTop:8}}>{D.payWith}</div>
        <div className="pay-grid">
          {methods.map((m,i) => (
            <div key={m} className={"pay-cell" + (i === active ? " active" : "")}>{m}</div>
          ))}
        </div>
        <div style={{marginTop:"auto", padding:"10px 12px", background:"var(--cream-2)", borderRadius:10, fontSize:12, color:"var(--forest)", display:"flex", justifyContent:"space-between"}}>
          <span>{D.split(methods[active])}</span>
          <span style={{fontFamily:"var(--mono)"}}>{D.fee}</span>
        </div>
      </div>
    </div>
  );
};

// 5. Kitchen Display
const KitchenDemo = () => {
  const D = useDemoLang().kitchen;
  const [tickets, setTickets] = React.useState([
    {id: 2478, tbl: "T07", time: "02:14", items: ["2× Plov","1× Lagman","1× Tea"], state: "firing"},
    {id: 2479, tbl: "T12", time: "04:30", items: ["3× Somsa","1× Shurpa"], state: "firing"},
    {id: 2480, tbl: "BAR", time: "00:42", items: ["2× Espresso","1× Croissant"], state: "new"},
    {id: 2476, tbl: "T03", time: "06:58", items: ["4× Manti","2× Ayran"], state: "ready"},
    {id: 2477, tbl: "T15", time: "05:20", items: ["1× Shashlik mix"], state: "firing"},
    {id: 2481, tbl: "D·W", time: "00:10", items: ["2× Plov","2× Samsa"], state: "new"},
  ]);
  React.useEffect(() => {
    const t = setInterval(() => {
      setTickets(ts => ts.map(t => {
        if (t.state === "new") return {...t, state: "firing"};
        if (t.state === "firing" && Math.random() > 0.7) return {...t, state: "ready"};
        return t;
      }));
    }, 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="widget">
      <div className="widget-top"><span className="dots"><span/><span/><span/></span>{D.top(tickets.filter(t=>t.state==="firing").length)}</div>
      <div className="widget-body">
        <div className="kds-grid">
          {tickets.map(t => (
            <div key={t.id} className={"kds-ticket " + t.state}>
              <div className="kds-head">
                <span className="tbl">{t.tbl}</span>
                <span className="kds-meta">#{t.id} · {t.time}</span>
              </div>
              {t.items.map((it,i) => (
                <div key={i} className="kds-line">
                  <span>{it}</span>
                  <span className="x">{t.state === "ready" ? "✓" : "·"}</span>
                </div>
              ))}
              {t.state === "ready" && <div style={{fontFamily:"var(--mono)", fontSize:10, color:"var(--gold)", marginTop:"auto"}}>{D.ready}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 6. Inventory
const InventoryDemo = () => {
  const D = useDemoLang().inventory;
  return (
    <div className="widget">
      <div className="widget-top"><span className="dots"><span/><span/><span/></span>{D.top}</div>
      <div className="widget-body">
        <div style={{display:"flex", gap:16, marginBottom:4}}>
          <div>
            <div style={{fontFamily:"var(--mono)", fontSize:10, color:"var(--muted)", textTransform:"uppercase"}}>{D.foodCost}</div>
            <div style={{fontFamily:"var(--serif)", fontSize:26, color:"var(--forest)"}}>28.4%</div>
          </div>
          <div>
            <div style={{fontFamily:"var(--mono)", fontSize:10, color:"var(--muted)", textTransform:"uppercase"}}>{D.margin}</div>
            <div style={{fontFamily:"var(--serif)", fontSize:26, color:"var(--terra)"}}>71.6%</div>
          </div>
          <div>
            <div style={{fontFamily:"var(--mono)", fontSize:10, color:"var(--muted)", textTransform:"uppercase"}}>{D.alerts}</div>
            <div style={{fontFamily:"var(--serif)", fontSize:26, color:"var(--terra)"}}>3</div>
          </div>
        </div>
        <div>
          {D.items.map((it, i) => (
            <div className="inv-row" key={i}>
              <div className="inv-name"><span className={"inv-dot " + it.s}/>{it.n}</div>
              <div className={"inv-bar " + it.s}><span style={{width: it.pct + "%"}}/></div>
              <div className="inv-val">{it.k} {it.u}</div>
              <div style={{fontFamily:"var(--mono)", fontSize:11, color:"var(--muted)", textAlign:"right"}}>{it.pct}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 7. Analytics
const AnalyticsDemo = () => {
  const D = useDemoLang().analytics;
  const [week, setWeek] = React.useState([42,58,51,67,72,95,88]);
  React.useEffect(() => {
    const t = setInterval(() => {
      setWeek(w => w.map(v => Math.max(30, Math.min(100, v + (Math.random()-0.5)*8))));
    }, 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="widget">
      <div className="widget-top"><span className="dots"><span/><span/><span/></span>{D.top}</div>
      <div className="widget-body">
        <div style={{display:"flex", gap:24, alignItems:"baseline"}}>
          <div>
            <div style={{fontFamily:"var(--mono)", fontSize:10, color:"var(--muted)", textTransform:"uppercase"}}>{D.week}</div>
            <div style={{fontFamily:"var(--serif)", fontSize:36, color:"var(--forest)", letterSpacing:"-0.02em", lineHeight:1}}>
              48.2M <span style={{fontSize:16, color:"var(--muted)"}}>UZS</span>
            </div>
          </div>
          <div style={{fontFamily:"var(--mono)", fontSize:11, color:"#2f7a52"}}>{D.vs}</div>
        </div>
        <div className="chart" style={{marginTop:24}}>
          {week.map((h, i) => (
            <div key={i} className={"chart-bar" + (i === 5 ? " accent" : "")} style={{height: h + "%"}} data-day={D.days[i]}/>
          ))}
        </div>
        <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:12, marginTop:28, fontSize:12}}>
          <div><div style={{fontFamily:"var(--mono)", fontSize:10, color:"var(--muted)", textTransform:"uppercase"}}>{D.avgCheque}</div><div style={{fontFamily:"var(--serif)", fontSize:20, color:"var(--forest)"}}>186k</div></div>
          <div><div style={{fontFamily:"var(--mono)", fontSize:10, color:"var(--muted)", textTransform:"uppercase"}}>{D.covers}</div><div style={{fontFamily:"var(--serif)", fontSize:20, color:"var(--forest)"}}>1 842</div></div>
          <div><div style={{fontFamily:"var(--mono)", fontSize:10, color:"var(--muted)", textTransform:"uppercase"}}>{D.turn}</div><div style={{fontFamily:"var(--serif)", fontSize:20, color:"var(--forest)"}}>2.4×</div></div>
        </div>
      </div>
    </div>
  );
};

// 8. Courier
const CourierDemo = () => {
  const D = useDemoLang().courier;
  const [pos, setPos] = React.useState(30);
  React.useEffect(() => {
    const t = setInterval(() => setPos(p => (p + 2) % 100), 160);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="widget">
      <div className="widget-top"><span className="dots"><span/><span/><span/></span>{D.top}</div>
      <div className="widget-body">
        <div className="map">
          <svg className="map-route" viewBox="0 0 300 200" preserveAspectRatio="none">
            <path d="M 50 160 Q 90 80, 160 100 T 260 40" fill="none" stroke="#0f2d24" strokeWidth="2" strokeDasharray="4 4" opacity="0.4"/>
            <path d="M 50 160 Q 90 80, 160 100" fill="none" stroke="#e8b84d" strokeWidth="2.5"/>
          </svg>
          <div className="map-pin" style={{left:"17%", top:"80%"}}>
            <div className="marker"/>
            <div className="tag">{D.kitchen}</div>
          </div>
          <div className="map-pin gold" style={{left: pos*0.4 + 17 + "%", top: 80 - pos*0.4 + "%"}}>
            <div className="marker"/>
            <div className="tag">{D.pinTag}</div>
          </div>
          <div className="map-pin terra" style={{left:"87%", top:"20%"}}>
            <div className="marker"/>
            <div className="tag">{D.drop}</div>
          </div>
        </div>
        <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:8, fontSize:12}}>
          {D.couriers.map((c,i) => (
            <div key={i} style={{padding:"8px 10px", background:"var(--cream-2)", borderRadius:8, borderLeft:"3px solid " + c.s}}>
              <div style={{fontWeight:600, color:"var(--forest)"}}>{c.nm}</div>
              <div style={{color:"var(--muted)", fontFamily:"var(--mono)", fontSize:10}}>{c.st}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 9. Loyalty
const LoyaltyDemo = () => {
  const D = useDemoLang().loyalty;
  return (
  <div className="widget">
    <div className="widget-top"><span className="dots"><span/><span/><span/></span>{D.top}</div>
    <div className="widget-body">
      <div className="loyalty-card">
        <div className="lbl">{D.gold}</div>
        <div className="nm">{D.nm}</div>
        <div className="num">{D.since}</div>
        <div className="row">
          <div>
            <div style={{fontFamily:"var(--mono)", fontSize:10, color:"var(--gold)", textTransform:"uppercase"}}>{D.points}</div>
            <div className="pts">1 840<small>/ 2 500</small></div>
          </div>
          <div style={{fontFamily:"var(--mono)", fontSize:10, color:"rgba(250,247,242,0.6)", textAlign:"right"}}>{D.next}</div>
        </div>
        <div className="loyalty-tiers">
          <span className="on"/><span className="on"/><span className="on"/><span className="on"/><span/>
        </div>
      </div>
      <div style={{display:"flex", flexDirection:"column", gap:6, fontSize:12, marginTop:4}}>
        <div style={{fontFamily:"var(--mono)", fontSize:10, color:"var(--muted)", textTransform:"uppercase", letterSpacing:"0.05em"}}>{D.recent}</div>
        {D.visits.map((v,i) => (
          <div key={i} style={{display:"flex", justifyContent:"space-between", padding:"8px 10px", background:"var(--cream-2)", borderRadius:8}}>
            <div>
              <div style={{fontWeight:500, color:"var(--forest)"}}>{v.d} · {v.pl}</div>
            </div>
            <div style={{display:"flex", gap:12, alignItems:"center"}}>
              <span style={{fontFamily:"var(--mono)", fontSize:11, color:"var(--muted)"}}>{v.sp}</span>
              <span style={{fontFamily:"var(--mono)", fontSize:11, color:"var(--terra)", fontWeight:600}}>{v.pt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

// 10. Finance
const FinanceDemo = () => {
  const D = useDemoLang().finance;
  return (
  <div className="widget">
    <div className="widget-top"><span className="dots"><span/><span/><span/></span>{D.top}</div>
    <div className="widget-body">
      <div style={{display:"flex", gap:24, marginBottom:8}}>
        <div>
          <div style={{fontFamily:"var(--mono)", fontSize:10, color:"var(--muted)", textTransform:"uppercase"}}>{D.net}</div>
          <div style={{fontFamily:"var(--serif)", fontSize:36, color:"var(--forest)", letterSpacing:"-0.02em", lineHeight:1}}>12.8M</div>
        </div>
        <div>
          <div style={{fontFamily:"var(--mono)", fontSize:10, color:"var(--muted)", textTransform:"uppercase"}}>{D.ebitda}</div>
          <div style={{fontFamily:"var(--serif)", fontSize:36, color:"var(--terra)", letterSpacing:"-0.02em", lineHeight:1}}>24.1%</div>
        </div>
      </div>
      <div className="fin-rows">
        {D.rows.map(([k,v],i) => (
          <div className="fin-row" key={i}><span className="k">{k}</span><span className="v">{v}</span></div>
        ))}
        <div className="fin-row total"><span>{D.totalK}</span><span className="v">{D.totalV}</span></div>
      </div>
    </div>
  </div>
  );
};

// 11. POS
const PosDemo = () => {
  const D = useDemoLang().pos;
  return (
    <div className="widget">
      <div className="widget-top"><span className="dots"><span/><span/><span/></span>{D.top}</div>
      <div className="widget-body">
        <div className="pos-grid">
          <div>
            <div className="pos-cats">
              {D.cats.map((c,i) => <span key={c} className={"c" + (i===1 ? " active":"")}>{c}</span>)}
            </div>
            <div className="pos-items">
              {D.items.map((it,i) => (
                <div key={i} className="pos-tile">
                  <div className="nm">{it.n}</div>
                  <div className="pr">{it.p}k</div>
                </div>
              ))}
            </div>
          </div>
          <div className="pos-bill">
            <div style={{fontFamily:"var(--mono)", fontSize:10, color:"var(--muted)", textTransform:"uppercase", marginBottom:8}}>{D.bill}</div>
            {D.billItems.map((b,i) => (
              <div key={i} className="pos-bill-row">
                <span className="nm">{b.n}</span>
                <span className="pr">{b.p}</span>
              </div>
            ))}
            <div className="pos-bill-total">
              <span>{D.total}</span>
              <span>178k</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 12. Marketing
const MarketingDemo = () => {
  const D = useDemoLang().marketing;
  return (
    <div className="widget">
      <div className="widget-top"><span className="dots"><span/><span/><span/></span>{D.top}</div>
      <div className="widget-body">
        <div style={{display:"flex", gap:16, marginBottom:4}}>
          <div>
            <div style={{fontFamily:"var(--mono)", fontSize:10, color:"var(--muted)", textTransform:"uppercase"}}>{D.redeemed}</div>
            <div style={{fontFamily:"var(--serif)", fontSize:28, color:"var(--forest)"}}>186</div>
          </div>
          <div>
            <div style={{fontFamily:"var(--mono)", fontSize:10, color:"var(--muted)", textTransform:"uppercase"}}>{D.attach}</div>
            <div style={{fontFamily:"var(--serif)", fontSize:28, color:"var(--terra)"}}>62%</div>
          </div>
          <div>
            <div style={{fontFamily:"var(--mono)", fontSize:10, color:"var(--muted)", textTransform:"uppercase"}}>{D.uplift}</div>
            <div style={{fontFamily:"var(--serif)", fontSize:28, color:"var(--forest)"}}>+28%</div>
          </div>
        </div>
        <div style={{display:"flex", flexDirection:"column", gap:10}}>
          {D.bundles.map((b,i) => (
            <div key={i} className="mk-bundle">
              <div className="mk-bundle-vis">{b.emoji}</div>
              <div style={{flex:1}}>
                <div className="nm">{b.n}</div>
                <div className="desc">{b.d}</div>
              </div>
              <div className="stat">
                <div className="v">{b.redeemed}</div>
                <div className="l">{b.c} {D.conv}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, {
  WaiterDemo, SelfDemo, DeliveryDemo, PaymentDemo, KitchenDemo,
  InventoryDemo, AnalyticsDemo, CourierDemo, LoyaltyDemo,
  FinanceDemo, PosDemo, MarketingDemo
});
