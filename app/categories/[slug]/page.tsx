
import { postsByCategoryQuery } from "@/app/lib/queries";
import { sanityClient } from "@/app/lib/sanityClient";
import { Category, Post } from "@/app/lib/types";
import Link from "next/link";

type Params = {
  params: Promise<{ slug: string }>;
};

async function getCategoryBySlug(slug: string): Promise<Category | null> {
  
  const query = `
    *[_type == "category" && slug.current == $slug][0] {
      _id
    }
  `;
  const category = await sanityClient.fetch(query, { slug });
  return category;
}

// Add generateMetadata directly to the page
export async function generateMetadata({ params }: Params) {

  const { slug } = await params; // Await params here
  const cat = await getCategoryBySlug(slug);
  const categoryId = cat?._id;

  if (!categoryId) {
    return {
      title: "Category not found",
      description: "The requested category does not exist.",
    };
  }

  return {
    title: `Posts in ${slug}`,
    description: `Explore posts in the ${slug} category.`,
    openGraph: {
      title: `Posts in ${slug}`,
      description: `Explore posts in the ${slug} category.`,
      url: `/categories/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: Params) {

  const { slug } = await params; // Await params here
  const cat = await getCategoryBySlug(slug);
  const categoryId = cat?._id;

  if (!categoryId) {
    return <div className="text-center text-gray-500">Category not found!</div>;
  }

  const posts: Post[] = await sanityClient.fetch(postsByCategoryQuery, { categoryId });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Posts in {slug}</h1>
      <ul className="space-y-4">
        {posts.map((post: Post) => (
          <li key={post._id} className="p-4 bg-white shadow-lg rounded-lg">
            <Link href={`/posts/${post.slug.current}`}>
              <div className="cursor-pointer">
                <h2 className="text-2xl font-semibold text-blue-600 hover:underline">
                  {post.title}
                </h2>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {

  const categories = await sanityClient.fetch(`
    *[_type == "category"] {
      "slug": slug.current
    }
  `);

  return categories.map((category: { slug: string }) => ({
    slug: category.slug,
  }));
}