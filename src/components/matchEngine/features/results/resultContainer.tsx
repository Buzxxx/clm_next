"use client";

import React, { useState, useEffect } from "react";
import ResultListItem from "../../ui/resultListItem";
import FixedFooter from "@/components/matchEngine/ui/fixedFooter";
import { useMatchEngine } from "@/components/matchEngine/features/matchEngineContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuShortcut,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bolt } from "lucide-react";
import { ListItemInterface } from "../resultListObject";
import { get_matching_list_controller } from "../resultListObject";
import { Spinner } from "@/components/ui/icons";

const ResultContainer = () => {
  const {
    reset,
    currentPage,
    paginatedCategories,
    handleNext,
    handlePrevious,
  } = useMatchEngine();
  const { selectedOptions } = useMatchEngine();
  const [isLoading, setIsLoading] = useState(true);
  const [objectList, setObjectList] = useState<ListItemInterface[]>([]);
  const [selectedCount, setSelectedCount] = useState(0);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const data = await get_matching_list_controller(selectedOptions);
        setObjectList(data);
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [selectedOptions]);

  // Handle checkbox selection
  const handleSelect = (id: string, isSelected: boolean) => {
    setObjectList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, selected: isSelected } : item
      )
    );

    setSelectedCount((prevCount) =>
      isSelected ? prevCount + 1 : prevCount - 1
    );
  };

  return (
    <div className="rounded-xl shadow-lg p-4">
      <div className="flex justify-end mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Bolt size={20} />
              Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled={selectedCount !== 2}>
              Compare
              <DropdownMenuShortcut>
                {selectedCount} selected
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sort (High to Low)</DropdownMenuItem>
            <DropdownMenuItem>Sort (Low to High)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

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
