import { Container } from '@/components/Container'
import { getAllArticles } from '@/lib/articles'
import Photos from './home/photos'
import Newsletter from './home/newsletter'
import Resume from './home/role'

import Article from './home/article'
import Intro from './home/intro'


export default async function Home() {
  
  let articles = (await getAllArticles()).slice(0, 4)

  return (
    <>
      <Container className="mt-9">
        <Intro/>
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Newsletter />
            <Resume />
          </div>
        </div>
      </Container>
    </>
  )
}
