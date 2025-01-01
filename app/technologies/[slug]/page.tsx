import { Container } from "@/app/components/Container";
import { LinkIcon } from "@/app/components/icons";
import { Prose } from "@/app/components/Prose";
import { fetchTechnologyBySlug } from "@/app/lib/queries";
import { sanityClient, urlFor } from "@/app/lib/sanityClient";
import { SanityImage, Technology } from "@/app/lib/types";
import { PortableText } from "next-sanity";
import Image from "next/image";

type Params = {
    params: Promise<{ slug: string }>; // Ensure the type accounts for Promise
  };

// Function to fetch a single post by slug
async function getTechnologyBySlug(slug: string): Promise<Technology> {
  return sanityClient.fetch(fetchTechnologyBySlug, { slug });
}

export async function generateMetadata({ params }: Params) {

  const { slug } = await params; // Await params here
  const technology:Technology = await getTechnologyBySlug(slug);

  if (!technology) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: technology.metaTitle || technology.title,
    description: technology.metaDescription || "Read this post for more insights.",
    openGraph: {
      title: technology.metaTitle || technology.title,
      description: technology.metaDescription || "Read this post for more insights.",
      images: [
        {
          url: technology.logo?.asset?.url || "",
          width: 800,
          height: 600,
        },
      ],
    },
  };
}


export default async function Page({ params }: Params) {

    const { slug } = await params; // Await params here
    const technology:Technology = await getTechnologyBySlug(slug);
    //console.log("Tech " +JSON.stringify(technology));
  
    if (!technology) {
      return <div className="text-center text-gray-500">Technology not found!</div>;
    }    

    return (
        <Container className="mt-16 lg:mt-32">
            <div className="xl:relative">
            <div className="mx-auto max-w-2xl">
                <article>
                    <header className="flex flex-col">
                        {/* Main Image */}
                        {technology.logo?.asset?.url && (
                            <div className="my-6 rounded-full">
                              <Image
                                src={technology.logo.asset.url}
                                alt={technology.logo.alt || "Main image"}
                                width={200}
                                height={200}
                                className="rounded-full"
                                priority
                              />
                            </div>
                        )}                        
                        <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                            {technology.title}
                        </h1>

                     
                        {technology.website && (
                        <p className="relative z-10 mt-6 flex text-sm font-medium transition group-hover:text-teal-500 dark:text-zinc-200">
                          <LinkIcon className="h-6 w-6 flex-none" />
                          <a className="ml-2" href={technology.website} target="_blanc">{technology.website}</a>
                        </p>
                        )}
                    </header>
                    <Prose className="mt-8" data-mdx-content>
                         {/* Body */}
                        <div className="mt-8 prose dark:prose-invert">
                            <PortableText
                                value={technology.body}
                                components={{
                                types: {
                                    image: ({ value }: { value: SanityImage }) => (
                                        <div>
                                        <Image
                                            src={urlFor(value).width(800).url()}
                                            alt={value.alt || "Image"}
                                            className="rounded-lg"
                                            width={800}
                                            height={400}
                                            priority
                                        />
                                        </div>
                                    ),
                                },
                            }}
                            />
                        </div>
                    </Prose>
                </article>
            </div>
            </div>
        </Container>
    )
}

