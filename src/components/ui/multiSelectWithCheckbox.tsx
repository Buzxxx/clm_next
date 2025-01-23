import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const MultiSelectWithCheckbox = ({
  options,
  label,
  placeholder,
  selectedValues,
  onSelectionChange,
}: {
  options: Record<string, string>; // key is the identifier, value is the label
  label: string;
  placeholder: string;
  selectedValues: string[]; // Prop to control selected values
  onSelectionChange: (selected: string[]) => void;
}) => {
  // Internal state to handle selection
  const [internalSelectedValues, setInternalSelectedValues] = useState<
    string[]
  >([]);

  useEffect(() => {
    if (selectedValues && Array.isArray(selectedValues)) {
      const stringSelectedValues = selectedValues.map((val) => String(val));
      setInternalSelectedValues(stringSelectedValues);
    } else {
      setInternalSelectedValues([]);
    }
  }, [selectedValues]);

  const handleValueChange = (key: string) => {
    const keyAsString = String(key);
    const newSelectedValues = internalSelectedValues.includes(keyAsString)
      ? internalSelectedValues.filter((v) => v !== keyAsString)
      : [...internalSelectedValues, keyAsString];

    setInternalSelectedValues(newSelectedValues);
    onSelectionChange(newSelectedValues);
  };

  return (
    <div>
      <Label className="mb-4">{label}</Label>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            {internalSelectedValues.length > 0
              ? internalSelectedValues.map((key) => options[key]).join(", ")
              : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full max-h-64 overflow-y-auto">
          <div className="flex flex-col space-y-2 p-2">
            {Object.entries(options).map(([key, optionLabel]) => (
              <div
                key={key}
                className="flex items-center cursor-pointer p-2 hover:bg-gray-100"
                onClick={() => handleValueChange(key)}
              >
                <Checkbox
                  checked={internalSelectedValues.includes(String(key))}
                  onCheckedChange={() => handleValueChange(key)}
                  className="mr-2"
                />
                <span>{optionLabel}</span> {/* Display the label */}
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MultiSelectWithCheckbox;
