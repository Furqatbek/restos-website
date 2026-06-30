import Nav from '@/components/Nav';
import BlogContent from '@/components/BlogContent';
import Footer from '@/components/Footer';
import { pageMetadata } from '@/lib/seo';
import { I18N } from '@/lib/i18n';
import { isLocale, DEFAULT_LOCALE } from '@/lib/locale';

export function generateMetadata({ params }) {
  const lang = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const t = I18N[lang] || I18N.en;
  return pageMetadata({
    lang,
    path: '/blog',
    title: t.nav.blog,
    description:
      'Insights on restaurant operations, hospitality technology, and the business of food service from the RestOS team.',
  });
}

export default function Blog() {
  return (
    <>
      <Nav activePage="blog"/>
      <BlogContent/>
      <Footer/>
    </>
  );
}
