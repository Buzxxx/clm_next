"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "@/components/ui/icons";
import { cn } from "@/packages/tailwindClassnameMergeLib";
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
import SelectionDisplayBox from "./selectionDisplayBox";
import Image from "next/image";

import styles from "@/app/contracts/contract.module.css";
import { getDisplayName, toCamelCase } from "../features/contractsObject";
import { shimmer, toBase64 } from "@/components/ui/generateBlur";

interface MultiSelectComboboxProps {
  title: string;
  description: string;
  imagePath: string;
  inputType?: "singleSelect" | "multiSelect" | string;
  choices: { id: number; name: string }[];
  selectedItems: number[];
  onSelectItems: (selectedItems: number[]) => void;
}

export function MultiSelectCombobox({
  title,
  description,
  imagePath,
  inputType,
  choices,
  selectedItems,
  onSelectItems,
}: MultiSelectComboboxProps) {
  const [open, setOpen] = React.useState(false);

  /**
   * Handles the selection of an item. If the item is already selected, removes it from the selected items array.
   * If inputType is singleSelect, only one item can be selected at a time.
   * @param id of the item to select or deselect.
   */
  const handleSelectItem = React.useCallback(
    (id: number) => {
      let updatedItems = [];

      if (inputType === "singleSelect") {
        updatedItems = [id]; // Only keep the current item for singleSelect
        setOpen(false); // Close the dropdown after selecting
      } else {
        updatedItems = selectedItems.includes(id)
          ? selectedItems.filter((selectedItem) => selectedItem !== id)
          : [...selectedItems, id];
      }

      onSelectItems(updatedItems);
    },
    [inputType, selectedItems, onSelectItems]
  );

  /**
   * Handles the removal of a selected item from the `selectedItems` array.
   * @param item The item to remove.
   */
  const handleRemoveItem = React.useCallback(
    (id: number): void => {
      onSelectItems(selectedItems.filter((i) => i !== id));
    },
    [selectedItems, onSelectItems]
  );

  return (
    <div
      className={`flex md:flex-row flex-col md:gap-6 gap-2  rounded-xl shadow-lg p-4  border border-slate-200`}
    >
      <div className="flex gap-4 items-start justify-between md:hidden">
        <Image
          src={imagePath}
          alt="image"
          width={250}
          height={250}
          className="object-cover aspect-square rounded-l-lg max-md:w-20 max-md:h-20"
          placeholder="blur" // Shimmer placeholder
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(250, 250)
          )}`}
        />
        <div className="mb-3">
          <h1 className="md:text-xl text-lg font-medium capitalize">{title}</h1>
          <p className="md:text-sm text-xs">{description}</p>
        </div>
      </div>
      <Image
        src={imagePath}
        alt="image"
        width={250}
        height={250}
        className="object-cover aspect-square rounded-l-lg hidden md:block md:max-h-48"
        placeholder="blur" // Shimmer placeholder
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(250, 250))}`}
      />
      <div className="flex-1 h-fit">
        <div className="mb-3 md:block hidden">
          <h1 className="md:text-xl text-lg font-medium capitalize">{title}</h1>
          <p className="md:text-sm text-xs">{description}</p>
        </div>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            asChild
            className="rounded-none rounded-t-md  border-slate-300"
          >
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={`w-full justify-between flex items-center ${styles.textGray}`}
            >
              {selectedItems.length
                ? `${selectedItems.length} item(s) selected`
                : "Select Function(s)"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="md:w-[500px] ml-auto p-0">
            <Command>
              {choices.length > 5 && <CommandInput placeholder="Search..." />}

              <CommandList>
                <CommandEmpty>Nothing found.</CommandEmpty>
                <CommandGroup>
                  {choices.map((choice) => (
                    <CommandItem
                      key={choice.id}
                      value={getDisplayName(title, choice.id)}
                      onSelect={() => {
                        handleSelectItem(choice.id);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedItems.includes(choice.id)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {choice.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <SelectionDisplayBox
          category={toCamelCase(title)}
          selectedItems={selectedItems}
          onRemoveItem={handleRemoveItem}
        />
      </div>
    </div>
  );
}
