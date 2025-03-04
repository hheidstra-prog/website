import { Container } from '@/app/components/layout/Container'
import { RenderSection } from '@/app/components/rendering/renderSection';
import { fetchPageWithSectionsQuery } from '@/app/lib/queries';
import { sanityClient } from '@/app/lib/sanityClient';
import { PageData } from '@/app/lib/types';


interface PageProps {
  lang: string;
}

export async function generateMetadata({ params }: {params: Promise<PageProps> }) {

  const { lang } = await params; // Await params here

  const page: PageData | null = await sanityClient.fetch(fetchPageWithSectionsQuery, {
    language: lang,
    slug: "thankyou-newsletter-"+lang,
  });

  if (!page) {
    return {
      title: "Page Not Found",
      description: "The requested home page could not be found.",
    };
  }

  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription || "",

  };
}

export default async function ThankYou({ params }: {params: Promise<PageProps> }) {

  const { lang } = await params;

  // Fetch the page content
  const page: PageData | null = await sanityClient.fetch(fetchPageWithSectionsQuery, {
    language: lang,
    slug: "thankyou-newsletter-"+lang,
  });

  if (!page) {
    return <div className="text-center py-20">Page not found!</div>;
  }

  return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 pt-20">
          <header className="mb-8">
            <Container>
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
                <p className="text-2xl font-medium tracking-tight text-[#06b6d4] mb-4">
                  {page.title}
                </p>
              </div>
            </Container>
          </header>
          <div>
            {page.sections.map((section, index) => (
              <div key={section._type+index} className="py-2">
                <RenderSection section={section} lang={lang} allUseCases={[]}  />
              </div>
            ))}
          </div>
        </div>
      )
    }
