import { NextResponse } from 'next/server';
import { sanityClient } from '@/app/lib/sanityClient';

export async function GET() {
  const siteUrl = process.env.SITE_URL || 'https://digitaalfabriek.nl';

  // Fetch posts, projects, and technologies from Sanity
  const posts = await sanityClient.fetch(`
    *[_type == "post"] {
      "slug": slug.current,
      _updatedAt
    }
  `);

  const projects = await sanityClient.fetch(`
    *[_type == "project"] {
      "slug": slug.current,
      _updatedAt
    }
  `);

  const technologies = await sanityClient.fetch(`
    *[_type == "technology"] {
      "slug": slug.current,
      _updatedAt
    }
  `);

  // Build URLs for each route
  const postUrls = posts.map(
    (post: { slug: string; _updatedAt: string }) => `
      <url>
        <loc>${siteUrl}/articles/${post.slug}</loc>
        <lastmod>${new Date(post._updatedAt).toISOString()}</lastmod>
        <priority>0.8</priority>
      </url>
    `
  );

  const projectUrls = projects.map(
    (project: { slug: string; _updatedAt: string }) => `
      <url>
        <loc>${siteUrl}/projects/${project.slug}</loc>
        <lastmod>${new Date(project._updatedAt).toISOString()}</lastmod>
        <priority>0.7</priority>
      </url>
    `
  );

  const technologyUrls = technologies.map(
    (tech: { slug: string; _updatedAt: string }) => `
      <url>
        <loc>${siteUrl}/technologies/${tech.slug}</loc>
        <lastmod>${new Date(tech._updatedAt).toISOString()}</lastmod>
        <priority>0.7</priority>
      </url>
    `
  );

  // Add static pages
  const staticUrls = [
    '/',
    '/about',
    '/contact',
    '/projects',
    '/articles',
    '/technologies',
  ].map(
    (path) => `
      <url>
        <loc>${siteUrl}${path}</loc>
        <priority>0.7</priority>
      </url>
    `
  );

  // Combine all URLs
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticUrls.join('')}
      ${postUrls.join('')}
      ${projectUrls.join('')}
      ${technologyUrls.join('')}
    </urlset>
  `;

  // Return the sitemap as XML
  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
