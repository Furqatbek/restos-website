import Nav from '@/components/Nav';
import BlogContent from '@/components/BlogContent';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Blog — RestOS',
};

export default function Blog() {
  return (
    <>
      <Nav activePage="blog"/>
      <BlogContent/>
      <Footer/>
    </>
  );
}
