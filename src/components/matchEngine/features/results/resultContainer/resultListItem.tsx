import { useState, useEffect } from "react";
import Image from "next/image";
import CircularProgress from "@/components/ui/icons/circularProgressBar";
import { BadgeCheck } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import VendorModal from "./vendorModal";

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal and update the URL without navigating
  const openVendorDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
    window.history.pushState(null, "", `/vendor/${id}`); // Updates the URL without navigating
  };

  // Function to close the modal and revert the URL
  const closeModal = () => {
    setIsModalOpen(false);
    window.history.pushState(null, "", "/");
  };

  // Handle back navigation when modal is open
  useEffect(() => {
    const handlePopState = () => {
      setIsModalOpen(false);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <TooltipProvider>
      <div className="relative flex flex-col gap-4 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white border border-gray-200 mb-6">
        {isVerified && (
          <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-3 py-1 rounded-md flex items-center gap-1 shadow">
            <BadgeCheck size={14} /> Verified
          </div>
        )}

        <div className="flex items-center justify-between gap-4 mt-3">
          <Input
            type="checkbox"
            className="bg-transparent border border-gray-300 h-4 w-4"
            onChange={(e) => onSelect(id, e.target.checked)}
            checked={selected}
          />

          <div className="flex justify-between items-center flex-1">
            <div className="flex flex-col gap-2 w-[85%]">
              <div className="flex items-center gap-4">
                <span className="h-14 w-14 rounded-full border border-gray-300 bg-white p-1 flex items-center justify-center shadow-sm mt-1">
                  <Image
                    src={logo}
                    alt={`${name} logo`}
                    width={160}
                    height={160}
                    className="rounded-full w-full"
                  />
                </span>

                <div className="mt-1">
                  <h4
                    className="text-lg font-semibold "
                    onClick={openVendorDetails}
                  >
                    {name}
                  </h4>
                  {subname && (
                    <p className="text-xs text-gray-500">{subname}</p>
                  )}
                  <p className="text-xs text-gray-400">Estd. {estYear}</p>
                </div>
              </div>
            </div>

            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="flex flex-col gap-2 items-center w-[20%] cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Open modal for match percentage");
                  }}
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

        <div className="text-sm text-gray-700 px-2 line-clamp-2 leading-relaxed">
          {description}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={openVendorDetails}
          >
            Read More
          </span>
        </div>
      </div>

      {/* Vendor Modal */}
      {isModalOpen && (
        <VendorModal isOpen={isModalOpen} onClose={closeModal} id={id} />
      )}
    </TooltipProvider>
  );
};

export default ResultListItem;
