"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AIAgentsSectionType } from "@/app/lib/types";

const AUTO_SLIDE_INTERVAL = 7000; // 7 seconds

const slideVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 100 : -100,
  }),
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: "easeInOut" },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -100 : 100,
    transition: { duration: 0.9, ease: "easeInOut" },
  }),
};

interface SectionProps {
  data: AIAgentsSectionType;
}


export default function AiAgentsSection({ data }: SectionProps) {


  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoSliding, setIsAutoSliding] = useState(true);

  // ✅ Wrapped in useCallback to avoid unnecessary re-renders
  const nextSlide = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % data.cards.length);
    setIsAutoSliding(false);
  }, [data.cards.length]);

  const prevSlide = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + data.cards.length) % data.cards.length);
    setIsAutoSliding(false);
  };

  // ✅ Auto-slide effect with stable dependencies
  useEffect(() => {
    if (!isAutoSliding) return;
    const interval = setInterval(nextSlide, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, [isAutoSliding, nextSlide]);

  // ✅ Reset auto-sliding timer when user interacts
  useEffect(() => {
    const resetTimer = setTimeout(() => setIsAutoSliding(true), AUTO_SLIDE_INTERVAL * 2);
    return () => clearTimeout(resetTimer);
  }, [activeIndex]);

  if (!data || !data.cards.length) return null;

  return (
    <div className="relative w-full flex flex-col items-center justify-center bg-[#0A0E1A] overflow-hidden pt-24 pb-52">
      <div className="text-center max-w-2xl px-0 mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white">{data.title}</h2>
        <p className="text-gray-300 mt-3">{data.subtitle}</p>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center max-w-7xl w-full px-8 h-[400px]">
        {/* Left Section: Text Card */}
        <div className="relative w-full md:w-1/3">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative p-6 border border-gray-700 rounded-lg backdrop-blur-lg text-white shadow-[0_0_40px_1px_rgba(6,182,212,0.3)]"
            >
              <h3 className="text-2xl font-semibold text-blue-400 mb-2">
                {data.cards[activeIndex].title}
              </h3>
              <p className="text-gray-300">{data.cards[activeIndex].text}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Section: Image */}
        <div className="relative w-full md:w-2/3 flex justify-center h-[500px]">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative"
            >
              {data.cards[activeIndex].image?.asset.url && (
                <Image
                  src={data.cards[activeIndex].image.asset.url}
                  alt={data.cards[activeIndex].image.alt || "AI Illustration"}
                  width={500}
                  height={450}
                  className="w-full h-auto"
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-white/20 transition"
          >
            <ChevronLeft size={24} color="white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-white/20 transition"
          >
            <ChevronRight size={24} color="white" />
          </button>

          {/* Pagination Dots */}
          <div className="absolute bottom-2 flex gap-2">
            {data.cards.map((_, index) => (
              <div
                key={index}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                  setIsAutoSliding(false);
                }}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                  index === activeIndex ? "bg-blue-400 scale-110" : "bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}