import { Container } from "@/app/components/Container";
import { Prose } from "@/app/components/Prose";
import { fetchPostBySlug } from "@/app/lib/queries";
import { sanityClient, urlFor } from "@/app/lib/sanityClient";
import { Post, SanityImage } from "@/app/lib/types";
import { formatDate } from "@/app/lib/utils";
import { PortableText } from "next-sanity";
import Image from "next/image";

type Params = {
    params: Promise<{ slug: string }>; // Ensure the type accounts for Promise
  };

// Function to fetch a single post by slug
async function getPostBySlug(slug: string): Promise<Post | null> {
  return sanityClient.fetch(fetchPostBySlug, { slug });
}

export async function generateMetadata({ params }: Params) {

  const { slug } = await params; // Await params here
  const post = await getPostBySlug(slug);
  console.log("Post " +post);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || "Read this post for more insights.",
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || "Read this post for more insights.",
      images: [
        {
          url: post.mainImage?.asset?.url || "",
          width: 800,
          height: 600,
        },
      ],
    },
  };
}


export default async function Page({ params }: Params) {

    const { slug } = await params; // Await params here
    const post = await getPostBySlug(slug);
  
    if (!post) {
      return <div className="text-center text-gray-500">Post not found!</div>;
    }    

    return (
        <Container className="mt-16 lg:mt-32">
            <div className="xl:relative">
            <div className="mx-auto max-w-2xl">
                <article>
                    <header className="flex flex-col">
                          {/* Main Image */}
                          {/*}
                          {post.mainImage?.asset?.url && (
                            <div className="my-6">
                              <Image
                                src={post.mainImage.asset.url}
                                alt={post.mainImage.alt || "Main image"}
                                width={800}
                                height={200}
                                className="rounded-lg"
                                priority
                              />
                            </div>
                          )}
                            */}
                        <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                            {post.title}
                        </h1>
                        <time
                            dateTime={post._createdAt}
                            className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
                        >
                        <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                        <span className="ml-3">{formatDate(post._createdAt)}</span>
                        </time>
                    </header>
                    <Prose className="mt-8" data-mdx-content>
                         {/* Body */}
                        <div className="mt-8 prose dark:prose-invert">
                            <PortableText
                                value={post.body}
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

