import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventsCalendar from '@/components/EventsCalendar';

const Events = () => {
  return (
    <>
      <Helmet>
        <title>Relief Events Calendar - Hurricane Melissa | Unbiased Relief</title>
        <meta
          name="description"
          content="Find local relief events, volunteer opportunities, and collection drives for Hurricane Melissa relief efforts in Jamaica."
        />
        <meta property="og:title" content="Relief Events Calendar - Unbiased Relief" />
        <meta
          property="og:description"
          content="Join relief events and volunteer opportunities in Jamaica"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://unbiasedrelief.org/events" />
        <link rel="canonical" href="https://unbiasedrelief.org/events" />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background pt-20 pb-16">
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <EventsCalendar />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Events;
