
import { NewsletterSectionType } from '@/app/lib/types';
import { Container } from '../../layout/Container'
import CallToActionNewsletter from '../../callToAction/callToActionNewsletter'
import { CircleBackground } from '../../graphics/CircleBackground';

interface NewsletterSectionProps {
  data: NewsletterSectionType;
  lang: string;
}


export function NewsletterSection({ data, lang }: NewsletterSectionProps) {
  
  const { title, subtitle, actiontext, buttonLabel, emailPlaceholder } = data;

  return (
    <section
      id="newsletter-section"
      className="relative overflow-hidden bg-gray-900 py-20 sm:py-28"
    >
      <div className="absolute top-1/2 left-20 -translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2">
        <CircleBackground color="teal" />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-md sm:text-center">
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            {subtitle}
          </p>
          <div className="mt-8">
            <CallToActionNewsletter header={actiontext} placeholder={emailPlaceholder} buttonlabel={buttonLabel}  lang={lang}/>
          </div>
        </div>
      </Container>
    </section>
  )
}
