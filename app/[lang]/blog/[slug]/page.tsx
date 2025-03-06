import Image from "next/image";
import { sanityClient } from "@/app/lib/sanityClient";
import { fetchPostWithGlobalSectionsQuery } from "@/app/lib/queries";
import SanityContent from "@/app/components/sanity/sanityContent";
import { PortableTextBlock } from "next-sanity";
import { Container } from "@/app/components/layout/Container";
import { Post, Section, TableOfContentsSectionType } from "@/app/lib/types";
import Breadcrumbs from "@/app/components/breadcrumb/breadcrumb";
import { Heading, RenderSideSection } from "@/app/components/rendering/renderSideSection";
import { RenderSection } from "@/app/components/rendering/renderSection";


interface PostPageProps {
    lang: string;
    slug: string;
}

// Extract headings from PortableText body based on user settings
const extractHeadings = (body: PortableTextBlock[], includedHeadings: string[]): Heading[] => {
  return body
    .filter((block) => block.style && includedHeadings.includes(block.style)) // Filter based on user selection
    .map((block) => ({
      text: block.children?.[0]?.text || "",
      id: block.children?.[0]?.text.toLowerCase().replace(/\s+/g, "-"),
      level: block.style === "h1" ? 1 : block.style === "h2" ? 2 : 3,
    }));
};

// Generate metadata for SEO
export async function generateMetadata({ params }: {params: Promise<PostPageProps> }) {
  const { lang, slug } = await params;
  const { post } = await sanityClient.fetch<{ post: Post }>(fetchPostWithGlobalSectionsQuery, { slug, language: lang });

  return {
    title: post?.metaTitle || "Blog Post",
    description: post?.metaDescription || "Read this blog post.",
  };
}

// Post Page Component
export default async function PostPage({ params }: {params: Promise<PostPageProps> }) {

  const { lang, slug } = await params;

  const data = await sanityClient.fetch<{ post: Post; sideSections: Section[]; bottomSections: Section[] }>(
    fetchPostWithGlobalSectionsQuery,
    { slug, language: lang }
  );

  if (!data?.post) {
    return <div className="text-center py-20">Post not found!</div>;
  }

  const { post } = data;

  const sideSections: Section[] = post.sideSections ?? [];
  const bottomSections: Section[] = post.bottomSections ?? [];

  // Get Table of Contents settings from sideSections
  const tableOfContents = sideSections.find(
    (section) => section._type === "tableOfContentsSection"
  ) as TableOfContentsSectionType | undefined;

  // Ensure default values if not defined
  const includedHeadings = tableOfContents?.includedHeadings ?? ["h2", "h3"]; // Default to h2 & h3

  const headings: Heading[] = post.body
  ? extractHeadings(post.body as PortableTextBlock[], includedHeadings)
  : [];


  const breadcrumbs = [
    { label: lang === "nl" ? "Blog" : "Blog", href: "/blog" },
    ...(post.categories?.length
      ? [{ label: post.categories[0].title, href: `/blog/category/${post.categories[0].slug}` }]
      : []),
    { label: post.slug.current, href: `/blog/${post.slug.current}`, active: true },
  ];

  return (
    <Container className="mx-auto px-4 py-10">
      <Breadcrumbs breadcrumbs={breadcrumbs} lang={lang} />

      {/* Top Section with Title & Image */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
        <div className="md:col-span-3 mt-16">
          <header>
            <time className="block text-sm text-gray-500 mb-2">
              {new Date(post._createdAt).toLocaleDateString(lang, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
            <p className="text-lg text-gray-600">{post.subtitle}</p>
            {post.author && (
              <div className="flex items-center mt-4">
                {post.author.image?.asset?.url && (
                  <Image
                    src={post.author.image.asset.url}
                    alt={post.author.image.alt || "Author"}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <p className="ml-3 text-sm text-gray-700">{post.author.name || "Unknown Author"}</p>
              </div>
            )}
          </header>
        </div>

        {post.mainImage && (
          <div className="md:col-span-2 flex justify-center">
            <Image
              src={post.mainImage.asset.url}
              alt={post.title}
              width={400}
              height={250}
              placeholder="blur"
              blurDataURL={post.mainImage.asset.url}
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Main Content & Sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <section className="prose lg:prose-lg">
            <SanityContent body={post.body as PortableTextBlock[]} />
          </section>
        </div>

        {/* Sidebar (Side Sections) */}
        <aside className="hidden md:block md:col-span-1 space-y-6 sticky top-20 self-start">
          {sideSections?.map((section: Section, index) => (
            <RenderSideSection key={section._key+index} section={section} lang={lang} url={`/blog/${post.slug.current}`} headings={headings} />
          ))} 
        </aside>
      </div>

      {/* Bottom Sections */}
      <div className="mt-10 space-y-10">
        {bottomSections?.map((section: Section, index) => (
            <RenderSection key={section._key+index} section={section} lang={lang} allUseCases={[]} />
          ))}
      </div>
    </Container>

  );
}
