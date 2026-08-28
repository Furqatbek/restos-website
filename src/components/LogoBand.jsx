'use client';

// Three customers, shown once. The previous marquee repeated the same three
// names twelve times, which reads as padding around thin content — and with
// three customers, honesty is the stronger signal.
//
// NOTE: using these names publicly requires written permission from each
// venue (CUSTOMER_NAMES_APPROVED in the rebuild brief). Remove any name that
// has not been approved.
const VENUES = ['Qahvoon', "Jangirov's", 'Mayami'];

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
