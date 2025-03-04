import { NextResponse } from "next/server";
import { sanityClient } from "@/app/lib/sanityClient";

const SITE_URL = process.env.SITE_URL || "https://launchminds.ai";

interface Page {
  slug: string;
  language: string;
  _updatedAt: string;
  noindex?: boolean;
}

interface Post {
  slug: string;
  language: string;
  _updatedAt: string;
}

export async function GET() {
  try {
    // Fetch all pages & posts with their `noindex` field
    const pages: Page[] = await sanityClient.fetch(`
      *[_type == "page"] {
        "slug": slug.current,
        language,
        _updatedAt,
        noindex
      }
    `);

    const posts: Post[] = await sanityClient.fetch(`
      *[_type == "post"] {
        "slug": slug.current,
        language,
        _updatedAt
      }
    `);

    // **Filter out noindex pages**
    const indexablePages = pages.filter((page) => !page.noindex);

    // Generate URLs for indexable pages
    const pageUrls = indexablePages.map((page) => `
      <url>
        <loc>${SITE_URL}/${page.language}/${page.slug}</loc>
        <lastmod>${new Date(page._updatedAt).toISOString()}</lastmod>
        <priority>0.8</priority>
        <xhtml:link rel="alternate" hreflang="${page.language}" href="${SITE_URL}/${page.language}/${page.slug}"/>
        <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/${page.language}/${page.slug}"/>
      </url>
    `);

    // Generate URLs for blog posts
    const postUrls = posts.map((post) => `
      <url>
        <loc>${SITE_URL}/${post.language}/blog/${post.slug}</loc>
        <lastmod>${new Date(post._updatedAt).toISOString()}</lastmod>
        <priority>0.8</priority>
        <xhtml:link rel="alternate" hreflang="${post.language}" href="${SITE_URL}/${post.language}/blog/${post.slug}"/>
        <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/blog/${post.slug}"/>
      </url>
    `);

    // Combine all URLs into the sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
              xmlns:xhtml="http://www.w3.org/1999/xhtml">
        ${pageUrls.join("")}
        ${postUrls.join("")}
      </urlset>
    `;

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "s-maxage=3600, stale-while-revalidate",
      },
    });

  } catch (error) {
    console.error(error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
