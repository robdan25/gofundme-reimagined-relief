import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Testimonials from '@/components/Testimonials';

const TestimonialsPage = () => {
  return (
    <>
      <Helmet>
        <title>Community Testimonials - Hurricane Melissa Relief | Unbiased Relief</title>
        <meta
          name="description"
          content="Read stories from people helped by Hurricane Melissa relief efforts and volunteers who made a difference in Jamaica."
        />
        <meta property="og:title" content="Community Testimonials - Unbiased Relief" />
        <meta
          property="og:description"
          content="Real stories from our community about Hurricane Melissa relief efforts"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://unbiasedrelief.org/testimonials" />
        <link rel="canonical" href="https://unbiasedrelief.org/testimonials" />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background pt-20 pb-16">
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <Testimonials featured={true} limit={12} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default TestimonialsPage;
