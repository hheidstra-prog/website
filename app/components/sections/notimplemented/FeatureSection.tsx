import { Container } from '../../layout/Container'
//import imageFile from '@/images/photos/image-2.jpg'
import Image from 'next/image'
import { FeatureCardType, FeatureSectionType } from '@/app/lib/types'
import SanityContent from '../../sanity/sanityContent'
import { PortableTextBlock } from 'next-sanity'
import { IconRenderer } from '../../icons/iconRenderer'
import { icons } from 'lucide-react'
import { CircleBackground } from '../../graphics/CircleBackground'


interface FeatureSectionProps {
  data: FeatureSectionType;
}

export function FeatureSection({ data }: FeatureSectionProps) {
  return (
    <section id="features" className="bg-[#0A0E1A] py-20 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
          <h2 className="text-3xl font-medium tracking-tight text-white">
              {data.title}
          </h2>
          {data.introText && (
            <SanityContent
              className="text-lg text-gray-400"
              body={data.introText as PortableTextBlock[]}
            />
          )}
        </div>
      </Container>
      <Container className="hidden md:mt-20 md:block">
        <div className="grid grid-cols-12 items-center gap-8 lg:gap-16 xl:gap-24">
          <div className="relative z-10 order-last col-span-6 space-y-6">
            {data.cards.map((card) => (
                <FeatureCard key={card.title} card={card} />
            ))}
          </div>
          <div className="relative col-span-6 mt-0 justify-center items-center flex">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-circle">
              <CircleBackground color="#13B5C8" className="animate-spin-slower" />
            </div>
            <div className='mt-0'>
              <Image src={data.image.asset.url} width={600} height={600} alt={data.image.alt || "image"} quality={80} className='rounded-xl' />
            </div>
          </div>
        </div>
      </Container>

    </section>
  );
}


function FeatureCard({ card }: { card: FeatureCardType }) {
  return (
    <div className="rounded-2xl bg-gray-800 p-8 shadow-[0_0_20px_1px_rgba(6,182,212,0.3)] hover:bg-gray-700 transition-colors">
      <IconRenderer name={card.icon as keyof typeof icons} className="h-10 w-10 text-teal-400" />
      <h3 className="mt-6 text-lg font-semibold text-white">{card.title}</h3>
      <div className="mt-2 text-sm text-gray-400">
        {card.content && (
          <SanityContent
            className="text-sm text-gray-400"
            body={card.content as PortableTextBlock[]}
          />
        )}
      </div>
    </div>
  );
}



