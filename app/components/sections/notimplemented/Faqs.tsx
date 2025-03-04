import { FAQSectionType } from "@/app/lib/types";
import { Container } from "../../layout/Container"
import SanityContent from "../../sanity/sanityContent";
import { PortableTextBlock } from "next-sanity";


interface FAQSectionProps {
  data: FAQSectionType;
}

export function FaqSection({ data }: FAQSectionProps) {

  const { title, subtitle, faqs } = data;

  return (
    <section
      id="faqs"
      aria-labelledby="faqs-title"
      className="border-t border-gray-200 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faqs-title"
            className="text-3xl font-medium tracking-tight text-gray-900"
          >
            {title}
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            {subtitle}
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-0 sm:mt-12 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((faq, index) => (
            <div key={index} className=" border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {faq.question}
              </h3>
              <div className="mt-2 text-sm text-gray-600">
              {faq.answer && (
                <SanityContent
                  className="text-sm text-gray-400"
                  body={faq.answer as PortableTextBlock[]}
                />
              )}
              </div>
            </div>
          ))}
        </ul>
      </Container>
    </section>
  )
}
