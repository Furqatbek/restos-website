import Nav from '@/components/Nav';
import AboutContent from '@/components/AboutContent';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'About',
  description:
    'Learn about RestOS — the team building the operating system for modern hospitality. Our mission, values, and story.',
  alternates: { canonical: 'https://restos.uz/about' },
  openGraph: {
    url: 'https://restos.uz/about',
    title: 'About RestOS',
    description: 'The team building the operating system for modern hospitality.',
  },
  twitter: {
    title: 'About RestOS',
    description: 'The team building the operating system for modern hospitality.',
  },
};

export default function About() {
  return (
    <>
      <Nav activePage="about"/>
      <AboutContent/>
      <Footer/>
    </>
  );
}
