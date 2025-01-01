import { PortableText } from "@portabletext/react";
import { sanityClient, urlFor } from "../../lib/sanityClient";
import Image from "next/image";
import { Category, Post, SanityImage } from "@/app/lib/types";

type Params = {
  params: Promise<{ slug: string }>; // Ensure the type accounts for Promise
};

// Function to fetch a single post by slug
async function getPostBySlug(slug: string): Promise<Post | null> {
  const query = `
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      body,
      mainImage {
        asset -> {
          url
        },
        alt
      },
      metaTitle,
      metaDescription,
      author -> {
        name,
        image {
          asset -> {
            url
          }
        }
      },
      categories[] -> {
        _id,
        title,
        slug
      },
      "slug": slug      
    }
  `;
  return sanityClient.fetch(query, { slug });
}

export async function generateMetadata({ params }: Params) {

  const { slug } = await params; // Await params here
  const post = await getPostBySlug(slug);

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



export default async function PostPage({ params }: Params) {

  const { slug } = await params; // Await params here
  const post = await getPostBySlug(slug);

  if (!post) {
    return <div className="text-center text-gray-500">Post not found!</div>;
  }

  return (
    <div>
      <article key={post._id} className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800">{post.title}</h1>

        {/* Main Image */}
        {post.mainImage?.asset?.url && (
          <div className="my-6">
            <Image
              src={post.mainImage.asset.url}
              alt={post.mainImage.alt || "Main image"}
              width={800}
              height={400}
              className="rounded-lg"
              priority
            />
          </div>
        )}

        {/* Author */}
        {post.author && (
          <div className="flex items-center mt-4">
            {post.author.image?.asset?.url && (
              <Image
                src={post.author.image.asset.url}
                alt={post.author.name}
                width={50}
                height={50}
                className="rounded-full"
                priority
              />
            )}
            <p className="ml-4 text-gray-700">By {post.author.name}</p>
          </div>
        )}

        {/* Categories */}
        {Array.isArray(post.categories) && post.categories.length > 0 && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-600">Categories:</h4>
            <ul>
              {post.categories.map((category: Category) => (
                <li key={category._id}>
                  <a href={`/categories/${category.slug}`} className="text-blue-600 hover:underline">
                    {category.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Body */}
        <div className="mt-8">
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
              block: {
                normal: ({ children }) => (
                  <p className="text-gray-800 text-base leading-relaxed">{children}</p>
                ),
                blockquote: ({ children }) => (
                  <blockquote>
                    {children}
                  </blockquote>
                ),
              },
              list: {
                bullet: ({ children }) => (
                  <ul className="list-disc list-inside text-gray-800">{children}</ul>
                ),
                number: ({ children }) => (
                  <ol className="list-decimal list-inside text-gray-800">{children}</ol>
                ),
              },
              listItem: {
                bullet: ({ children }) => (
                  <li className="ml-4">{children}</li>
                ),
                number: ({ children }) => (
                  <li className="ml-4">{children}</li>
                ),
              },
            }}
            
          />
        </div>

        {/* Slug */}
        <p className="mt-8 italic">Slug: {post.slug.current}</p>
      </article>
    </div>
  );
}

// Generate static params for dynamic routes
export async function generateStaticParams() {
  const query = `*[_type == "post"] { "slug": slug.current }`;
  const posts: { slug: string }[] = await sanityClient.fetch(query);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}