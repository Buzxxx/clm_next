"use client";

import React, { useState } from "react";
import { useMatchEngine } from "@/components/matchEngine/features/matchEngineContext";
import FixedFooter from "@/components/matchEngine/ui/fixedFooter";
import { MultiSelect } from "@/components/matchEngine/ui/multiSelectComboBox";

interface SelectFormProps {
  paginatedCategories: any[];
}

const SelectForm = () => {
  const {
    currentPage,
    paginatedCategories,
    handleNext,
    handlePrevious,
    reset,
    handleSelectionChange,
    selectedOptions,
  } = useMatchEngine();

  return (
    <>
      <div className="container mx-auto ">
        {paginatedCategories[currentPage]?.map((cat) => (
          <div key={cat.id} className="py-3">
            <MultiSelect
              name={cat.name}
              description={cat.description}
              image={cat.image}
              options={cat.options}
              selected={selectedOptions[cat.id] || []}
              onChange={(selectedIds) =>
                handleSelectionChange(cat.id, selectedIds)
              }
            />
          </div>
        ))}
        <FixedFooter
          button3Name={"Reset"}
          button3Handle={reset}
          button1Name={"Previous"}
          button1Handle={handlePrevious}
          button2Name={"Next"}
          button2Handle={handleNext}
          currentPage={currentPage}
          paginatedCategories={paginatedCategories}
        />
      </div>
    </>
  );
};

export default SelectForm;
