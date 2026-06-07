"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export default function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className={cn("w-full divide-y divide-[#e8e8e8] border-t border-[#e8e8e8]", className)}>
      {items.map((item, i) => (
        <div key={i} className="accordion-item">
          <button
            className="accordion-trigger group"
            onClick={() => toggle(i)}
            aria-expanded={openIndex === i}
          >
            <span className="flex-1 text-left text-[#1c1c1c] group-hover:text-[#839678] transition-colors duration-200 font-medium text-sm md:text-base">
              {item.question}
            </span>
            <ChevronDown
              size={18}
              className={cn(
                "flex-shrink-0 text-[#839678] transition-transform duration-300",
                openIndex === i && "rotate-180"
              )}
            />
          </button>
          <div
            className={cn(
              "overflow-hidden transition-all duration-350 ease-in-out",
              openIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <p className="pb-5 text-[#4a4a4a] text-sm leading-relaxed">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
