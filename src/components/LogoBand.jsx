'use client';

// Three customers, shown once. The previous marquee repeated the same three
// names twelve times, which reads as padding around thin content — and with
// three customers, honesty is the stronger signal.
//
// Names published with the owner's written permission (confirmed 2026-08-28).
const VENUES = ["Jangirov's", 'Qahvoon', 'LaCasa', 'Mayami Club'];

export default function LogoBand() {
  return (
    <section className="logos">
      <div className="wrap">
        <div className="logos-row">
          {VENUES.map((v) => (
            <div className="logo-cell" key={v}>{v}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
