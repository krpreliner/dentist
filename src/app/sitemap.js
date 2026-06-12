export default function sitemap() {
  const baseUrl = 'https://radiancedentistry.com';
  
  const services = [
    'root-canal-treatment',
    'dental-implants',
    'teeth-whitening',
    'smile-makeover',
    'braces-aligners',
    'pediatric-dentistry',
    'tooth-extraction',
    'dental-crowns-bridges',
    'gum-treatment',
    'scaling-polishing',
    'cosmetic-dentistry',
    'emergency-dental-care'
  ];

  const serviceUrls = services.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'yearly', priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/gallery`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.9 },
    ...serviceUrls,
  ];
}
