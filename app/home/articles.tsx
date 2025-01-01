// app/last10posts/page.tsx
import { sanityClient } from "@/app/lib/sanityClient";
import { fetchLast10PostsQuery } from "@/app/lib/queries";
import { Post } from "@/app/lib/types";
import { Card } from "../components/Card";
import { formatDate } from "../lib/utils";
import { extractText } from "../lib/utils";



export default async function LatestArticles() {
  // Fetch the latest posts on the server
  const posts: Post[] = await sanityClient.fetch(fetchLast10PostsQuery);

  return (

    <div className="flex overflow-x-auto gap-6 pb-4 hide-vertical-scroll w-full">

        {posts.map((post) => (

          <Card key={post._id} as="article" className="min-w-[300px] max-w-[300px] flex-shrink-0 p-4 mt-2 bg-slate-100 dark:bg-black hover:shadow hover:shadow-[#14b8a6]
             hover:bg-slate-100 dark:hover:bg-gray-900 rounded-2xl">
            <Card.Title href={`/articles/${post.slug.current}`}>
                {post.title}
            </Card.Title>
            <Card.Eyebrow as="time" dateTime={post._createdAt} decorate>
                {formatDate(post._createdAt)}
            </Card.Eyebrow>
            <Card.Description>
              {extractText(post.body)}...
            </Card.Description>
            <Card.Cta>Read article</Card.Cta>
          </Card>

        ))}


    </div>
  );
}

