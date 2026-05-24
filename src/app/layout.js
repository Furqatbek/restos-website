import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google';
import { Providers } from '@/components/Providers';
import './globals.css';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: 'RestOS — The operating system for modern hospitality',
  description: 'One system. Twelve modules. Zero spreadsheets. RestOS handles your entire restaurant operation.',
  icons: {
    icon: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='%230f2d24'/><text x='32' y='48' font-family='Georgia,serif' font-style='italic' font-size='48' font-weight='400' text-anchor='middle' fill='%23e8b84d'>R</text></svg>",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body style={{ fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
