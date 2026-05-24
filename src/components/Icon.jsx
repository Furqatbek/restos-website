'use client';

const Icon = ({ name, size = 18, stroke = 1.75 }) => {
  const common = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor",
    strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round",
  };
  const paths = {
    waiter: <><path d="M12 6v5"/><circle cx="12" cy="4" r="1.5"/><path d="M4 14h16l-1 6H5z"/><path d="M9 14v-2a3 3 0 0 1 6 0v2"/></>,
    self: <><rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><path d="M13 13h3m0 0v3m0-3h4m-4 7h3m0 0v-3m0 3h4"/></>,
    delivery: <><rect x="1" y="7" width="13" height="9" rx="1"/><path d="M14 10h4l3 3v3h-7"/><circle cx="5.5" cy="18" r="2"/><circle cx="17.5" cy="18" r="2"/></>,
    payment: <><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M6 15h4"/></>,
    kitchen: <><path d="M6 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/><rect x="4" y="8" width="16" height="12" rx="1"/><path d="M8 12v4m4-4v4m4-4v4"/></>,
    inventory: <><path d="M3 7l9-4 9 4v10l-9 4-9-4V7z"/><path d="M3 7l9 4 9-4"/><path d="M12 11v10"/></>,
    analytics: <><path d="M4 20V10m6 10V4m6 16v-7"/><path d="M3 20h18"/></>,
    courier: <><circle cx="18" cy="17" r="3"/><circle cx="6" cy="17" r="3"/><path d="M9 17h6m0 0l-2-9H4m11 9l-2-5h6l2 5"/></>,
    loyalty: <><path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z"/></>,
    finance: <><path d="M12 2v20M17 6H9.5a2.5 2.5 0 0 0 0 5h5a2.5 2.5 0 0 1 0 5H6"/></>,
    pos: <><rect x="4" y="3" width="16" height="18" rx="2"/><rect x="7" y="6" width="10" height="4"/><path d="M7 14h2m2 0h2m2 0h2m-10 4h2m2 0h2m2 0h2"/></>,
    marketing: <><path d="M3 11h4l9-5v12l-9-5H3v-2z"/><path d="M16 9v6"/><path d="M19 8v8"/></>,
    check: <><polyline points="20 6 9 17 4 12"/></>,
    arrow: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    globe: <><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></>,
    bell: <><path d="M18 16v-5a6 6 0 1 0-12 0v5l-2 2h16z"/><path d="M10 20a2 2 0 0 0 4 0"/></>,
    spark: <><path d="M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/></>,
    tag: <><path d="M20 12l-8.5 8.5a2 2 0 0 1-2.8 0L2 13.8V4h9.8l8.2 8.2z"/><circle cx="7" cy="8" r="1"/></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></>,
    telegram: <><path d="M21.5 4.5L2.5 12l5 1.7M21.5 4.5L18 19.5l-7-4.5-1.5 5L9 16M21.5 4.5l-12.5 11"/></>,
  };
  return <svg {...common}>{paths[name] || null}</svg>;
};

export default Icon;
