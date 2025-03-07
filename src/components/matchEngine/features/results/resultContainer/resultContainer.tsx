"use client";

import React, { useState, useEffect } from "react";
import ResultListItem from "../../../ui/resultListItem";
import FixedFooter from "@/components/matchEngine/ui/fixedFooter";
import { useMatchEngine } from "@/components/matchEngine/features/matchEngineContext";
import { get_matching_list_controller } from "../../resultListObject";
import { Spinner } from "@/components/ui/icons";
import ResultsMenu from "./resultsMenu";

const ResultContainer = () => {
  const {
    reset,
    currentPage,
    paginatedCategories,
    handleNext,
    handlePrevious,
    handleUnselectAll,
    objectList,
    setObjectList,
    handleSelect,
    selectedOptions,
  } = useMatchEngine();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const data = await get_matching_list_controller(selectedOptions);
        setObjectList(data);
        handleUnselectAll();
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [selectedOptions]);

  return (
    <div className="rounded-xl shadow-lg p-4">
      <div className="flex justify-end mb-4">
        <ResultsMenu />
      </div>
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : objectList.length === 0 ? (
          <div className="flex justify-center items-center">
            No results found.
          </div>
        ) : (
          <div>
            {objectList.map((obj) => (
              <ResultListItem
                key={obj.id}
                object={{ ...obj, onSelect: handleSelect }}
              />
            ))}
          </div>
        )}
      </div>
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
  );
};

export default ResultContainer;
