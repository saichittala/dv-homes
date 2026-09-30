const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'content', 'blogs.json');
const SITEMAP_PATH = path.join(__dirname, '..', 'public', 'sitemap.xml');

const BASE_URL = 'https://dvhomes.in';

async function syncBlogsFromGAS() {
  const blogsUrl = process.env.GOOGLE_SCRIPT_BLOGS_URL;
  if (!blogsUrl) {
    console.log("GOOGLE_SCRIPT_BLOGS_URL is not set. Using local blogs.json.");
    return;
  }
  
  console.log(`Syncing blogs from Google Sheets: ${blogsUrl}...`);
  try {
    const response = await fetch(blogsUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const blogsList = Array.isArray(data) ? data : (data.blogs || data.data || null);
    
    if (Array.isArray(blogsList)) {
      fs.writeFileSync(DB_PATH, JSON.stringify(blogsList, null, 2), "utf8");
      console.log(`Successfully synced ${blogsList.length} blogs from Google Sheets`);
    }
  } catch (error) {
    console.error("Failed to sync blogs from Google Sheets during build:", error);
  }
}

function generate() {
  let blogs = [];
  if (fs.existsSync(DB_PATH)) {
    try {
      blogs = JSON.parse(fs.readFileSync(DB_PATH, 'utf8') || '[]');
    } catch (e) {
      console.error("Error reading blogs:", e);
    }
  }

  const published = blogs.filter(b => b.status === 'Published' || !b.status);
  const dateStr = new Date().toISOString().split('T')[0];

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/services', priority: '0.9', changefreq: 'weekly' },
    { url: '/locations', priority: '0.9', changefreq: 'weekly' },
    { url: '/projects', priority: '0.8', changefreq: 'weekly' },
    { url: '/blog', priority: '0.8', changefreq: 'daily' },
    { url: '/contact', priority: '0.8', changefreq: 'monthly' },
  ];

  const services = [
    "home-interior-design",
    "luxury-interior-design",
    "apartment-interiors",
    "villa-interiors",
    "modular-kitchens",
    "wardrobe-design",
    "turnkey-interiors",
    "bedrooms",
    "kitchens",
    "living-rooms",
    "dining-rooms",
    "puja",
    "partitions",
    "study-rooms",
    "office-spaces"
  ];

  const locations = [
    "madhapur",
    "gachibowli",
    "kondapur",
    "jubilee-hills",
    "banjara-hills",
    "kokapet",
    "nanakramguda",
    "manikonda",
    "financial-district",
    "hitec-city",
    "narsingi",
    "secunderabad",
    "kompally",
    "attapur",
    "mehdipatnam"
  ];

  const projects = [
    "kokapet-gated-villa-interior",
    "financial-district-3bhk-apartment",
    "jubilee-hills-luxury-residence",
    "gachibowli-modular-kitchen-suite",
    "madhapur-minimalist-master-suite"
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Static Pages
  staticPages.forEach(page => {
    xml += `
  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${dateStr}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  // Services Pages
  services.forEach(srv => {
    xml += `
  <url>
    <loc>${BASE_URL}/services/${srv}</loc>
    <lastmod>${dateStr}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>`;
  });

  // Location Pages
  locations.forEach(loc => {
    xml += `
  <url>
    <loc>${BASE_URL}/locations/${loc}</loc>
    <lastmod>${dateStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`;
  });

  // Project Pages
  projects.forEach(proj => {
    xml += `
  <url>
    <loc>${BASE_URL}/projects/${proj}</loc>
    <lastmod>${dateStr}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>`;
  });

  // Blog Posts
  published.forEach(post => {
    xml += `
  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${post.updatedDate || post.publishedDate || dateStr}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>`;
  });

  xml += '\n</urlset>';

  fs.writeFileSync(SITEMAP_PATH, xml, 'utf8');
  console.log(`Generated sitemap with ${staticPages.length + services.length + locations.length + projects.length + published.length} URLs at ${SITEMAP_PATH}`);

  const PUBLIC_BLOGS_PATH = path.join(__dirname, '..', 'public', 'blogs.json');
  if (fs.existsSync(DB_PATH)) {
    fs.copyFileSync(DB_PATH, PUBLIC_BLOGS_PATH);
    console.log(`Copied blogs.json to ${PUBLIC_BLOGS_PATH}`);
  }
}

async function run() {
  await syncBlogsFromGAS();
  generate();
}

run();
