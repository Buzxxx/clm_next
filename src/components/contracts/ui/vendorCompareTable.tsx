import React, { useState } from "react"
import Image from "next/image"
import {
  SelectedOptions,
  filterSelectedOptions,
  getDisplayName,
  Vendor,
  camelCaseToLowercase,
} from "@/components/contracts/features/contractsObject"
import {
  Download,
  CircularProgress,
  ChevronDown,
  Check,
  X,
} from "@/components/ui/icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import styles from "@/app/contracts/contract.module.css"
import { DownloadDropDown } from "./downloadDropDown"

const VendorCompareTable = ({
  selectedOptions,
  vendorComparisonData,
}: {
  selectedOptions: SelectedOptions
  vendorComparisonData: any
}) => {
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set())

  const filteredSelectedOptions = filterSelectedOptions(selectedOptions)
  const filteredSelectedOptionsKeys = Object.keys(filteredSelectedOptions)

  // Toggle accordion for categories
  const toggleAccordion = (category: string) => {
    setOpenCategories((prev) => {
      const newCategories = new Set(prev)
      if (newCategories.has(category)) {
        newCategories.delete(category)
      } else {
        newCategories.add(category)
      }
      return newCategories
    })
  }

  return (
    <Table className=" w-full  static overflow-hidden ">
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/3 h-fit">{/* Download button */}</TableHead>
          {vendorComparisonData.map((vendor: Vendor) => (
            <TableHead
              key={vendor.id}
              className="text-center font-bold text-xs"
              style={{ width: `${67 / vendorComparisonData.length}%` }}
            >
              <div className="flex flex-col gap-2 items-center justify-start mb-2">
                <Image
                  src={vendor.logo}
                  alt="vendor logo"
                  height={120}
                  width={120}
                  className="h-12 w-12 object-cover"
                />
                {vendor.vendorName}
                <CircularProgress percentage={vendor.vendorMatchPercentage} />
              </div>
            </TableHead>
          ))}

          <TableHead align="center">
            <DownloadDropDown />
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="h-full overflow-auto">
        {filteredSelectedOptionsKeys.map((key) => {
          const isOpen = openCategories.has(key)

          return (
            <React.Fragment key={key}>
              {/* Primary row for category name and average match percentages */}
              <TableRow
                className={`cursor-pointer   ${isOpen && "border-0"}`}
                onClick={() => toggleAccordion(key)}
              >
                <TableCell className="w-1/3 p-0 pl-2">
                  <div className="flex gap-2 items-start">
                    <ChevronDown />
                    <p className="font-medium capitalize text-sm flex-1">
                      {camelCaseToLowercase(key)}
                    </p>
                  </div>
                </TableCell>

                {vendorComparisonData.map((vendor: any) => (
                  <TableCell
                    key={vendor.id}
                    align="center"
                    className="items-center justify-center p-0 py-2"
                    style={{ width: `${67 / vendorComparisonData.length}%` }}
                  >
                    <CircularProgress
                      percentage={vendor.breakdown[key]?.percentage || 0}
                    />
                  </TableCell>
                ))}
              </TableRow>

              {/* Secondary row for sub-items comparison (accordion content) */}
              {isOpen && (
                <TableRow className="border-b border-gray-200  w-full ml-4  ">
                  {/* Display the sub-items vertically for each vendor */}
                  <TableCell className="w-1/3 p-0 pl-8">
                    {filteredSelectedOptions[key].map((item: number) => (
                      <div
                        key={item}
                        className="font-light text-xs mb-2 capitalize"
                      >
                        {getDisplayName(key, item)}
                      </div>
                    ))}
                  </TableCell>

                  {vendorComparisonData.map((vendor: any) => (
                    <TableCell
                      key={vendor.id}
                      className=" justify-start items-center p-0 pt-2"
                      align="center"
                    >
                      {filteredSelectedOptions[key].map((item: number) => {
                        const vendorCategoryValues =
                          vendor.breakdown[key]?.breakdown || []
                        return (
                          <div key={item} className="mb-2">
                            {vendorCategoryValues[item] ? (
                              <Check color="green" size={18} />
                            ) : (
                              <X color="red" size={18} />
                            )}
                          </div>
                        )
                      })}
                    </TableCell>
                  ))}
                </TableRow>
              )}
            </React.Fragment>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default VendorCompareTable
