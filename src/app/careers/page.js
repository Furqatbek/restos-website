import Nav from '@/components/Nav';
import CareersContent from '@/components/CareersContent';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Careers — RestOS',
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
