import BlogPreview from '@/components/BlogPreview';
import Categories from '@/components/Categories';
import FeaturedProducts from '@/components/FeaturedProducts';
import Hero from '@/components/Hero';
import Newsletter from '@/components/Newsletter';

export default function Page() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <BlogPreview />
      <Newsletter />
    </>
  );
}
