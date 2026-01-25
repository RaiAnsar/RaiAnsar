import { faqData } from '@/data/faq';
import { services } from '@/data/services';

export function Schema() {
  // Person Schema - Rai Ansar
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://raiansar.com/#person",
    "name": "Rai Ansar",
    "url": "https://raiansar.com",
    "image": {
      "@type": "ImageObject",
      "url": "https://raiansar.com/images/jpg/me.jpg",
      "width": 800,
      "height": 600
    },
    "sameAs": [
      "https://twitter.com/raiansar",
      "https://www.linkedin.com/in/raiansar",
      "https://github.com/raiansar"
    ],
    "jobTitle": "WordPress Developer & Server Specialist",
    "description": "Expert WordPress developer, React specialist, and server management professional with 6+ years of experience and 500+ successful projects. Specializing in custom development, plugin rebuilding, security, optimization, and maintenance services.",
    "knowsAbout": [
      "WordPress Development",
      "WooCommerce",
      "Server Management",
      "cPanel/WHM/WHMCS",
      "Web Security",
      "PHP Development",
      "React Development",
      "VPS Management",
      "Website Optimization",
      "Malware Removal"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "WordPress Developer & Server Specialist",
      "occupationLocation": {
        "@type": "Country",
        "name": "Pakistan"
      },
      "skills": "WordPress, WooCommerce, PHP, React, Server Management, cPanel, WHM, WHMCS, Linux, MySQL, Security Hardening, Performance Optimization",
      "experienceRequirements": {
        "@type": "OccupationalExperienceRequirements",
        "monthsOfExperience": 72
      }
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Self-Taught Developer"
    },
    "award": [
      "500+ Successfully Completed Projects",
      "6+ Years Professional Experience"
    ]
  };

  // Organization/Professional Service Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://raiansar.com/#organization",
    "name": "Rai Ansar - WordPress & Server Specialist",
    "url": "https://raiansar.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://raiansar.com/images/jpg/me.jpg"
    },
    "image": "https://raiansar.com/images/jpg/me.jpg",
    "description": "Professional WordPress development, server management, and web security services with 6+ years of experience and 500+ successful projects.",
    "founder": {
      "@id": "https://raiansar.com/#person"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "PK"
    },
    "sameAs": [
      "https://twitter.com/raiansar",
      "https://www.linkedin.com/in/raiansar",
      "https://github.com/raiansar"
    ],
    "priceRange": "$$",
    "areaServed": {
      "@type": "GeoCircle",
      "name": "Worldwide"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "WordPress & Server Services",
      "itemListElement": services.map((service, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.title,
          "description": service.description
        }
      }))
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "500",
      "bestRating": "5"
    }
  };

  // WebSite Schema with Search Action
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://raiansar.com/#website",
    "url": "https://raiansar.com",
    "name": "Rai Ansar - WordPress & Server Specialist",
    "description": "Expert WordPress developer and server specialist portfolio showcasing services, skills, and client testimonials.",
    "publisher": {
      "@id": "https://raiansar.com/#person"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://raiansar.com/?s={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": "en-US"
  };

  // FAQPage Schema
  const allFAQs = Object.values(faqData).flat();
  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://raiansar.com/#faqpage",
    "mainEntity": allFAQs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // Service Schemas (detailed)
  const serviceSchemas = services.map((service, index) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://raiansar.com/#service-${index}`,
    "name": service.title,
    "description": service.description,
    "provider": {
      "@id": "https://raiansar.com/#person"
    },
    "serviceType": service.title,
    "areaServed": {
      "@type": "GeoCircle",
      "name": "Worldwide"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": service.title,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": service.title
          }
        }
      ]
    }
  }));

  // WebPage Schema (for the main portfolio page)
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://raiansar.com/#webpage",
    "url": "https://raiansar.com",
    "name": "Rai Ansar - WordPress Expert & Server Specialist Portfolio",
    "description": "Professional portfolio showcasing WordPress development, WooCommerce, server management, and web security services with 6+ years of experience.",
    "isPartOf": {
      "@id": "https://raiansar.com/#website"
    },
    "about": {
      "@id": "https://raiansar.com/#person"
    },
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "url": "https://raiansar.com/images/jpg/me.jpg"
    },
    "inLanguage": "en-US",
    "potentialAction": {
      "@type": "ReadAction",
      "target": ["https://raiansar.com"]
    }
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://raiansar.com"
      }
    ]
  };

  return (
    <>
      {/* Person Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* WebSite Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />

      {/* WebPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Service Schemas */}
      {serviceSchemas.map((schema, index) => (
        <script
          key={`service-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
