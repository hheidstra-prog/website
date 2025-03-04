"use client";

import { useState, useEffect, useRef } from "react";
import { Container } from "../../layout/Container";
import { AiInsight, AiInsightsSectionType } from "@/app/lib/types";

interface SectionProps {
  data: AiInsightsSectionType;
}

const TYPE_SPEED = 10; // Speed of typing effect (milliseconds per letter)
const PAUSE_TIME = 6000; // Time text stays before fading out
const FADE_OUT_TIME = 1000; // Fade-out duration

export default function AIInsightsSection({ data }: SectionProps) {
  const stats: AiInsight[] = data.insights; // Localized stats

  const [index, setIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isFadingOut, setIsFadingOut] = useState(false);
  
  const timeouts = useRef<NodeJS.Timeout[]>([]); // Stores timeouts for cleanup

  useEffect(() => {
    // Clear existing timeouts
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];

    const fullText = stats[index].insight;
    let charIndex = 0;

    // Typing effect
    const typeInterval = setInterval(() => {
      charIndex++;
      setTypedText(fullText.slice(0, charIndex));

      if (charIndex === fullText.length) clearInterval(typeInterval);
    }, TYPE_SPEED);
    timeouts.current.push(typeInterval);

    // Pause before fade-out
    const pauseTimeout = setTimeout(() => {
      setIsFadingOut(true);

      // Fade-out transition
      const fadeTimeout = setTimeout(() => {
        setTypedText("");
        setIsFadingOut(false);
        setIndex((prevIndex) => (prevIndex + 1) % stats.length);
      }, FADE_OUT_TIME);

      timeouts.current.push(fadeTimeout);
    }, fullText.length * TYPE_SPEED + PAUSE_TIME);

    timeouts.current.push(pauseTimeout);

    return () => {
      timeouts.current.forEach(clearTimeout);
    };
  }, [index, stats]); // `stats` is now included to prevent stale state

  return (
    <section className="py-10 bg-gray-900">
      <Container className="h-[180px]">
        <div className="text-center h-[100px]">
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl text-white">
            {stats[index].header}
          </h2>
          <p
            className={`mt-4 text-lg text-teal-400 transition-opacity duration-${FADE_OUT_TIME} ${
              isFadingOut ? "opacity-0" : "opacity-100"
            }`}
          >
            {typedText}
          </p>
        </div>
      </Container>
    </section>
  );
}
