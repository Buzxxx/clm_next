import React from "react";
import Image from "next/image";
import { TableHead } from "@/components/ui/table";
import ProgressRing from "@/components/ui/customs/progressRing";

// Types
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

type VendorHeaderCellProps = {
  vendor: Vendor;
};

const DEFAULT_LOGO = "vendor-default-logo.webp";

const VendorHeaderCell: React.FC<VendorHeaderCellProps> = ({ vendor }) => {
  return (
    <TableHead className="text-center px-4 min-w-[120px]">
      <div className="flex flex-col items-center gap-2 pb-4">
        {/* Tooltip on image */}
        <div title={vendor.name}>
          <Image
            src={`/vendor/images/logo/${vendor.logo || DEFAULT_LOGO}`}
            alt={vendor.name}
            width={48}
            height={48}
            className="rounded-full border object-cover"
          />
        </div>

        {/* Tooltip on name */}
        <span
          title={vendor.name}
          className="text-xs font-medium text-gray-800 truncate max-w-[6rem]"
        >
          {vendor.name}
        </span>

        {/* Tooltip on match percentage */}
        <div
          title={`${vendor.name} matches ${
            vendor.matchPercentage ?? 0
          }% of your selected criteria`}
        >
          <ProgressRing percentage={vendor.matchPercentage ?? 0} size={32} />
        </div>
      </div>
    </TableHead>
  );
};

export default VendorHeaderCell;
