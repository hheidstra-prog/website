import React from "react";
import { PortableText, PortableTextBlock, PortableTextComponents } from "next-sanity";
import CodeBlock from "./sanityCodeBlock"; // Use your reusable CodeBlock component
import Image from "next/image";
import { urlFor } from "../lib/sanityClient";

interface SanityContentProps {
  body: PortableTextBlock[]; // Use a stronger type if available
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: { asset: { _ref: string }; alt?: string; width?: number; height?: number } }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <Image
          alt={value.alt || "Image"}
          loading="lazy"
          src={urlFor(value).url()}
          width={value.width || 500}
          height={value.height || 500}
          style={{
            width: "100%",
            marginBottom: "24px",
          }}
        />
      );
    },
    code: ({ value }: { value: { language: string; code: string } }) => {
      return <CodeBlock code={value.code} language={value.language} />;
    },
  },
};

const SanityContent: React.FC<SanityContentProps> = ({ body }) => {
  return (
    <div className="prose dark:prose-invert">
      <PortableText value={body} components={components} />
    </div>
  );
};

export default SanityContent;