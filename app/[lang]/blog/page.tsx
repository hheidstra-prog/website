import { PageData } from "@/app/lib/types";
import { sanityClient } from "@/app/lib/sanityClient";
import { fetchPageWithSectionsQuery } from "@/app/lib/queries";
import { Container } from "@/app/components/layout/Container";
import { RenderSection } from "@/app/components/rendering/renderSection";


export async function generateMetadata({ params: params }: { params: Promise<{ lang: string }> }) {

  const { lang } = await params; // Await params here

  const page: PageData | null = await sanityClient.fetch(fetchPageWithSectionsQuery, {
    language: lang,
    slug: "posts-"+lang,
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

export default async function Posts({ params: params }: { params: Promise<{ lang: string }> }) {

  const { lang } = await params; // Await params here
  // Fetch the page content

  const page: PageData | null = await sanityClient.fetch(fetchPageWithSectionsQuery, {
    language: lang,
    slug: "posts-"+lang,
  });

  if (!page) {
    return <div className="text-center py-20">Page not found!</div>;
  }

  return (

    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 pt-20">
      
        {/* Page Content */}
        <header className="mb-8">
          <Container>
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
              <p className="text-2xl font-medium tracking-tight text-[#06b6d4] mb-4">
                {page.title}
              </p>
            </div>
          </Container>          
        </header>
        <section>
        <div>
          {page.sections.map((section, index) => (
            <div key={section._key+index} className="py-2">
              <RenderSection section={section} lang={lang} allUseCases={[]} useCase={null} />
            </div>
          ))}
        </div>   
        </section>
    </div>
  );
}
