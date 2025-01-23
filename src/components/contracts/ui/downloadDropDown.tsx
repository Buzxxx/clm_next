import React from "react"
import { Download } from "@/components/ui/icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const DownloadDropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`px-4 py-2 flex gap-2 items-center rounded-md  border`}
      >
        <Download size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-8 drop-shadow-xl">
        <DropdownMenuLabel>Download As</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>PDF</DropdownMenuItem>
        <DropdownMenuItem>JPG</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
