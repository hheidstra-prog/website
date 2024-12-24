import { Container } from '@/components/Container'
import { getAllArticles } from '@/lib/articles'
import Newsletter from './home/newsletter'
import Resume from './home/role'

import Article from './home/article'
import Intro from './home/intro'
import Photos from './home/photos'
import Title from './home/title'


export default async function Home() {
  
  let articles = (await getAllArticles()).slice(0, 4)

  return (
    <div className=''>

    <Container className="mt-[100px]">
        <Title/>
      </Container>
      <div className="mb-12">
        <Photos />
      </div>
      <Container className="mt-10 md:mt-18">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
          <Intro/>
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Newsletter />
            <Resume />
          </div>
        </div>
      </Container>
      <Container className="mt-10 md:mt-18">
        <div className="flex overflow-x-auto gap-6 pb-4 hide-vertical-scroll w-full">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
        </Container>
    </div>
  )
}
