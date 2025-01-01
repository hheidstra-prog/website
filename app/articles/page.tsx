import { type Metadata } from 'next'
import { SimpleLayout } from '../components/SimpleLayout'
import { sanityClient } from "@/app/lib/sanityClient";
import { fetchLast10PostsQuery } from "@/app/lib/queries";
import { Post } from "@/app/lib/types";
import { Card } from "../components/Card";
import { formatDate } from "../lib/utils";
import { extractText } from '../lib/utils';


export const metadata: Metadata = {
  title: 'Articles',
  description:
    'All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order.',
}


export default async function ArticlesIndex() {
  // Fetch the latest posts on the server

  const posts: Post[] = await sanityClient.fetch(fetchLast10PostsQuery);

  return (

      <SimpleLayout
        title="Writing on software design, company building, and the aerospace industry."
        intro="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
      >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">

          {posts.map((post) => (

            <article key={post._id} className="md:grid md:grid-cols-4 md:items-baseline">
              
              <Card className="md:col-span-3 flex-shrink-0 p-4 mt-2 bg-slate-100 dark:bg-black hover:shadow hover:shadow-[#14b8a6]
             hover:bg-slate-100 dark:hover:bg-gray-900 rounded-2xl">
                <Card.Title href={`/articles/${post.slug.current}`}>
                  {post.title}
                </Card.Title>
                <Card.Eyebrow
                  as="time"
                  dateTime={post._createdAt}
                  className="md:hidden"
                  decorate
                >
                  {formatDate(post._createdAt)}

                </Card.Eyebrow>
                <Card.Description>{extractText(post.body, 300)}...</Card.Description>
                <Card.Cta>Read article</Card.Cta>
              </Card>
              <Card.Eyebrow
                as="time"
                dateTime={post._createdAt}
                className="mt-1 hidden md:block"
              >
                {formatDate(post._createdAt)}

              </Card.Eyebrow>
            </article>

          ))}
        </div>

      </div>
    </SimpleLayout>

  );
}

