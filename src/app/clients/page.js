import Nav from '@/components/Nav';
import ClientsContent from '@/components/ClientsContent';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Clients — RestOS',
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
