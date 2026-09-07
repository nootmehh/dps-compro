"use client";

import { useState, type ReactNode } from "react";
import LordIcon from "../common/lordIcon";

export interface AccordionItemData {
  id: string | number;
  question: string;
  answer: ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  activeId?: string | number | null;
  onToggle?: (id: string | number) => void;
  defaultActiveId?: string | number | null;
  className?: string;
}

export default function Accordion({
  items,
  activeId: controlledActiveId,
  onToggle: controlledOnToggle,
  defaultActiveId = null,
  className = "",
}: AccordionProps) {
  const [internalActiveId, setInternalActiveId] = useState<string | number | null>(
    defaultActiveId
  );

  const isControlled = controlledActiveId !== undefined;
  const currentActiveId = isControlled ? controlledActiveId : internalActiveId;

  const handleToggle = (id: string | number) => {
    if (controlledOnToggle) {
      controlledOnToggle(id);
    }
    if (!isControlled) {
      setInternalActiveId((prev) => (prev === id ? null : id));
    }
  };

  return (
    <div className={`w-full flex flex-col justify-start items-start gap-3.5 sm:gap-4 ${className}`}>
      {items.map((item) => {
        const isExpanded = currentActiveId === item.id;
        return (
          <div
            key={item.id}
            onClick={() => handleToggle(item.id)}
            className="w-full flex items-start gap-0 cursor-pointer select-none group"
          >
            {/* Left Segment: Question Pill & Smooth Expandable Answer (Hugs question content) */}
            <div
              className={`flex-1 min-w-0 transition-all duration-300 ease-in-out overflow-hidden ${
                isExpanded
                  ? "bg-brand-background rounded-2xl sm:rounded-3xl border border-g1 shadow-[0px_2px_6px_0px_rgba(6,137,81,0.2)]"
                  : "bg-brand-background rounded-2xl sm:rounded-[28px] border border-transparent group-hover:border-g1 group-hover:opacity-95"
              }`}
            >
              {/* Question Header Pill (Hugs content with min-h and vertical padding on mobile) */}
              <div className="min-h-12 sm:h-14 px-4 sm:px-6 py-3 sm:py-0 flex items-center justify-between">
                <span
                  className={`text-sm font-semibold font-sans leading-snug transition-colors duration-200 ${
                    isExpanded ? "text-g1" : "text-g1 group-hover:text-g1"
                  }`}
                >
                  {item.question}
                </span>
              </div>

              {/* Smooth Grid-Expanded Answer */}
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                  isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-4 sm:px-6 pb-5 pt-0 flex flex-col gap-3">
                    <div className="w-full h-px bg-g1/15" />
                    <div className="text-dark/80 text-sm font-normal font-sans leading-relaxed text-justify">
                      {typeof item.answer === "string" ? (
                        <p>{item.answer}</p>
                      ) : (
                        item.answer
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Segment: Circle Chevron Button (Aligned with question box) */}
            <div
              className={`size-12 sm:size-14 rounded-full flex items-center justify-center shrink-0 self-start transition-all duration-300 ${
                isExpanded
                  ? "bg-g1 text-white shadow-[0px_2px_4px_0px_rgba(6,137,81,0.25)] border border-transparent"
                  : "bg-brand-background text-g1 border border-transparent group-hover:border-g1 group-hover:opacity-95"
              }`}
            >
              <LordIcon
                name={isExpanded ? "ChevronUp" : "ChevronDown"}
                size={20}
                primaryColor={isExpanded ? "#FFFFFF" : "#0A9863"}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
