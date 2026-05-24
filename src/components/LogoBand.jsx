'use client';

export default function LogoBand() {
  const venues = ['Qahvoon', "Jangirov's", 'Mayami'];
  const reel = [...venues, ...venues, ...venues, ...venues, ...venues, ...venues];
  return (
    <section className="logos">
      <div className="logos-marquee">
        <div className="logos-track">
          {reel.map((v, i) => <div className="logo-cell" key={i}>{v}</div>)}
        </div>
        <div className="logos-track" aria-hidden="true">
          {reel.map((v, i) => <div className="logo-cell" key={i}>{v}</div>)}
        </div>
      </div>
    </section>
  );
}
