
import { NewsletterSectionType } from '@/app/lib/types';
import { Container } from '../layout/Container'
import CallToActionNewsletter from '../callToAction/callToActionNewsletter'


interface NewsletterSectionProps {
  data: NewsletterSectionType;
  lang: string
}


export function NewsletterSection({ data, lang }: NewsletterSectionProps) {
  
  const { title, subtitle, actiontext, buttonLabel, emailPlaceholder } = data;
  return (
    <section
      id="newsletter-section"
      className="relative overflow-hidden bg-gray-100 pt-6 rounded-xl pb-4"
    >
      <Container>
        <div className="mx-auto max-w-md sm:text-center">
          <h2 className="text-xl font-medium tracking-tight text-gray-800 sm:text-xl">
            {title}
          </h2>
          <p className="mt-4 text- text-gray-800">
            {subtitle}
          </p>
          <div className="mt-2">
            <CallToActionNewsletter header={actiontext} placeholder={emailPlaceholder} buttonlabel={buttonLabel} 
            headerClassname='flex text-sm font-semibold text-grau-700' lang={lang} />
          </div>
        </div>
      </Container>
    </section>
  )
}
