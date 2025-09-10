const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://snowdaycaclulations.vercel.app';

const routes = [
  // Core pages
  { url: '/', changefreq: 'daily', priority: '1.0' },
  { url: '/premium', changefreq: 'weekly', priority: '0.9' },
  { url: '/faq', changefreq: 'monthly', priority: '0.8' },
  { url: '/about', changefreq: 'monthly', priority: '0.7' },
  { url: '/how-it-works', changefreq: 'monthly', priority: '0.7' },
  { url: '/pricing', changefreq: 'weekly', priority: '0.6' },
  
  // Major cities - great for local SEO
  { url: '/location/new-york', changefreq: 'weekly', priority: '0.6' },
  { url: '/location/chicago', changefreq: 'weekly', priority: '0.6' },
  { url: '/location/boston', changefreq: 'weekly', priority: '0.6' },
  { url: '/location/denver', changefreq: 'weekly', priority: '0.6' },
  { url: '/location/seattle', changefreq: 'weekly', priority: '0.6' },
  { url: '/location/minneapolis', changefreq: 'weekly', priority: '0.6' },
  { url: '/location/buffalo', changefreq: 'weekly', priority: '0.6' },
  { url: '/location/cleveland', changefreq: 'weekly', priority: '0.6' },
  { url: '/location/detroit', changefreq: 'weekly', priority: '0.6' },
  { url: '/location/portland', changefreq: 'weekly', priority: '0.6' },
  { url: '/location/philadelphia', changefreq: 'weekly', priority: '0.6' },
  { url: '/location/pittsburgh', changefreq: 'weekly', priority: '0.6' },
  { url: '/location/milwaukee', changefreq: 'weekly', priority: '0.6' },
  
  // State pages for regional SEO
  { url: '/state/new-york', changefreq: 'weekly', priority: '0.5' },
  { url: '/state/california', changefreq: 'weekly', priority: '0.5' },
  { url: '/state/michigan', changefreq: 'weekly', priority: '0.5' },
  { url: '/state/ohio', changefreq: 'weekly', priority: '0.5' },
  { url: '/state/pennsylvania', changefreq: 'weekly', priority: '0.5' },
  { url: '/state/illinois', changefreq: 'weekly', priority: '0.5' },
  { url: '/state/wisconsin', changefreq: 'weekly', priority: '0.5' },
  { url: '/state/minnesota', changefreq: 'weekly', priority: '0.5' },
  { url: '/state/colorado', changefreq: 'weekly', priority: '0.5' },
  { url: '/state/washington', changefreq: 'weekly', priority: '0.5' },
  
  // Utility pages
  { url: '/contact', changefreq: 'monthly', priority: '0.4' },
  { url: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { url: '/terms', changefreq: 'yearly', priority: '0.3' },
  
  // Blog pages for content marketing
  { url: '/blog', changefreq: 'weekly', priority: '0.6' },
  { url: '/blog/how-schools-decide-snow-days', changefreq: 'monthly', priority: '0.5' },
  { url: '/blog/winter-weather-safety-tips', changefreq: 'monthly', priority: '0.5' },
  { url: '/blog/snow-day-prediction-science', changefreq: 'monthly', priority: '0.5' }
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

  const publicDir = path.join(__dirname, '..', 'public');
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  
  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  
  fs.writeFileSync(sitemapPath, sitemap);
  console.log(`Sitemap generated successfully at ${sitemapPath}`);
  
  // Also generate robots.txt if it doesn't exist
  const robotsPath = path.join(publicDir, 'robots.txt');
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
