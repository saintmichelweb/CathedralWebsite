import React, { useState } from "react";

interface AccordionItem {
  title: string;
  content?: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <div className="space-y-4 w-full  mx-auto px-4">
      {items.map((item, index) => (
        <div key={index} className="border rounded-lg overflow-hidden">
          <div
            className={`flex justify-between items-center px-4 py-3 bg-blue-900 text-white cursor-pointer`}
            onClick={() => toggleAccordion(index)}
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <span className="text-xl">{expandedIndex === index ? "▲" : "▼"}</span>
          </div>
          {expandedIndex === index && (
            <div className="px-4 py-3 bg-gray-100 text-gray-800">
              {item.content || <p>No additional information available.</p>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
