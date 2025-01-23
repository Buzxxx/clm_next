/**
 * @path src/components/contracts/features/contractsFilter.tsx
 */


import React, { useEffect, useState } from "react"
import ContractsFilterUI from "@/components/contracts/ui/contractsFilterUI"
import { stepInputFields, SelectedOptions } from "./contractsObject"

// Define props for ContractsFilter
interface ContractsFilterProps {
  selectedOptions: SelectedOptions
  handleSelectOption: (
    title: keyof SelectedOptions,
    selectedItems: number[]
  ) => void
}

const ContractsFilter: React.FC<ContractsFilterProps> = ({ selectedOptions, handleSelectOption }) => {
  const [selectedChoices, setSelectedChoices] = useState<SelectedOptions>(selectedOptions)
  const [openPopover, setOpenPopover] = useState<Record<string, boolean>>({})

  useEffect(() => {
    setSelectedChoices(selectedOptions)
  }, [selectedOptions])

  const memoizedHandleCheckboxChange = React.useCallback(
    (stepTitle: keyof SelectedOptions, choice: number) => {
      setSelectedChoices((prevSelectedChoices) => {
        const selectedSet = new Set(prevSelectedChoices[stepTitle] || [])

        if (selectedSet.has(choice)) {
          selectedSet.delete(choice)
        } else {
          selectedSet.add(choice)
        }

        const updatedChoices = {
          ...prevSelectedChoices,
          [stepTitle]: Array.from(selectedSet),
        }

        handleSelectOption(stepTitle, Array.from(selectedSet))
        return updatedChoices
      })
    },
    [handleSelectOption, selectedOptions]
  )

  const memoizedHandleOpenChange = React.useCallback(
    (stepTitle: string, isOpen: boolean) => {
      setOpenPopover((prevState) => ({
        ...prevState,
        [stepTitle]: isOpen,
      }))
    },
    []
  )

  return (
    <ContractsFilterUI
      stepInputFields={stepInputFields}
      selectedChoices={selectedChoices}
      openPopover={openPopover}
      handleOpenChange={memoizedHandleOpenChange}
      handleCheckboxChange={memoizedHandleCheckboxChange}
    />
  )
}

export default ContractsFilter
