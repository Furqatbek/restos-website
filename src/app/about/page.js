import Nav from '@/components/Nav';
import AboutContent from '@/components/AboutContent';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'About — RestOS',
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
