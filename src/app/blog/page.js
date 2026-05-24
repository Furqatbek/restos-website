import Nav from '@/components/Nav';
import BlogContent from '@/components/BlogContent';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Blog',
  description:
    'Insights on restaurant operations, hospitality technology, and the business of food service from the RestOS team.',
  alternates: { canonical: 'https://restos.uz/blog' },
  openGraph: {
    url: 'https://restos.uz/blog',
    type: 'website',
    title: 'Blog — RestOS',
    description: 'Insights on restaurant operations and hospitality technology.',
  },
  twitter: {
    title: 'Blog — RestOS',
    description: 'Insights on restaurant operations and hospitality technology.',
  },
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
