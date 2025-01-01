
import Link from "next/link";
import { paginatedPostsQuery } from "../lib/queries";
import { sanityClient } from "../lib/sanityClient";
import { Post } from "../lib/types";

const POSTS_PER_PAGE = 5;

type Props = {
    searchParams?: Promise<{
      page?: string;
    }>;
  };

export default async function PostsListPage({ searchParams }: Props) {

    const params =  await searchParams || {}; // Default to an empty object if undefined
    const page = parseInt(params.page || "1", 10); // Default to page 1
    const start = (page - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;

    const posts = await sanityClient.fetch(paginatedPostsQuery, { start, end });

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Blog Posts</h1>
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
            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-6">
                {page > 1 && (
                <Link href={`/posts?page=${page - 1}`}>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Previous
                    </button>
                </Link>
                )}
                <Link href={`/posts?page=${page + 1}`}>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Next
                    </button>
                </Link>
            </div>

        </div>
    );
}
