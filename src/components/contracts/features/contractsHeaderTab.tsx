import React, { Dispatch, SetStateAction, useState } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import styles from "@/app/contracts/contract.module.css"

// Mock data: Names of the input fields by step
const inputFieldsForSteps: { [key: number]: string[] } = {
  0: ["Capabilities", "Organizational Functions", "Regions"],
  1: ["Contract Types", "Licensing Models", "Integrations"],
  2: ["See Results", "Compare Vendors "],
}

interface ContractsHeaderTabProps {
  activeStep: number
  setActiveStep: Dispatch<SetStateAction<number>>
}

const ContractsHeaderTab: React.FC<ContractsHeaderTabProps> = ({
  activeStep,
  setActiveStep,
}) => {
  const ContractSteps = ["Step 1", "Step 2", "Results"]
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  return (
    <div className="flex justify-between items-center gap-4 md:w-3/4 mx-auto w-full px-4 mt-12 relative">
      {ContractSteps.map((step, index) => (
        <React.Fragment key={index}>
          <div
            className={`relative cursor-pointer py-4 sm:p-2 text-center flex gap-1 items-center justify-center flex-1 font-medium text-xs md:text-sm transition-all duration-300 ${
              activeStep === index || activeStep > index
                ? styles.textSecondary
                : "text-gray-500"
            }`}
            onClick={() => setActiveStep(index)}
            onMouseEnter={() => setHoveredStep(index)}
            onMouseLeave={() => setHoveredStep(null)}
          >
            {/* Tooltip on Hover */}
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger className="flex items-center gap-2">
                  {" "}
                  {/* Progress Circle */}
                  <span
                    className={`transition-all duration-300 ${
                      activeStep === index || activeStep > index
                        ? `${styles.bgSecondary} text-white`
                        : "bg-gray-200 text-gray-400"
                    } rounded-full p-3 md:p-4 w-8 h-8 flex items-center justify-center text-sm`}
                  >
                    {index + 1}
                  </span>
                  {step}
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  sideOffset={12}
                  align="start"
                  className="text-left space-y-1"
                >
                  {inputFieldsForSteps[index]?.map((field, i) => (
                    <p key={i} className="text-gray-600">
                      {field}
                    </p>
                  ))}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Connecting Line */}
          {index !== ContractSteps.length - 1 && (
            <div className="w-full h-1 flex-1 bg-gray-300 relative">
              <div
                className={`h-1 transition-all duration-300 ${
                  activeStep > index ? styles.bgSecondary : "bg-gray-300"
                }`}
                style={{ width: activeStep > index ? "100%" : "0%" }}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default ContractsHeaderTab
