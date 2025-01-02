import { type Metadata } from 'next'
import { SimpleLayout } from '../components/SimpleLayout'
import { sanityClient } from "@/app/lib/sanityClient";
import { fetchLast10PostsQuery } from "@/app/lib/queries";
import { Post } from "@/app/lib/types";
import { Card } from "../components/Card";
import { formatDate } from "../lib/utils";
import { extractText } from '../lib/utils';


export const metadata: Metadata = {
  title: 'Blogartikelen | AI Consultancy, Automatisering en Technologie-Inzichten',
  description:
    'Ontdek inspirerende blogartikelen over AI-toepassingen, automatisering en technologie. Praktische inzichten en tips voor bedrijven in Nederland die willen groeien met kunstmatige intelligentie.',
}


export default async function ArticlesIndex() {
  // Fetch the latest posts on the server

  const posts: Post[] = await sanityClient.fetch(fetchLast10PostsQuery);

  return (

      <SimpleLayout
        title="Lees meer over software design, AI toepassingen en praktische inzichten en tips."
        intro="Ontdek inspirerende blogartikelen over AI-toepassingen, 
        automatisering en technologie. Praktische inzichten en tips voor bedrijven in Nederland die willen groeien met kunstmatige intelligentie."
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

