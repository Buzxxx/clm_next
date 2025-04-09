import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";
import ProgressRing from "@/components/ui/customs/progressRing";

// Types
type Category = {
  id: number;
  name: string;
  description: string;
};

type CategoryMatch = {
  categoryId: number;
  matchPercentage: number;
  matchedOptions: number[];
};

type Vendor = {
  id: number;
  name: string;
  logo: string;
  matchPercentage: number;
  categoryMatches: CategoryMatch[];
};

type CapabilityRowProps = {
  category: Category;
  vendors: Vendor[];
  isOpen: boolean;
  toggle: () => void;
};

const CapabilityRow: React.FC<CapabilityRowProps> = ({
  category,
  vendors,
  isOpen,
  toggle,
}) => {
  return (
    <TableRow
      onClick={toggle}
      className="cursor-pointer bg-[#003E78]/10 hover:bg-[#003E78]/20 transition-colors"
    >
      <TableCell className="px-4 py-3 font-medium text-[#003E78] flex items-center gap-2">
        {isOpen ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
        {category.name}
      </TableCell>
      {vendors.map((vendor) => {
        const match = vendor.categoryMatches.find(
          (m) => m.categoryId === category.id
        );
        return (
          <TableCell key={vendor.id} align="center">
            <ProgressRing percentage={match?.matchPercentage ?? 0} size={28} />
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default CapabilityRow;
