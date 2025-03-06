import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";
import { NextRequest, NextResponse } from "next/server";
import { cookieName, i18nConfig } from '@/app/lib/i18nConfig'

const { locales, defaultLocale } = i18nConfig;

// Get the preferred locale
function getLocale(request: NextRequest): string {
  // ✅ Only use Accept-Language if NO cookie is set
  const acceptLang = request.headers.get("Accept-Language");
  if (!acceptLang) return defaultLocale;

  const headers = { "accept-language": acceptLang };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ Exclude static assets from middleware (fixes favicon.ico issue)
  if (
    pathname.startsWith("/_next") || // Next.js internals
    pathname.startsWith("/favicon.ico") || // Favicon
    pathname.startsWith("/favicon-64x64.png") || // Apple Touch Icon
    pathname.startsWith("/robots.txt") || // SEO files
    pathname.startsWith("/sitemap.xml") || // Sitemap
    pathname.startsWith("/static") || // Other static assets
    pathname.startsWith("/public") // Ensure public folder access
  ) {
    return NextResponse.next(); // Skip middleware
  }

  // Check if the path already contains a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Determine the preferred locale and redirect if necessary
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  const response = NextResponse.redirect(request.nextUrl);

  // Set the locale in a cookie
  response.cookies.set(cookieName, locale);
  return response;
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|robots.txt|sitemap.xml|static|public).*)", // Exclude static assets
  ],
};
