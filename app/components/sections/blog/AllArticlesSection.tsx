
import { AllArticlesSectionType, Post } from '@/app/lib/types';
import { Container } from '../../layout/Container'
import Card from '../../card/card';
import { sanityClient } from '@/app/lib/sanityClient';
import { fetchLatestPostsQuery } from '@/app/lib/queries';


interface SectionProps {
  data: AllArticlesSectionType;
  lang: string;
}

export async function AllArticlesSection({ lang }: SectionProps) {

  //const { title } = data;

  const posts: Post[] = await sanityClient.fetch(fetchLatestPostsQuery, { language: lang });

  return (
    <Container className='mb-20'>
      <ul
        role="list"
        className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-10 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3"
      >
        {posts.map((post) => (
          <Card post={post} lang={lang} key={post._id} />
        ))}
      </ul>
    </Container>
  );
}