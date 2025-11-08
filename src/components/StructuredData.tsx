import { Helmet } from "react-helmet-async";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface StructuredDataProps {
  type: "Organization" | "WebPage" | "BreadcrumbList" | "FAQPage" | "NewsArticle";
  data: Record<string, any>;
}

export const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Unbiased Relief",
    url: "https://unbiasedrelief.org",
    logo: "https://unbiasedrelief.org/Images/heart.png",
    description:
      "Unbiased Relief provides verified aid and support for Hurricane Melissa relief efforts in Jamaica.",
    sameAs: [
      "https://twitter.com/unbiasedrelief",
      "https://facebook.com/unbiasedrelief",
    ],
    contact: {
      "@type": "ContactPoint",
      telephone: "+1-876-XXX-XXXX",
      contactType: "Customer Service",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "JM",
      addressLocality: "Jamaica",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export const WebPageSchema = ({
  title,
  description,
  canonical,
}: {
  title: string;
  description: string;
  canonical: string;
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: description,
    url: canonical,
    publisher: {
      "@type": "Organization",
      name: "Unbiased Relief",
      url: "https://unbiasedrelief.org",
      logo: {
        "@type": "ImageObject",
        url: "https://unbiasedrelief.org/Images/heart.png",
      },
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export const BreadcrumbSchema = ({ breadcrumbs }: { breadcrumbs: BreadcrumbItem[] }) => {
  const breadcrumbItems = breadcrumbs.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export const FAQSchema = (
  faqs: Array<{ question: string; answer: string }>
) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export const NewsArticleSchema = ({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
}: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: string;
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: headline,
    description: description,
    image: image,
    datePublished: datePublished,
    dateModified: dateModified,
    author: {
      "@type": "Organization",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "Unbiased Relief",
      logo: {
        "@type": "ImageObject",
        url: "https://unbiasedrelief.org/Images/heart.png",
      },
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};
