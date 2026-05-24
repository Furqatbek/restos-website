import Nav from '@/components/Nav';
import ClientsContent from '@/components/ClientsContent';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Clients',
  description:
    'Over 2,400 restaurants and hospitality venues trust RestOS. See how our clients cut costs, reduce waste, and grow revenue.',
  alternates: { canonical: 'https://restos.uz/clients' },
  openGraph: {
    url: 'https://restos.uz/clients',
    title: 'Clients — RestOS',
    description: 'Over 2,400 restaurants trust RestOS to run their operations.',
  },
  twitter: {
    title: 'Clients — RestOS',
    description: 'Over 2,400 restaurants trust RestOS to run their operations.',
  },
};

export default function Clients() {
  return (
    <>
      <Nav activePage="clients"/>
      <ClientsContent/>
      <Footer/>
    </>
  );
}
