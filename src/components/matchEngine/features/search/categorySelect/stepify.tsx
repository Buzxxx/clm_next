"use client";

import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMatchEngine } from "@/components/matchEngine/features/matchEngineContext";

const Stepify = () => {
  const { currentPage, setCurrentPage, searchParams } = useMatchEngine();

  const subTypes = searchParams?.subTypes || [];
  const steps = [...subTypes.map((s) => s.name)];

  return (
    <div className="w-full flex items-center justify-between gap-2 sm:gap-4 px-2">
      {steps.map((label, index) => {
        const isActive = currentPage === index;
        const isCompleted = currentPage > index;
        const isLast = index === steps.length - 1;

        return (
          <React.Fragment key={index}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setCurrentPage(index)}
                    className="flex flex-col items-center flex-shrink-0 focus:outline-none"
                  >
                    <div
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[11px] font-medium border transition-all duration-200 ${
                        isActive
                          ? "bg-[#003E78] text-white border-blue-600 shadow"
                          : isCompleted
                          ? "bg-green-500 text-white border-green-500"
                          : "bg-gray-200 text-gray-500 border-gray-300 hover:bg-gray-300"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span
                      className={`mt-1 text-[11px] sm:text-xs font-medium ${
                        isActive ? "text-gray-900" : "text-gray-500"
                      }`}
                    >
                      {label}
                    </span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" align="center">
                  {label}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {!isLast && (
              <div className="flex-1 h-0.5 bg-gray-300 relative mx-1 sm:mx-2">
                <div
                  className={`absolute left-0 top-0 h-full transition-all duration-300 ${
                    isCompleted ? "bg-green-500" : "bg-gray-300"
                  }`}
                  style={{ width: isCompleted ? "100%" : "0%" }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepify;
