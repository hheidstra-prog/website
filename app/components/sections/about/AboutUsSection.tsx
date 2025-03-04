import { AboutUsSectionType } from "@/app/lib/types";
import { Container } from "../../layout/Container";
import SanityContent from "../../sanity/sanityContent";
import { PortableTextBlock } from "next-sanity";
import Image from "next/image";

interface AboutUsSectionProps {
  data: AboutUsSectionType;
}

export default function AboutUsSection({ data }: AboutUsSectionProps) {

  const { title, subtitle, content, images, statistics } = data;

  return (
    <Container className="space-y-20 max-w-2xl mb-20">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Text Content */}
      <div className="space-y-6">
        <h2 className="text-4xl font-bold text-gray-900">{title}</h2>
        <p className="text-xl text-gray-600">{subtitle}</p>
        <div className="text-lg text-gray-700">
          <SanityContent body={content as PortableTextBlock[]} />
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-6 pt-6">
          {statistics.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-semibold text-gray-900">{stat.value}</p>
              <p className="text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

        {/* Right Side: Image Layout */}
        <div className="grid grid-cols-2 gap-6 relative">
          {images?.map((image, index) => (
            <div
              key={index}
              className={`relative w-full h-[250px] rounded-lg overflow-hidden shadow-lg transform ${
                index % 2 === 0 ? "translate-y-6" : "-translate-y-6"
              }`}
            >
              <Image
                src={image.asset.url}
                alt={image.alt || "Company image"}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
    </div>
    </Container>
  );
}
