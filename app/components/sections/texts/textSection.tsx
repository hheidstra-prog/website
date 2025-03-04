import { TextSectionType } from "@/app/lib/types";
import { PortableTextBlock } from "next-sanity";
import { Container } from "../../layout/Container";
import SanityContent from "../../sanity/sanityContent";

interface SectionProps {
  data: TextSectionType;
}


export default function TextSection({ data }: SectionProps) {

    const { title, content } = data;

    return (
      <Container className="space-y-20 max-w-2xl">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
          <p className="text-2xl font-medium tracking-tight mb-4">
            {title}
          </p>
          {content && <SanityContent body={content as PortableTextBlock[]} className="text-2xl text-gray-600 " />}
        </div>
      </Container>
    )
}