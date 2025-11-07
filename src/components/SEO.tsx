import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterHandle?: string;
  keywords?: string;
  author?: string;
}

const SEO = ({
  title,
  description,
  canonical = "https://unbiasedrelief.org",
  ogImage = "https://srv1714-files.hstgr.io/b320ad88c348746b/files/public_html/Images/hero-relief-supplies.jpg",
  ogType = "website",
  twitterHandle = "@unbiasedrelief",
  keywords = "Jamaica, Hurricane Melissa, Relief, Donations, Aid, Community",
  author = "Unbiased Relief",
}: SEOProps) => {
  const fullTitle = `${title} | Unbiased Relief`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="charset" content="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:site_name" content="Unbiased Relief" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="theme-color" content="#CC0000" />
    </Helmet>
  );
};

export default SEO;
