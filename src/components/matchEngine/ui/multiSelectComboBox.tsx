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
import { shimmer, toBase64 } from "@/components/ui/generateBlur";

interface MultiSelectProps {
  name: string;
  description: string;
  options: { id: number; name: string }[];
  image?: string;
  selected: number[];
  onChange: (selected: number[]) => void;
}

export function MultiSelect({
  name,
  description,
  options,
  image,
  selected,
  onChange,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const sortedOptions = React.useMemo(
    () => [...options].sort((a, b) => a.name.localeCompare(b.name)),
    [options]
  );

  const handleSelect = (id: number) => {
    onChange(
      selected.includes(id)
        ? selected.filter((item) => item !== id)
        : [...selected, id]
    );
  };

  const handleRemove = (id: number) => {
    onChange(selected.filter((item) => item !== id));
  };

  const displayImage = image
    ? `/matchengine/images/categories/${image}`
    : "/matchengine/images/categories/default.webp";

  return (
    <section className="flex flex-col md:flex-row gap-4 md:gap-6 p-4 border border-slate-200 rounded-2xl shadow-md bg-white transition-all">
      {/* Mobile Header */}
      <div className="flex md:hidden items-start gap-4">
        <Image
          src={displayImage}
          alt={`${name} image`}
          width={250}
          height={250}
          className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(250, 250)
          )}`}
        />
        <div>
          <h2 className="text-lg font-semibold capitalize text-[#003E78]">
            {name}
          </h2>
          <p className="text-sm text-slate-600">{description}</p>
        </div>
      </div>

      {/* Desktop Image */}
      <div className="hidden md:block">
        <Image
          src={displayImage}
          alt={`${name} image`}
          width={250}
          height={250}
          className="w-48 h-48 object-cover rounded-xl"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(250, 250)
          )}`}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Desktop Header */}
        <div className="hidden md:block mb-3">
          <h2 className="text-xl font-semibold capitalize text-[#003E78]">
            {name}
          </h2>
          <p className="text-sm text-slate-600">{description}</p>
        </div>

        {/* Dropdown */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between rounded-md border border-slate-300 text-left text-[#003E78] font-medium"
            >
              {selected.length
                ? `${selected.length} selected`
                : "Select Options"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 text-[#003E78]" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full md:w-[500px] p-0 z-50 shadow-lg">
            <Command>
              {options.length > 5 && (
                <CommandInput placeholder="Search options..." />
              )}
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {sortedOptions.map((option) => (
                    <CommandItem
                      key={option.id}
                      value={option.name}
                      onSelect={() => handleSelect(option.id)}
                      className="cursor-pointer hover:bg-blue-50 data-[selected=true]:bg-blue-100"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4 text-[#003E78] transition-opacity",
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

        {/* Selected Items */}
        <div className="mt-3 border border-slate-300 rounded-md px-4 py-2 overflow-y-auto max-h-32 bg-slate-50">
          <div className="flex flex-wrap gap-2">
            {selected.length > 0 ? (
              selected.map((id) => {
                const option = options.find((opt) => opt.id === id);
                return (
                  option && (
                    <div
                      key={id}
                      className="flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-[#003E78]/10 text-[#003E78]"
                    >
                      {option.name}
                      <button
                        onClick={() => handleRemove(id)}
                        className="text-[#003E78] hover:text-red-500 transition"
                        aria-label={`Remove ${option.name}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )
                );
              })
            ) : (
              <p className="text-sm text-slate-500">No items selected.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
