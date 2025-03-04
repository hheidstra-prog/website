import { PortableText, PortableTextBlock, PortableTextComponents } from "next-sanity";
import Image from "next/image";
import CodeBlock from "./sanityCodeBlock"; 
import { urlFor } from "../../lib/sanityClient";

interface SanityContentServerProps {
  body: PortableTextBlock[];
  className?: string;
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: { asset: { _ref: string }; alt?: string } }) => {
      if (!value?.asset?._ref) return null;
      return (
        <Image
          alt={value.alt || "Image"}
          loading="lazy"
          src={urlFor(value).url()}
          width={500}
          height={500}
          style={{ width: "100%", marginBottom: "24px" }}
        />
      );
    },
    code: ({ value }: { value: { language: string; code: string } }) => {
      return <CodeBlock code={value.code} language={value.language} />;
    },
  },
  block: {
    normal: ({ children }) => <p className="text-lg">{children}</p>,
    h1: ({ children }) => {
      const id = children?.toString().toLowerCase().replace(/\s+/g, "-") || "";
      return <h1 id={id} className="text-4xl font-medium tracking-tight text-gray-900">{children}</h1>;
    },
    h2: ({ children }) => {
      const id = children?.toString().toLowerCase().replace(/\s+/g, "-") || "";
      return <h2 id={id} className="text-2xl font-medium tracking-tight text-gray-900">{children}</h2>;
    },
    h3: ({ children }) => {
      const id = children?.toString().toLowerCase().replace(/\s+/g, "-") || "";
      return <h3 id={id} className="text-xl font-medium tracking-tight text-gray-900">{children}</h3>;
    },
  },
};

export default function SanityContentServer({ body, className }: SanityContentServerProps) {
  return (
    <div className={`prose ${className || "text-gray-600 prose text-lg"}`}>
      <PortableText value={body} components={components} />
    </div>
  );
}
