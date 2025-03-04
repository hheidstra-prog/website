import Image from "next/image";
import { MeetTheTeamSectionType } from "@/app/lib/types";
import { PortableTextBlock } from "next-sanity";
import { Container } from "../../layout/Container";
import SanityContent from "../../sanity/sanityContent";
import { Button } from "../../buttons/Button";

interface SectionProps {
  data: MeetTheTeamSectionType;
}

export default function MeetTheTeamSection({ data }: SectionProps) {

  const { title, subtitle, content, image, cta } = data;

  return (
    <Container className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mt-20 mb-40">
    {/* Left Content */}
    <div>
      <p className="text-sm font-semibold text-gray-500 uppercase">
        Meet The Team
      </p>
      <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-xl text-gray-600">{subtitle}</p>
      <div className="mt-6 text-gray-700">
        <SanityContent body={content as PortableTextBlock[]} />
      </div>
      {cta?.text && cta.link && (
        <div className="mt-8">
          <Button href={cta.link}>{cta.text}</Button>
        </div>
      )}
    </div>

    {/* Right Image */}
    <div className="relative">
      {image && (
        <Image
          src={image.asset.url}
          alt={title}
          width={550}
          height={300}
          className="rounded-2xl shadow-lg"
        />
      )}
    </div>
  </Container>
  );
}
