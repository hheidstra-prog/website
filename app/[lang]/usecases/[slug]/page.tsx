import { sanityClient } from "@/app/lib/sanityClient";
import { fetchPageWithSectionsQuery, fetchSingleUseCaseQuery } from "@/app/lib/queries";
import { PageData, UseCase } from "@/app/lib/types";
import { Container } from "@/app/components/layout/Container";
import { RenderSection } from "@/app/components/rendering/renderSection";

interface SectionProps {
  lang: string; 
  slug: string; // Slug comes from the dynamic route
}

export default async function ScheduleCall({ params }: { params: Promise<SectionProps> }) {
  const { lang, slug } = await params; // Extract lang & slug

  // Fetch the Page Content (Server-Side)
  const page: PageData | null = await sanityClient.fetch(fetchPageWithSectionsQuery, {
    language: lang,
    slug: `schedulecall-${lang}`,
  });

  if (!page) {
    return <div className="text-center py-20">Schedule Call page not found!</div>;
  }

  // Fetch the Use Case using the Slug
  const useCase: UseCase | null = await sanityClient.fetch(fetchSingleUseCaseQuery, { slug });

  console.log("Schedule Call page lang", lang);


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

      {/* Render Page Sections */}
      <div>
        {page.sections.map((section, index) => (
          <div key={section._type + index} className="py-2">
            <RenderSection section={section} lang={lang} allUseCases={[]}  useCase={useCase} />
          </div>
        ))}
      </div>
    </div>
  );
}
