"use client";

import { TableOfContentsSectionType } from "@/app/lib/types";

interface Heading {
  text: string;
  id: string;
  level: number;
}

interface TableOfContentsProps {
  data: TableOfContentsSectionType
  headings: Heading[] | [] | undefined;
}

export default function TableOfContents({ data, headings }: TableOfContentsProps) {

  if (!data) return;
  if (!headings) return;
  if (!headings.length) return null;

  const { title } = data;

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // Adjust offset for fixed header
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-gray-50">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <ul className="space-y-2 text-sm text-gray-700">
        {headings.map((heading, index) => (
          <li key={heading.id+index} className={`pl-${heading.level === 3 ? 4 : 0}`}>
            <button
              onClick={() => handleScroll(heading.id)}
              className="hover:text-blue-500 transition text-left"
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
