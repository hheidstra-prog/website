
import { LatestArticlesSectionType, Post } from '@/app/lib/types';
import { Container } from '../../layout/Container'
import Card from '../../card/card';
import { sanityClient } from '@/app/lib/sanityClient';
import { fetchLatestPostsQuery } from '@/app/lib/queries';


interface SectionProps {
  data: LatestArticlesSectionType;
  lang: string;
}

export async function LatestArticlesSection({ data, lang }: SectionProps) {

  const { title, subtitle } = data;

  const posts: Post[] = await sanityClient.fetch(fetchLatestPostsQuery, { language: lang });

  return (
    <section
      id="secondary-features"
      aria-label="Features for building a portfolio"
      className="py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900">
            {title}
          </h2>
          <p className="mt-2 text-lg text-gray-600">{subtitle}</p>
        </div>
        <ul 
          key={"latestAricles"}
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-20 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3"
        >
          {posts.map((post) => (
            <Card post={post} lang={lang} key={post._id} />
          ))}
        </ul>
      </Container>
    </section>
  );
}