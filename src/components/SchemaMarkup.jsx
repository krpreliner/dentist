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
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Premium Dental Care Center",
      "addressLocality": "Jaipur",
      "postalCode": "302001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 26.9124,
      "longitude": 75.7873
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
      "opens": "09:00",
      "closes": "20:00"
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
