import Image from 'next/image'
import clsx from 'clsx'
import { Container } from '../../layout/Container'
import logoBbc from '@/images/logos/bbc.svg'
import logoCbs from '@/images/logos/cbs.svg'
import logoCnn from '@/images/logos/cnn.svg'
import logoFastCompany from '@/images/logos/fast-company.svg'
import logoForbes from '@/images/logos/forbes.svg'
import logoHuffpost from '@/images/logos/huffpost.svg'
import logoTechcrunch from '@/images/logos/techcrunch.svg'
import logoWired from '@/images/logos/wired.svg'
import CallToAction from '../../callToAction/callToActionAi'
import { BackgroundIllustration } from '../../graphics/BackGroundIllustration'
import { HeroSectionType } from '@/app/lib/types'
import SanityContent from '../../sanity/sanityContent'
import { PortableTextBlock } from 'next-sanity'
//import imageFile from '@/images/video/an02.gif'


interface HeroSectionProps {
  data: HeroSectionType;
}


export function HeroSection({ data }: HeroSectionProps) {
  
  return (
    <section id="herosection" className="overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              {data.heading}
            </h1>
            <div className="mt-6 text-lg text-gray-600">
              {data.introText && <SanityContent body={data.introText as PortableTextBlock[]} />}
            </div>
            <div className='mt-6'>
              <CallToAction 
                ctatext={data.callToActionTitle} 
                emailPlaceholder={data.emailPlaceholder} 
                urlPlaceholder={data.websitePlaceholder} 
                buttonLabel={data.buttonLabel} 
                content={data.textBelowFields}/>
            </div>
          </div>
          <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
            <Image 
              src={data.image.asset.url}
              height={900}
              width={600}
              alt='some text'
              quality={80}
              className='rounded-xl'
            />
              <BackgroundIllustration className="absolute left-1/2 h-[1026px] w-[1026px] 
                stroke-gray-300/70 [mask-image:linear-gradient(to_bottom,white_90%,transparent_75%)] 
                sm:top-16 sm:-translate-x-1/2 lg:ml-12 xl:-top-14 xl:ml-0 " />
          </div>
          <div className="relative -mt-4 lg:col-span-7 lg:mt-0 xl:col-span-6">
            <p className="text-center text-sm font-semibold text-gray-900 lg:text-left">
              {data.logosLabel}
            </p>
            <ul
              role="list"
              className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-x-10 gap-y-8 lg:mx-0 lg:justify-start"
            >
              {[
                ['Forbes', logoForbes],
                ['TechCrunch', logoTechcrunch],
                ['Wired', logoWired],
                ['CNN', logoCnn, 'hidden xl:block'],
                ['BBC', logoBbc],
                ['CBS', logoCbs],
                ['Fast Company', logoFastCompany],
                ['HuffPost', logoHuffpost, 'hidden xl:block'],
              ].map(([name, logo, className]) => (
                <li key={name} className={clsx('flex', className)}>
                  <Image src={logo} alt={name} className="h-8" unoptimized />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
    
  )
}
