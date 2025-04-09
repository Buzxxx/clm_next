import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { CheckCircle, XCircle } from "lucide-react";

// Types
type Option = {
  id: number;
  name: string;
  categoryId: number;
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

type OptionRowProps = {
  option: Option;
  vendors: Vendor[];
  categoryId: number;
};

const OptionRow: React.FC<OptionRowProps> = ({ option, vendors, categoryId }) => {
  return (
    <TableRow className="border-t border-gray-100">
      <TableCell className="pl-10 py-2 text-gray-600 text-xs">
        {option.name}
      </TableCell>
      {vendors.map((vendor) => {
        const matched = vendor.categoryMatches
          .find((match) => match.categoryId === categoryId)
          ?.matchedOptions.includes(option.id);

        return (
          <TableCell key={vendor.id} align="center">
            {matched ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-400" />
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default OptionRow;
