const TweakPanel = ({ tweaks, setTweaks }) => {
  const accents = [
    { k: "gold", name: "Gold", bg: "#e8b84d" },
    { k: "terra", name: "Terracotta", bg: "#d97757" },
    { k: "saffron", name: "Saffron", bg: "#e07a2f" },
    { k: "sage", name: "Sage", bg: "#8fb58a" },
  ];
  const themes = [
    { k: "forest", name: "Forest" },
    { k: "cream", name: "Cream" },
    { k: "ink", name: "Ink" },
  ];
  return (
    <div className="tweaks-panel">
      <h5>Tweaks <span className="tag">RESTOS</span></h5>
      <div className="tw-row">
        <label>Accent</label>
        <div className="tw-swatches">
          {accents.map(a => (
            <button key={a.k} className={"tw-swatch" + (tweaks.accent === a.k ? " active" : "")}
              style={{background: a.bg}} onClick={() => setTweaks({...tweaks, accent: a.k})} aria-label={a.name}/>
          ))}
        </div>
      </div>
      <div className="tw-row">
        <label>Hero tone</label>
        <div className="tw-segment">
          {themes.map(t => (
            <button key={t.k} className={tweaks.theme === t.k ? "active" : ""}
              onClick={() => setTweaks({...tweaks, theme: t.k})}>{t.name}</button>
          ))}
        </div>
      </div>
      <div className="tw-row">
        <label>Headline</label>
        <div className="tw-segment">
          {["Poetic","Direct","Bold"].map(h => (
            <button key={h} className={tweaks.headline === h ? "active" : ""}
              onClick={() => setTweaks({...tweaks, headline: h})}>{h}</button>
          ))}
        </div>
      </div>
      <div className="tw-row">
        <label>Orbit motion</label>
        <div className="tw-segment">
          {["Slow","Med","Fast","Off"].map(h => (
            <button key={h} className={tweaks.motion === h ? "active" : ""}
              onClick={() => setTweaks({...tweaks, motion: h})}>{h}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

window.TweakPanel = TweakPanel;
