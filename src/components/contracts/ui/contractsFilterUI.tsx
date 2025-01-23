// File: /components/ui/ContractsFilterUI.tsx

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "@/components/ui/icons"
import { Label } from "@/components/ui/label"
import styles from "@/app/contracts/contract.module.css"
import {
  getDisplayName,
  SelectedOptions,
  toCamelCase,
} from "../features/contractsObject"

interface ContractsFilterUIProps {
  stepInputFields: { title: string; choices: { id: number; name: string }[] }[]
  selectedChoices: SelectedOptions
  openPopover: { [key: string]: boolean }
  handleOpenChange: (stepTitle: string, isOpen: boolean) => void
  handleCheckboxChange: (
    stepTitle: keyof SelectedOptions,
    choice: number
  ) => void
}

const ContractsFilterUI: React.FC<ContractsFilterUIProps> = ({
  stepInputFields,
  selectedChoices,
  openPopover,
  handleOpenChange,
  handleCheckboxChange,
}) => {
  return (
    <div className={`w-full p-4 ${styles.bgPrimary} rounded-xl shadow-lg`}>
      <div>
        {stepInputFields.map((step) => (
          <div className="mb-6" key={step.title}>
            <Label
              className={`text-xs mb-1 block uppercase ${styles.textGray}`}
            >
              {step.title}
            </Label>

            <ul>
              <li className="flex items-center mb-2 text-sm font-medium">
                <Popover
                  open={!!openPopover[step.title]}
                  onOpenChange={(isOpen) =>
                    handleOpenChange(step.title, isOpen)
                  }
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={!!openPopover[step.title]}
                      className={`w-full justify-between flex items-center text-sm ${
                        selectedChoices[
                          toCamelCase(step.title) as keyof SelectedOptions
                        ]?.length
                          ? styles.textPrimary
                          : styles.textGray
                      }`}
                    >
                      {selectedChoices[
                        toCamelCase(step.title) as keyof SelectedOptions
                      ]?.length
                        ? `${
                            selectedChoices[
                              toCamelCase(step.title) as keyof SelectedOptions
                            ].length
                          } item(s) selected`
                        : "Select Function(s)"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      {step.choices.length > 5 && (
                        <CommandInput placeholder="Search framework..." />
                      )}

                      <CommandList>
                        <CommandEmpty>Nothing found.</CommandEmpty>
                        <CommandGroup>
                          {step.choices.map((choice) => (
                            <CommandItem
                              key={choice.id}
                              value={getDisplayName(
                                toCamelCase(
                                  step.title
                                ) as keyof SelectedOptions,
                                choice.id
                              )}
                              onSelect={() =>
                                handleCheckboxChange(
                                  toCamelCase(
                                    step.title
                                  ) as keyof SelectedOptions,
                                  choice.id
                                )
                              }
                              className="border-b border-slate-200 text-sm"
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${
                                  selectedChoices[
                                    toCamelCase(
                                      step.title
                                    ) as keyof SelectedOptions
                                  ]?.includes(choice.id)
                                    ? "opacity-100"
                                    : "opacity-0"
                                }`}
                              />
                              {choice.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContractsFilterUI
