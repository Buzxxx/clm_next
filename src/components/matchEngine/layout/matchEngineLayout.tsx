"use client";

import React from "react";
import Stepify from "@/components/matchEngine/features/categorySelect/stepify";
import { useMatchEngine } from "@/components/matchEngine/features/matchEngineContext";
import SelectForm from "@/components/matchEngine/features/categorySelect/selectForm";
import Results from "@/components/matchEngine/features/results/results";
import { Spinner } from "@/components/ui/icons";

const CategorySelectLayout = () => {
  const { isLoading, currentPage, setCurrentPage, paginatedCategories } =
    useMatchEngine();

  return (
    <div className="bg-gray-100 overflow-hidden w-full pb-12 relative">
      <div className="mt-12 relative ">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <Stepify
            activeStep={currentPage}
            setActiveStep={setCurrentPage}
            steps={paginatedCategories}
          />
        </div>
        <div className="py-6 min-h-screen">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Spinner />
            </div>
          ) : currentPage < paginatedCategories.length - 1 ? (
            <SelectForm />
          ) : (
            <Results />
          )}
        </div>
      </div>
    </div>
  );
};

export default CategorySelectLayout;
