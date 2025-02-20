"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CategoryType } from "../categoryObject";

import styles from "@/app/contract.module.css";

interface ContractsHeaderTabProps {
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  steps: CategoryType[][];
}

const Stepify: React.FC<ContractsHeaderTabProps> = ({
  activeStep,
  setActiveStep,
  steps,
}) => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <>
      {steps.map((_, index) => {
        const stepNumber =
          index === steps.length - 1 ? "Results" : `Step ${index + 1}`;
        const isActive = activeStep === index || activeStep > index;
        const isCompleted = activeStep > index;

        return (
          <React.Fragment key={index}>
            {/* Step Circle */}
            <div
              className={`relative flex flex-col items-center transition-all duration-300 cursor-pointer`}
              onClick={() => setActiveStep(index)}
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full text-sm font-semibold transition-all duration-300 border-2 ${
                        isActive
                          ? "bg-blue-600 text-white border-blue-600 scale-90 shadow-md"
                          : "bg-gray-200 text-gray-500 border-gray-300 hover:bg-gray-300 hover:text-gray-700"
                      }`}
                    >
                      {index + 1}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" sideOffset={10} align="center">
                    <span className="text-sm font-medium">{stepNumber}</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Step Label */}
              <span
                className={`mt-2 text-xs md:text-sm font-medium ${
                  isActive ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {stepNumber}
              </span>
            </div>

            {/* Progress Bar */}
            {index !== steps.length - 1 && (
              <div className="flex-1 h-1 relative overflow-hidden rounded-full bg-gray-300">
                <div
                  className={`absolute left-0 top-0 h-full transition-all duration-500 ${
                    isCompleted ? "bg-blue-500" : "bg-gray-300"
                  }`}
                  style={{ width: isCompleted ? "100%" : "0%" }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default Stepify;
