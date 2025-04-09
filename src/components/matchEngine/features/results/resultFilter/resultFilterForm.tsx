"use client";

import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandInput,
} from "@/components/ui/command";
import { ChevronsUpDown } from "@/components/ui/icons";
import { useMatchEngine } from "@/components/matchEngine/features/matchEngineContext";

const ResultFilterForm = () => {
  const { searchParams, selectedOptions, handleSelectionChange } =
    useMatchEngine();

  const isSelected = (categoryId: number, optionId: number) =>
    selectedOptions[categoryId]?.includes(optionId);

  const toggleSelection = (categoryId: number, optionId: number) => {
    const updated = isSelected(categoryId, optionId)
      ? selectedOptions[categoryId].filter((id) => id !== optionId)
      : [...(selectedOptions[categoryId] || []), optionId];

    handleSelectionChange(categoryId, updated);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm p-4 sm:p-5 space-y-5 border border-gray-200">
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">
          Filter
        </h2>
      </div>

      {searchParams?.subTypes?.map((subtype) =>
        subtype.categories.map((category) => {
          const selectedCount = selectedOptions[category.id]?.length || 0;
          const sortedOptions = [...category.options].sort((a, b) =>
            a.name.localeCompare(b.name)
          );

          return (
            <Popover key={category.id}>
              <PopoverTrigger asChild>
                <div
                  role="button"
                  className="flex justify-between items-center w-full px-4 py-3 rounded-xl border border-gray-200 shadow-sm bg-white hover:shadow-md transition cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#003E78]">
                      {category.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {selectedCount > 0
                        ? `${selectedCount} selected`
                        : "No selection"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronsUpDown className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </PopoverTrigger>

              <PopoverContent
                className="p-0 w-[--radix-popover-trigger-width] rounded-md border border-gray-200 shadow-lg bg-white"
                align="start"
              >
                <Command>
                  {sortedOptions.length > 5 && (
                    <CommandInput
                      placeholder="Search..."
                      className="px-3 py-2 text-sm"
                    />
                  )}
                  <CommandList className="max-h-60 overflow-auto">
                    <CommandEmpty className="text-center py-3 text-xs text-gray-500">
                      No options found.
                    </CommandEmpty>
                    <CommandGroup>
                      {sortedOptions.map((option) => {
                        const selected = isSelected(category.id, option.id);
                        return (
                          <CommandItem
                            key={option.id}
                            onSelect={() =>
                              toggleSelection(category.id, option.id)
                            }
                            className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer aria-selected:bg-blue-100"
                          >
                            <span className={`text-[#003E78] w-4`}>
                              {selected ? "✓" : ""}
                            </span>
                            <span>{option.name}</span>
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          );
        })
      )}
    </div>
  );
};

export default ResultFilterForm;
