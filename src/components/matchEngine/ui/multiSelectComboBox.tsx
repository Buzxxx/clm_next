"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "@/components/ui/icons";
import { cn } from "@/packages/tailwind/tailwindClassnameMergeLib";
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
import Image from "next/image";
import styles from "@/app/contract.module.css";
import { shimmer, toBase64 } from "@/components/ui/generateBlur";

interface MultiSelectProps {
  name: string;
  description: string;
  options: { id: number; name: string }[];
  selected: number[];
  onChange: (selected: number[]) => void;
}

export function MultiSelect({
  name,
  description,
  options,
  selected,
  onChange,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (id: number) => {
    const updatedSelection = selected.includes(id)
      ? selected.filter((item) => item !== id)
      : [...selected, id];
    onChange(updatedSelection);
  };

  const handleRemove = (id: number) => {
    onChange(selected.filter((item) => item !== id));
  };

  return (
    <div className="flex md:flex-row flex-col md:gap-6 gap-2 rounded-xl shadow-lg p-4 border border-slate-200">
      <div className="flex gap-4 items-start justify-between md:hidden">
        <Image
          src="/contracts/images/capability.png"
          alt="default"
          width={250}
          height={250}
          className="object-cover aspect-square rounded-l-lg max-md:w-20 max-md:h-20"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(250, 250)
          )}`}
        />
        <div className="mb-3">
          <h1 className="md:text-xl text-lg font-medium capitalize">{name}</h1>
          <p className="md:text-sm text-xs">{description}</p>
        </div>
      </div>
      <Image
        src="/contracts/images/capability.png"
        alt="default"
        width={250}
        height={250}
        className="object-cover aspect-square rounded-l-lg hidden md:block md:max-h-48"
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(250, 250))}`}
      />
      <div className="flex-1 h-fit">
        <div className="mb-3 md:block hidden">
          <h1 className="md:text-xl text-lg font-medium capitalize">{name}</h1>
          <p className="md:text-sm text-xs">{description}</p>
        </div>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            asChild
            className="rounded-none rounded-t-md border-slate-300"
          >
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={`w-full justify-between flex items-center ${styles.textGray}`}
            >
              {selected.length
                ? `${selected.length} item(s) selected`
                : "Select Options"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="md:w-[500px] ml-auto p-0">
            <Command>
              {options.length > 5 && <CommandInput placeholder="Search..." />}
              <CommandList>
                <CommandEmpty>Nothing found.</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.id}
                      value={option.name}
                      onSelect={() => handleSelect(option.id)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selected.includes(option.id)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {option.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Styled Selected Items Display */}
        <div
          className={`${styles.selectionDisplayBox} border border-slate-300 mt-2 py-2 px-4 overflow-x-clip overflow-y-auto h-full`}
        >
          <div className="flex gap-2 flex-wrap md:h-16 h-10">
            {selected.length > 0 ? (
              selected.map((id) => {
                const option = options.find((opt) => opt.id === id);
                return option ? (
                  <div
                    key={id}
                    className={`${styles.textPrimary} hover:bg-white px-2 py-1 rounded-full text-xs flex items-center justify-between gap-2 h-fit w-fit bg-slate-300/40`}
                  >
                    {option.name}
                    <button
                      type="button"
                      onClick={() => handleRemove(id)}
                      className="ml-2"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : null;
              })
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className={`${styles.textMuted} text-sm`}>
                  No items selected
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
