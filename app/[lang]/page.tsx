import { i18nConfig } from "@/app/lib/i18nConfig";
import { sanityClient } from "../lib/sanityClient";
import { fetchAllUseCasesQuery, fetchPageWithSectionsQuery } from "../lib/queries";
import {  PageData, UseCase } from "../lib/types";
import { RenderSection } from "../components/rendering/renderSection";
//import { renderSection } from "../components/rendering/renderSection";
//import language from "react-syntax-highlighter/dist/esm/languages/hljs/1c";


type Params = {
  lang: typeof i18nConfig.locales[number]; // Use indexed access type to infer locale type
};

export async function generateMetadata({ params }: { params: Promise<Params> }) {

  const { lang } = await params; // Await params here

  const page: PageData | null = await sanityClient.fetch(fetchPageWithSectionsQuery, {
    language: lang,
    slug: "home-"+lang,
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

// Fetch articles for LatestArticlesSection dynamically

export default async function Home({ params }: { params: Promise<Params> }) {
  const { lang } = await params; // Await params here

  const page: PageData | null = await sanityClient.fetch(fetchPageWithSectionsQuery, {
    language: lang,
    slug: "home-"+lang,
  });

  if (!page) {
    return <div className="text-center py-20">Page not found!</div>;
  }  

  const allUseCases: UseCase[] = await sanityClient.fetch(fetchAllUseCasesQuery, {
    language: lang,
  });

  //console.log("All use cases " + JSON.stringify(allUseCases));  

  return (

    <div className="bg-gradient-to-b from-white to-gray-100">

      {page.sections.map((section) => (
        <div key={section._type}>
          <RenderSection section={section} lang={lang} allUseCases={allUseCases} />
        </div>
      ))}

    </div>

  );
}
