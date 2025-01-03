import { type Metadata } from 'next'
import { Providers } from '@/app/providers'
import '@/styles/tailwind.css'
import { Layout } from './components/Layout'
import "./globals.css";

export const metadata: Metadata = {
    title: {
      template: '%s - Digitaal Fabriek',
      default:
        'Digitaal Fabriek - Kunstmatige Intelligentie voor het MKB',
    },
    description:
      'Digitaal Fabriek - Kunstmatige Intelligentie voor het MKB.',
    alternates: {
      types: {
        'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
      },
    },
    icons: {
      icon: '/favicon.ico'
    }
}

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en" className="h-full antialiased" suppressHydrationWarning>
        <body className="flex h-full bg-zinc-50 dark:bg-black">
          <Providers>
            <div className="flex w-full">
              <Layout>{children}</Layout>
            </div>
          </Providers>
        </body>
      </html>
    )
}
