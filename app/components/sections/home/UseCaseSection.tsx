"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { UseCasesSectionType, UseCase, Category } from "@/app/lib/types";


interface Props {
  data: UseCasesSectionType;
  lang: string;
  allUseCases: UseCase[]; // Pass all available use cases
}

export default function UseCasesComponent({ data, lang, allUseCases }: Props) {

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    data.categories.length > 0 ? data.categories[0]._id : null
  );
  const [filteredUseCases, setFilteredUseCases] = useState<UseCase[]>([]);

  useEffect(() => {
    if (selectedCategory)  {
      setFilteredUseCases(
        allUseCases.filter((useCase: UseCase) =>
          useCase.tags?.some((tag: Category) => tag._id === selectedCategory)
        )
      );
    } else {
      setFilteredUseCases(allUseCases);
    }
  }, [selectedCategory, allUseCases]);

  return (
    <section className="max-w-7xl mx-auto py-16 px-6 md:px-12">
      <h2 className="text-4xl font-bold text-center mb-4">{data.title}</h2>
      <p className="text-gray-600 text-center mb-8">{data.subtitle}</p>

      {/* Category Filters */}
      {data.categories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {data.categories.map((category: Category) => (
            <button
              key={category._id}
              onClick={() => setSelectedCategory(category._id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                selectedCategory === category._id
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>
      )}

      {/* Use Case Cards - Horizontal Scroll */}
      <div className="flex overflow-x-auto gap-6 pb-4">
        {filteredUseCases.length === 0 ? (
          <p className="text-center text-gray-500">No use cases available.</p>
        ) : (
          filteredUseCases.map((useCase: UseCase, index) => (
            <div
              key={`${useCase.title}-${index}`}
              className="min-w-[350px] max-w-[350px] h-[450px] flex flex-col justify-between border p-6 rounded-lg shadow-lg"
            >
              <div>
                {useCase.image && (
                  <Image
                    src={useCase.image.asset.url}
                    alt={useCase.image.alt || "Use Case Image"}
                    width={250}
                    height={50}
                    quality={80}
                    className="mb-4 w-full"
                  />
                )}
                <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{useCase.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {useCase.tags.map((tag: Category) => (
                    <span
                      key={tag._id}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {tag.title}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href={`${lang}/usecases/${useCase.slug.current}`}
                className="inline-block w-full text-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                {data.buttonText}
              </a>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
