import Image from "next/image";
import { AIWorkflowSectionType } from "@/app/lib/types";
import SanityContent from "../../sanity/sanityContent";
import { PortableTextBlock } from "next-sanity";

interface SectionProps {
  data: AIWorkflowSectionType;
}

export default function AiWorkflowSection({ data }: SectionProps) {
  if (!data || !data.cards.length) return null;

  return (
    <section className="max-w-7xl mx-auto py-16 px-6 md:px-12 flex flex-col items-center gap-12">
      {/* Title & Subtitle */}
      <div className="w-full text-center">
        <h2 className="text-4xl font-bold text-purple-700 mb-4">{data.title}</h2>
        <p className="text-gray-600 mb-6">{data.subtitle}</p>
      </div>

      {/* Accordion Sections */}
      <div className="w-full max-w-6xl">
        {data.cards.map((card, index) => (
          <div key={index} className="border rounded-lg overflow-hidden mb-4">
            {/* ✅ Checkbox Trick (Allows Clicking to Close) */}
            <input
              type="checkbox"
              id={`accordion-${index}`}
              className="peer hidden"
              defaultChecked={index === 0} // ✅ First section open by default
            />
            <label
              htmlFor={`accordion-${index}`}
              className="cursor-pointer p-4 text-purple-700 text-xl font-semibold flex justify-between items-center"
            >
              {card.title}
              <svg
                className="w-5 h-5 transition-transform transform peer-checked:rotate-180"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M10 12l6-6H4l6 6z" clipRule="evenodd" />
              </svg>
            </label>

            {/* ✅ Expandable Content (Click to Open/Close) */}
            <div className="max-h-0 overflow-hidden transition-all duration-700 ease-in-out opacity-0 scale-y-95 transform origin-top peer-checked:max-h-[1000px] peer-checked:opacity-100 peer-checked:scale-y-100">
              <div className="p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* ✅ Left: Text */}
                <div className="w-full md:w-1/2">
                  {card.text && <SanityContent body={card.text as PortableTextBlock[]} />}
                </div>

                {/* ✅ Right: Image */}
                {card.image?.asset?.url && (
                  <div className="w-full md:w-1/2 flex justify-center">
                    <Image
                      src={card.image.asset.url}
                      alt={card.image.alt ?? "Workflow Image"}
                      width={500}
                      height={350}
                      className="rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
