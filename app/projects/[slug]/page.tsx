import { Container } from "@/app/components/Container";
import { LinkIcon } from "@/app/components/icons";
import { Prose } from "@/app/components/Prose";
import { fetchProjectBySlug } from "@/app/lib/queries";
import { sanityClient, urlFor } from "@/app/lib/sanityClient";
import { Project, SanityImage } from "@/app/lib/types";
import { formatDate } from "@/app/lib/utils";
import { PortableText } from "next-sanity";
import Image from "next/image";

type Params = {
    params: Promise<{ slug: string }>; // Ensure the type accounts for Promise
  };

// Function to fetch a single post by slug
async function getProjectBySlug(slug: string): Promise<Project> {
  return sanityClient.fetch(fetchProjectBySlug, { slug });
}

export async function generateMetadata({ params }: Params) {

  const { slug } = await params; // Await params here
  const project:Project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: project.metaTitle || project.title,
    description: project.metaDescription || "Read this post for more insights.",
    openGraph: {
      title: project.metaTitle || project.title,
      description: project.metaDescription || "Read this post for more insights.",
      images: [
        {
          url: project.mainImage?.asset?.url || "",
          width: 800,
          height: 600,
        },
      ],
    },
  };
}


export default async function Page({ params }: Params) {

    const { slug } = await params; // Await params here
    const project = await getProjectBySlug(slug);
  
    if (!project) {
      return <div className="text-center text-gray-500">Project not found!</div>;
    }    

    return (
        <Container className="mt-16 lg:mt-32">
            <div className="xl:relative">
            <div className="mx-auto max-w-2xl">
                <article>
                    <header className="flex flex-col">
                        <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                            {project.title}
                        </h1>
                        <time
                            dateTime={project.date}
                            className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
                        >
                          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                          <span className="ml-3">{formatDate(project.date)}</span>
                        </time>
                        {project.projecturl && (
                        <p className="relative z-10 mt-6 flex text-sm font-medium transition group-hover:text-teal-500 dark:text-zinc-200">
                          <LinkIcon className="h-6 w-6 flex-none" />
                          <a className="ml-2" href={project.projecturl} target="_blanc">{project.projecturl}</a>
                        </p>
                        )}
                    </header>
                    <Prose className="mt-8" data-mdx-content>
                         {/* Body */}
                        <div className="mt-8 prose dark:prose-invert">
                            <PortableText
                                value={project.body}
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

