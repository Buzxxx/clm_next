import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  calculateVendorMatchBreakdown,
  camelCaseToLowercase,
  filterSelectedOptions,
  getDisplayName,
  SelectedOptions,
  Vendor,
} from "../features/contractsObject"
import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Table, TableCell, TableRow } from "@/components/ui/table"
import { Check, Download, X } from "lucide-react"
import DynamicProgressBar from "./dynamicProgressBar"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { DownloadDropDown } from "./downloadDropDown"

const PercentagePopover = ({
  vendorId,
  selectedOptions,
  children,
}: {
  vendorId: string
  selectedOptions: SelectedOptions
  children: React.ReactNode
}) => {
  // Use a state for vendorData that will be updated
  const [vendorData, setVendorData] = useState<Vendor[]>([])

  // useEffect to recalculate vendorData when selectedOptions or vendorId changes
  useEffect(() => {
    const result = calculateVendorMatchBreakdown(selectedOptions, [vendorId])
    setVendorData(result)
  }, [vendorId, selectedOptions]) // Runs when vendorId or selectedOptions changes

  // Filtered selected options and their keys
  const filteredSelectedOptions = filterSelectedOptions(selectedOptions)
  const filteredSelectedOptionsKeys = Object.keys(filteredSelectedOptions)

  return (
    <Dialog>
      <DialogTrigger
        disabled={
          !vendorData ||
          vendorData.length === 0 ||
          filteredSelectedOptionsKeys.length === 0
        }
      >
        {children}
      </DialogTrigger>
      {/* Use children as trigger */}

      <DialogContent className="pr-10 pt-4 overflow-auto max-h-[90vh]">
        <DialogHeader className="mb-4 flex flex-row  justify-between items-center">
          <DialogTitle className="flex gap-2 items-center">
            <span>
              <Image
                height={40}
                width={40}
                src={vendorData[0]?.logo}
                alt="logo"
              />
            </span>
            {vendorData[0]?.vendorName}
          </DialogTitle>
          <DownloadDropDown />
        </DialogHeader>

        {vendorData[0] && (
          <Accordion type="multiple" className="space-y-2">
            {/* Multiple accordions */}
            {filteredSelectedOptionsKeys.map((key) => {
              const categoryMatch =
                vendorData[0]?.breakdown?.[key]?.percentage || 0
              return (
                <AccordionItem key={key} value={key} className="border-0">
                  <AccordionTrigger className="flex items-center justify-between text-left w-full gap-4 text-sm py-0  ">
                    <div className="capitalize w-1/2 flex-1">
                      {camelCaseToLowercase(key)}
                    </div>
                    {/* Progress Bar for category match */}
                    <div className="w-fit flex-1">
                      <DynamicProgressBar percentage={categoryMatch} />
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="shadow-2xl">
                    <Table className=" w-full ">
                      <TableRow className="w-full py-0 ">
                        {/* Display sub-items */}
                        <TableCell className=" p-0 pl-2">
                          {filteredSelectedOptions[key].map((item: number) => (
                            <div
                              key={item}
                              className="font-light text-xs mb-2 capitalize"
                            >
                              {getDisplayName(key, item)}
                            </div>
                          ))}
                        </TableCell>

                        {/* Match status for sub-items */}
                        {vendorData.map((vendor: any) => (
                          <TableCell
                            key={vendor.id}
                            className="justify-end items-center p-0 pt-2"
                            align="right"
                          >
                            {filteredSelectedOptions[key].map(
                              (item: number) => {
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
                              }
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    </Table>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default PercentagePopover
