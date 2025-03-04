import Image from "next/image";
import Link from "next/link";
import { Post } from "@/app/lib/types";

interface PostCardProps {
  post: Post;
  lang: string;
}

export default function PostCard({ post, lang }: PostCardProps) {
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-transform hover:-translate-y-1">
      <Link href={`/${lang}/blog/${post.slug.current}`} className="block">
        {post.mainImage && (
          <div className="w-full">
            <Image
              src={post.mainImage.asset.url}
              alt={post.title}
              width={600} // Adjust width dynamically if needed
              height={400} // Adjust height dynamically if needed
              placeholder="blur"
              blurDataURL={post.mainImage.asset.url}
              className="w-full h-auto object-cover aspect-[16/9]" // Maintain aspect ratio
            />
          </div>
        )}
        <div className="p-5">
          <h2 className="text-lg font-semibold">{post.title}</h2>
          <p className="text-sm text-gray-600 mt-2">{post.excerpt || post.excerptAuto}</p>
          <time className="block mt-3 text-xs text-gray-400">
            {new Date(post._createdAt).toLocaleDateString(lang, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
      </Link>
    </article>
  );
}
