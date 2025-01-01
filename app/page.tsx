import { Container } from "./components/Container";
import Appointment from "./home/appointment";
import LatestArticles from "./home/articles";
import Intro from "./home/intro";
import Newsletter from "./home/newsletter";
import Photos from "./home/photos";
import Title from "./home/title";


export default async function Home() {
  
  //let articles = (await getAllArticles()).slice(0, 4)

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
            <Appointment />
          </div>
        </div>
      </Container>
      <Container className="mt-10 md:mt-18">
          <LatestArticles/>
      </Container>
    </div>
  )
}
