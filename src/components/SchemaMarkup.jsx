import React from 'react';

export default function SchemaMarkup() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": "Radiance Dentistry",
    "image": "https://radiancedentistry.com/logo.png",
    "@id": "https://radiancedentistry.com",
    "url": "https://radiancedentistry.com",
    "telephone": "+918696781255",
    "email": "drruchijain30@gmail.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Shop No. 518, 5th Floor, Western Business Park, Vesu",
      "addressLocality": "Surat",
      "addressRegion": "Gujarat",
      "postalCode": "395007",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 21.1418,
      "longitude": 72.7709
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "10:00",
      "closes": "19:00"
    },
    "sameAs": [
      "https://www.facebook.com/radiancedentistry",
      "https://www.instagram.com/radiancedentistry"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
