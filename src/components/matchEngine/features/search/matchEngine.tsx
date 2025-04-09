"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Stepify from "@/components/matchEngine/features/search/categorySelect/stepify";
import SelectForm from "@/components/matchEngine/features/search/categorySelect/selectForm";
import { useMatchEngine } from "@/components/matchEngine/features/matchEngineContext";

const MatchEngine = () => {
  const {
    currentPage,
    reset,
    SetApptype,
    searchParams,
    handleNext,
    handlePrevious,
  } = useMatchEngine();

  const router = useRouter();
  const [isLoadingResult, setIsLoadingResult] = useState(false);

  const isLastStep = currentPage === (searchParams?.subTypes?.length || 0) - 1;

  const handleResultClick = async () => {
    setIsLoadingResult(true);
    router.push("/vendor");
  };

  if (searchParams?.subTypes?.length == 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-2xl font-semibold text-gray-700">No Data Found</h2>
        <p className="text-gray-500 mt-2">
          It seems there are no options available at the moment. Please try
          again later or reset your search.
        </p>
        <button
          onClick={() => {
            SetApptype(undefined);
          }}
          className="mt-4 px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Reset Search
        </button>
      </div>
    );
  }

  return (
    <div className="bg-background w-full min-h-screen relative">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Stepper */}
        <div className="w-full mb-10">
          <Stepify />
        </div>

        {/* Step Content */}
        <div className="min-h-[60vh]">
          <SelectForm />
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className="px-4 py-2 text-sm border rounded disabled:opacity-50"
          >
            Previous
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={reset}
              className="px-4 py-2 text-sm text-red-600 hover:underline"
            >
              Reset
            </button>

            {isLastStep ? (
              <button
                onClick={handleResultClick}
                className="px-4 py-2 text-sm bg-green-600 text-white rounded disabled:opacity-50"
                disabled={isLoadingResult}
              >
                {isLoadingResult ? "Loading..." : "Result"}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded"
                disabled={!searchParams}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sticky progress summary */}
      <div className="bg-white border-b border-border shadow-sm py-3 px-4 flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          Step {currentPage + 1} of {searchParams?.subTypes?.length}
        </span>
        <button
          onClick={reset}
          className="text-sm text-blue-600 hover:underline"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default MatchEngine;
