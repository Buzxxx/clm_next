"use client";

import React, { useState, memo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface CardProps {
  image: string;
  title: string;
  description: string;
  href: string;
  buttonText?: string;
  initialExpanded?: boolean;
  className?: string;
  label?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const DynamicCard = memo(function DynamicCard({
  image,
  title,
  description,
  href,
  buttonText = "Explore",
  initialExpanded = false,
  className = "",
  label,
  disabled = false,
  onClick,
}: CardProps) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const router = useRouter();

  const handleToggle = () => setIsExpanded((prev) => !prev);

  const handleClick = () => {
    if (onClick) onClick(); // Inform parent first
    setTimeout(() => router.push(href), 200); // Optional delay before redirect
  };

  return (
    <article
      className={`group flex flex-col h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 ${className}`}
      aria-label={`Card: ${title}`}
    >
      {/* Image Section */}
      <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-52 xl:h-48">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          className="object-cover"
        />
        {label && (
          <div className="absolute top-3 right-3 bg-white/80 text-[#003E78] text-xs font-semibold px-3 py-1 rounded-full shadow-sm backdrop-blur-sm border border-gray-200">
            {label}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-5">
        <h2 className="text-xl font-semibold text-[#003E78] line-clamp-2 mb-2">
          {title}
        </h2>

        <div className="relative text-sm text-gray-700">
          <p className={`${isExpanded ? "" : "line-clamp-3"} transition-all`}>
            {description}
          </p>
          {description.length > 120 && (
            <button
              onClick={handleToggle}
              className="mt-1 text-sm font-medium text-[#003E78]"
              aria-label={
                isExpanded ? "Collapse description" : "Expand description"
              }
            >
              {isExpanded ? "Show Less" : "Show More"}
            </button>
          )}
        </div>

        {/* Button */}
        <div className="mt-auto pt-5">
          <Button
            type="button"
            disabled={disabled}
            onClick={handleClick}
            className="w-full rounded-md bg-[#003E78] text-white text-sm font-medium py-2 px-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
            aria-label={`Explore ${title}`}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </article>
  );
});

export default DynamicCard;
