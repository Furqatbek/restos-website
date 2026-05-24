import Nav from '@/components/Nav';
import CareersContent from '@/components/CareersContent';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Careers',
  description:
    'Join the team building the future of restaurant technology. Open roles at RestOS in engineering, product, and sales.',
  alternates: { canonical: 'https://restos.uz/careers' },
  openGraph: {
    url: 'https://restos.uz/careers',
    title: 'Careers — RestOS',
    description: 'Join the team building the future of restaurant technology.',
  },
  twitter: {
    title: 'Careers — RestOS',
    description: 'Join the team building the future of restaurant technology.',
  },
};

export default function Careers() {
  return (
    <>
      <Nav activePage="vacancy"/>
      <CareersContent/>
      <Footer/>
    </>
  );
}
