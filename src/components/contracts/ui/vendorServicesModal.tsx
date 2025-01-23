import React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { VendorFeatures } from "../features/contractsObject"
import { Table, TableCell, TableRow } from "@/components/ui/table"
import Image from "next/image"
import { DownloadDropDown } from "./downloadDropDown"

interface VendorServicesModalProps {
  vendorLogo: string
  vendorName: string
  vendorServices: VendorFeatures // Removed vendor and isOpen props
  children: React.ReactNode
}

const VendorServicesModal = ({
  vendorLogo,
  vendorName,
  vendorServices,
  children,
}: VendorServicesModalProps) => {
  const categories = [
    { title: "Capabilities", items: vendorServices.capabilities || [] },
    {
      title: "Organizational Functions",
      items: vendorServices.organizationalFunctions || [],
    },
    { title: "Contract Types", items: vendorServices.contractTypes || [] },
    { title: "Licensing Models", items: vendorServices.licensingModels || [] },
    { title: "Integrations", items: vendorServices.integrations || [] },
  ]

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="pt-4">
        <DialogHeader className="mb-2 flex flex-row justify-between items-start mr-8">
          <DialogTitle className="flex gap-2 items-center justify-start">
            <span>
              <Image height={40} width={40} src={vendorLogo} alt="logo" />
            </span>
            {vendorName}
          </DialogTitle>
          <DownloadDropDown />
        </DialogHeader>
        <DialogDescription>
          <Accordion type="multiple" className="space-y-2">
            {categories.map((category) => (
              <AccordionItem
                key={category.title}
                value={category.title}
                className="border-0"
              >
                <AccordionTrigger className="flex items-center justify-between text-left w-full gap-4 text-sm py-0">
                  <div className="capitalize w-1/2 flex-1 text-gray-800">
                    {category.title}
                  </div>
                </AccordionTrigger>

                <AccordionContent className="py-2  shadow-2xl">
                  <Table className="w-full static overflow-hidden">
                    <TableRow className="w-full py-0">
                      {/* Display sub-items */}
                      <TableCell className="p-0 pl-2">
                        {category.items.map((item: any) => (
                          <div
                            key={item}
                            className="font-light text-xs mb-2 capitalize text-gray-700"
                          >
                            {item}
                          </div>
                        ))}
                      </TableCell>
                    </TableRow>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default VendorServicesModal
