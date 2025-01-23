// File: /components/ui/StepUI.tsx

import { MultiSelectCombobox } from "../ui/multiSelectComboBox";
import { Button } from "@/components/ui/button";
import styles from "@/app/contract.module.css";
import {
  defaultSelectedOptions,
  getInputFieldsForStep,
  SelectedOptions,
  toCamelCase,
} from "./contractsObject";
import { capabilities, contractTypes, organizationalFunctions } from "../noSql";
import { Dispatch, SetStateAction } from "react";

export interface StepUIProps {
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
  selectedItems: SelectedOptions;
  setSelectedOptions: Dispatch<SetStateAction<SelectedOptions>>;
}

const Step1: React.FC<StepUIProps> = ({
  activeTab,
  setActiveTab,
  selectedItems,
  setSelectedOptions,
}) => {
  const steps = [
    {
      title: "capabilities",
      description:
        "Which of the following capabilities do you need the software to support?",
      imagePath: "/contracts/images/capability.png",
      inputType: "multiSelect" as const,
      choices: capabilities,
    },
    {
      title: "organizational functions",
      description:
        "Which of the following functions do you need the software to support?",
      imagePath: "/contracts/images/organizational_function.png",
      inputType: "multiSelect" as const,
      choices: organizationalFunctions,
    },
    {
      title: "contract types",
      description:
        "Which of the following contract types do you need the software to support?",
      imagePath: "/contracts/images/contract.webp",
      inputType: "multiSelect" as const,
      choices: contractTypes,
    },
  ];

  const onSelectItems = (title: keyof SelectedOptions, items: number[]) => {
    setSelectedOptions((prevSelected) =>
      prevSelected[title] === items
        ? { ...prevSelected }
        : { ...prevSelected, [title]: items }
    );
  };

  const handleNext = () => {
    const inputFields = getInputFieldsForStep(activeTab);
    const totalSteps = inputFields.length;

    if (activeTab < totalSteps - 1) {
      setActiveTab((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setActiveTab(0);
    setSelectedOptions(defaultSelectedOptions);
  };

  return (
    <>
      <div className="flex flex-col gap-12 md:w-3/4 mx-auto pb-20">
        <MultiSelectCombobox
          key={steps[0].title}
          title={steps[0].title}
          description={steps[0].description}
          imagePath={steps[0].imagePath}
          inputType={steps[0].inputType}
          choices={steps[0].choices}
          selectedItems={selectedItems["capabilities"] || []}
          onSelectItems={(selectedItems) =>
            onSelectItems(
              toCamelCase(steps[0].title) as keyof SelectedOptions,
              selectedItems
            )
          }
        />
        <MultiSelectCombobox
          key={steps[1].title}
          title={steps[1].title}
          description={steps[1].description}
          imagePath={steps[1].imagePath}
          inputType={steps[1].inputType}
          choices={steps[1].choices}
          selectedItems={selectedItems["organizationalFunctions"] || []}
          onSelectItems={(selectedItems) =>
            onSelectItems(
              toCamelCase(steps[1].title) as keyof SelectedOptions,
              selectedItems
            )
          }
        />
        <MultiSelectCombobox
          key={steps[2].title}
          title={steps[2].title}
          description={steps[2].description}
          imagePath={steps[2].imagePath}
          inputType={steps[2].inputType}
          choices={steps[2].choices}
          selectedItems={selectedItems["contractTypes"] || []}
          onSelectItems={(selectedItems) =>
            onSelectItems(
              toCamelCase(steps[2].title) as keyof SelectedOptions,
              selectedItems
            )
          }
        />
        <div
          className={`fixed left-0 bottom-0 z-50 flex justify-end gap-8 items-center ${styles.bgAccentMuted} bg-gray-300/50 backdrop-blur-3xl py-3 md:px-16 px-4 border w-full mt-8`}
        >
          <div className="gap-4 flex ">
            <Button
              className={`${styles.btnSecondary} h-fit `}
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              onClick={handleNext}
              className={`${styles.btnSecondary} px-4 h-fit `}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step1;
