// File: /components/ui/StepUI.tsx

import { MultiSelectCombobox } from "../ui/multiSelectComboBox";
import { Button } from "@/components/ui/button";
import styles from "@/app/contract.module.css";
import {
  defaultSelectedOptions,
  getInputFieldsForStep,
  isSelectedOptionsEmpty,
  SelectedOptions,
  toCamelCase,
} from "./contractsObject";
import { integrations, licensingModels, regions } from "../noSql";
import { StepUIProps } from "./step1";

const Step2: React.FC<StepUIProps> = ({
  activeTab,
  setActiveTab,
  selectedItems,
  setSelectedOptions,
}) => {
  const steps = [
    {
      title: "licensing models",
      description:
        "Which of the following integrations do you need the software to support?",
      imagePath: "/contracts/images/licensing.webp",
      inputType: "multiSelect" as const,
      choices: licensingModels,
    },
    {
      title: "integrations",
      description: "Do you require use of the software on specific device(s)?",
      imagePath: "/contracts/images/integrations.webp",
      inputType: "multiSelect" as const,
      choices: integrations,
    },
    {
      title: "regions",
      description: "Do you require use of the software on specific device(s)?",
      imagePath: "/contracts/images/regions.png",
      inputType: "multiSelect" as const,
      choices: regions,
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
      <div className="flex flex-col gap-12 md:w-3/4 mx-auto  pb-20">
        <MultiSelectCombobox
          key={steps[0].title}
          title={steps[0].title}
          description={steps[0].description}
          imagePath={steps[0].imagePath}
          inputType={steps[0].inputType}
          choices={steps[0].choices}
          selectedItems={selectedItems["licensingModels"] || []}
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
          selectedItems={selectedItems["integrations"] || []}
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
          selectedItems={selectedItems["regions"] || []}
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
          <div className="justify-center gap-4 flex">
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
              Show Results
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step2;
