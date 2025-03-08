"use client";

import React from "react";
import { useMatchEngine } from "@/components/matchEngine/features/matchEngineContext";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "@/components/ui/icons";
import styles from "@/app/contract.module.css";

const ResultFilterForm = () => {
  const { categories, selectedOptions, handleSelectionChange } =
    useMatchEngine();

  // Function to check if an option is selected
  const isSelected = (categoryId: number, optionId: number) => {
    return selectedOptions[categoryId]?.includes(optionId);
  };

  // Function to handle selection toggle
  const toggleSelection = (categoryId: number, optionId: number) => {
    const updatedSelection = isSelected(categoryId, optionId)
      ? selectedOptions[categoryId].filter((id: number) => id !== optionId) // Remove if selected
      : [...(selectedOptions[categoryId] || []), optionId]; // Add if not selected

    handleSelectionChange(categoryId, updatedSelection);
  };

  return (
    <div className={`w-full p-4 ${styles.bgPrimary} rounded-xl shadow-lg`}>
      <h2 className="text-2xl py-2 font-semibold mb-2">Search Results</h2>
      {categories?.map((category: any) => (
        <div className="mb-4" key={category.id}>
          <label className={`text-xs mb-1 block uppercase ${styles.textGray}`}>
            {category.name}
          </label>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={`w-full justify-between flex items-center text-sm ${
                  selectedOptions[category.id]?.length
                    ? styles.textPrimary
                    : styles.textGray
                }`}
              >
                {selectedOptions[category.id]?.length
                  ? `${selectedOptions[category.id].length} item(s) selected`
                  : "Select Options"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                {category.options.length > 5 && (
                  <CommandInput placeholder="Search options..." />
                )}
                <CommandList>
                  <CommandEmpty>Nothing found.</CommandEmpty>
                  <CommandGroup>
                    {category.options.map((option: any) => (
                      <CommandItem
                        key={option.id}
                        value={option.name}
                        onSelect={() => toggleSelection(category.id, option.id)}
                        className="border-b border-slate-200 text-sm"
                      >
                        <Check
                          className={`mr-2 h-4 w-4 ${
                            isSelected(category.id, option.id)
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        />
                        {option.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      ))}
    </div>
  );
};

export default ResultFilterForm;
