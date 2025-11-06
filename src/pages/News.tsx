import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JamaicaNewsFeed from '@/components/JamaicaNewsFeed';

const News = () => {
  return (
    <>
      <Helmet>
        <title>Hurricane Melissa News - Latest Updates | Unbiased Relief</title>
        <meta
          name="description"
          content="Get the latest news and updates about Hurricane Melissa in Jamaica. Real-time coverage from major Jamaican news outlets."
        />
        <meta
          property="og:title"
          content="Hurricane Melissa News - Latest Updates"
        />
        <meta
          property="og:description"
          content="Real-time news coverage of Hurricane Melissa relief efforts in Jamaica."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://unbiasedrelief.org/news" />
        <link rel="canonical" href="https://unbiasedrelief.org/news" />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Hurricane Melissa News
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Real-time coverage of Hurricane Melissa relief efforts from major
              Jamaican news outlets.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-foreground">
              Latest News
            </h2>
            <JamaicaNewsFeed limit={12} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default News;
