const fs = require('fs');
const path = require('path');

const SITE_URL = process.env.REACT_APP_SITE_URL || 'https://snowdaycalculator.com';

const routes = [
  { url: '/', changefreq: 'daily', priority: '1.0' },
  { url: '/premium', changefreq: 'weekly', priority: '0.9' },
  { url: '/about', changefreq: 'monthly', priority: '0.7' },
  { url: '/faq', changefreq: 'weekly', priority: '0.8' },
  { url: '/how-it-works', changefreq: 'monthly', priority: '0.8' },
  { url: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { url: '/terms-of-service', changefreq: 'yearly', priority: '0.3' },
  
  // SEO-friendly route aliases
  { url: '/snow-day-calculator', changefreq: 'daily', priority: '0.9' },
  { url: '/school-closure-predictor', changefreq: 'daily', priority: '0.9' },
  { url: '/will-there-be-school-tomorrow', changefreq: 'daily', priority: '0.9' },
  { url: '/snow-day-predictor', changefreq: 'daily', priority: '0.9' },
  
  // Location pages (examples)
  { url: '/locations/new-york', changefreq: 'weekly', priority: '0.6' },
  { url: '/locations/california', changefreq: 'weekly', priority: '0.6' }
];

const generateSitemap = () => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${SITE_URL}${route.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  const buildDir = path.join(__dirname, '..', 'build');
  const sitemapPath = path.join(buildDir, 'sitemap.xml');
  
  // Ensure build directory exists
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
  }
  
  fs.writeFileSync(sitemapPath, sitemap);
  console.log(`Sitemap generated successfully at ${sitemapPath}`);
  
  // Also generate robots.txt if it doesn't exist
  const robotsPath = path.join(buildDir, 'robots.txt');
  const robotsContent = `User-agent: *
Allow: /

# Important pages for crawling
Allow: /
Allow: /premium
Allow: /about
Allow: /faq
Allow: /how-it-works
Allow: /locations/*

# Prevent crawling of admin areas
Disallow: /admin/
Disallow: /api/
Disallow: /private/

# Sitemap location
Sitemap: ${SITE_URL}/sitemap.xml

# Crawl delay (optional, helps with server load)
Crawl-delay: 1`;

  fs.writeFileSync(robotsPath, robotsContent);
  console.log(`Robots.txt generated successfully at ${robotsPath}`);
};

generateSitemap();
