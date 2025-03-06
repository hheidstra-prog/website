import { type Metadata } from "next";
import { Inter } from 'next/font/google'
import clsx from 'clsx'
import "@/styles/tailwind.css";
import '@/app/globals.css'

import { i18nConfig } from "@/app/lib/i18nConfig";
import { Layout } from "../components/layout/Layout";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

/*
export const metadata: Metadata = {
  title: {
    template: "%s - Digitaal Fabriek",
    default: "Digitaal Fabriek - Kunstmatige Intelligentie voor het MKB",
  },
  description: "Digitaal Fabriek - Kunstmatige Intelligentie voor het MKB.",
  alternates: {
    types: {
      "application/rss+xml": `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};
*/

export const metadata: Metadata = {
  title: "LaunchMinds - AI Startup Accelerator",
  description: "Helping AI-driven startups launch faster with AI automation.",
  icons: {
    icon: "/favicon-64x64.png",
    shortcut: "/favicon-64x64.png", // Shortcut icon
    apple: "/favicon-64x64.png",
  },
};


type LangParams = {
  lang: typeof i18nConfig.locales[number]; // Use strong typing from i18nConfig
};

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params: paramsPromise,
}: {
  children: React.ReactNode;
  params: Promise<LangParams>;
}) {
  const { lang } = await paramsPromise; // Await params here to access lang

  return (
    <html lang={lang} className={clsx('bg-gray-50 antialiased', inter.variable)} suppressHydrationWarning>
      <body>
        <Layout lang={lang}>{children}</Layout>
      </body>
    </html>
  );
}
