"use client";

import { useEffect, useState } from "react";
import { Container } from "../../layout/Container";
import CountUp from "react-countup";
import { AiFact, AiFactsSectionType } from "@/app/lib/types";


interface SectionProps {
  data: AiFactsSectionType;
}
// Configurable animation timings
const COUNT_DURATION = 2.5; // Seconds for counting animation
const PAUSE_DURATION = 3; // Seconds before reset

export function AIFactsSection({ data }: SectionProps) {

  const { title, subtitle } = data;
  //const { heading, description, statss } = aiNumbers[lang] || aiNumbers["en"]; // Fallback to English

  const stats: AiFact[] = data.facts;

  const [resetKey, setResetKey] = useState(0); // Key to trigger restart

  useEffect(() => {
    const interval = setInterval(() => {
      setResetKey((prev) => prev + 1); // Change key to reset animation
    }, (COUNT_DURATION + PAUSE_DURATION) * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gray-900 text-white">
      <Container>
        <h2 className="text-3xl font-medium tracking-tight text-center text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-center text-gray-400">
          {subtitle}
        </p>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl font-semibold text-teal-400">
                <CountUp
                  key={resetKey} // Reset animation
                  start={0}
                  end={stat.value}
                  duration={COUNT_DURATION}
                  separator=","
                  suffix={stat.suffix}
                />
              </div>
              <p className="mt-2 text-gray-300">{stat.title}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
