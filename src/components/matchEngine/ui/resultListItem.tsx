import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "@/app/contract.module.css";
import CircularProgress from "@/components/ui/icons/circularProgressBar";
import { BadgeCheck, Info } from "@/components/ui/icons";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface ResultListItemProps {
  object: {
    id: string;
    name: string;
    subname?: string;
    logo: string;
    description: string;
    matchPercentage: number;
    isVerified: boolean;
    estYear: number;
    selected: boolean;
    onSelect: (id: string, selected: boolean) => void;
  };
}

const ResultListItem = ({ object }: ResultListItemProps) => {
  const DEFAULT_LOGO = "/vendor/images/vendor-default-logo.webp";
  const {
    id = "",
    name = "Unknown Vendor",
    subname = "subname",
    logo = DEFAULT_LOGO,
    description = "This is a default description",
    matchPercentage = 0,
    isVerified = true,
    estYear = 2010,
    selected = false,
    onSelect = () => {},
  } = object;

  const router = useRouter();

  const openVendorDetails = () => {
    router.push(`/contracts/vendor/${id}`);
  };

  const openMatchModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Open modal for match percentage");
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelect(id, e.target.checked);
  };

  return (
    <TooltipProvider>
      <div className="relative flex flex-col gap-4 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white border border-gray-200 mb-6">
        {/* ✅ Fixed Verified Badge Positioning - No Overlap */}
        {isVerified && (
          <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-3 py-1 rounded-md flex items-center gap-1 shadow">
            <BadgeCheck size={14} /> Verified
          </div>
        )}

        {/* Top Section - Checkbox & Vendor Info */}
        <div className="flex items-center justify-between gap-4 mt-3">
          {/* Selection Checkbox */}
          <Input
            type="checkbox"
            className="bg-transparent border border-gray-300 h-4 w-4"
            onChange={handleCheckboxChange}
            checked={selected}
          />

          {/* Vendor Info */}
          <div className="flex justify-between items-center flex-1">
            <div
              className="flex flex-col gap-2 w-[85%]"
              onClick={openVendorDetails}
            >
              <div className="flex items-center gap-4">
                {/* Vendor Logo - Now Properly Positioned */}
                <span className="h-14 w-14 rounded-full border border-gray-300 bg-white p-1 flex items-center justify-center shadow-sm mt-1">
                  <Image
                    src={logo}
                    alt={`${name} logo`}
                    width={160}
                    height={160}
                    className="rounded-full w-full"
                  />
                </span>

                {/* Vendor Details - Now Spaced from Verified Badge */}
                <div className="mt-1">
                  <h4 className="text-lg font-semibold">{name}</h4>
                  {subname && (
                    <p className="text-xs text-gray-500">{subname}</p>
                  )}
                  <p className="text-xs text-gray-400">Estd. {estYear}</p>
                </div>
              </div>
            </div>

            {/* ✅ Clickable Match % with Tooltip - Aligned */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="flex flex-col gap-2 items-center w-[20%] cursor-pointer"
                  onClick={openMatchModal}
                >
                  <p className="uppercase text-xs text-center text-gray-500 font-medium">
                    Match %
                  </p>
                  <CircularProgress
                    percentage={matchPercentage}
                    size={42}
                    strokeWidth={4}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to view match details</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Description (Limited with Read More) */}
        <div className="text-sm text-gray-700 px-2 line-clamp-2 leading-relaxed">
          {description}{" "}
          <span className="text-blue-500 cursor-pointer hover:underline">
            Read More
          </span>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ResultListItem;
