import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { ChevronDown, ChevronRight, Check, X } from "@/components/ui/icons";
import CircularProgress from "@/components/ui/icons/circularProgressBar";
import { useMatchEngine } from "@/components/matchEngine/features/matchEngineContext";
import { get_matching_overview_controller } from "./compareObject";
import { Spinner } from "@/components/ui/icons";

type CompareModalProps = {
  isOpen: boolean;
  onClose: () => void;
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

type Option = {
  id: number;
  name: string;
  categoryId: number;
};

type Category = {
  id: number;
  name: string;
  description: string;
  options: Option[];
};

type MatchData = {
  categories: Category[];
  vendors: Vendor[];
};

const CompareModal = ({ isOpen, onClose }: CompareModalProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [openCategories, setOpenCategories] = useState<Set<number>>(new Set());
  const { selectedOptions, selected } = useMatchEngine();
  const [data, setData] = useState<MatchData>({ categories: [], vendors: [] });
  const [error, setError] = useState(false);

  const DEFAULT_LOGO = "/vendor/images/vendor-default-logo.webp";

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const fetchedData = await get_matching_overview_controller(
          selectedOptions,
          selected
        );
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching overview:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (selected.length > 0 && selectedOptions) {
      fetchResults();
    } else {
      setError(true);
    }
  }, [selectedOptions]);

  const toggleCategory = (categoryId: number) => {
    setOpenCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay />
      <DialogContent className="md:min-w-[60%] max-w-3xl p-6 flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
        <DialogTitle className="text-xl font-semibold">Overview</DialogTitle>
        <DialogDescription className="text-gray-600"></DialogDescription>
        {error ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-red-500 text-center">
              Please Select minimum one vendor and one capability to see
              overview
            </p>
          </div>
        ) : isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Spinner className="w-10 h-10 text-gray-500" />
          </div>
        ) : (
          <div>
            <Table className="w-full static overflow-hidden">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3 h-fit">Capabilities</TableHead>
                  {data.vendors.map((vendor) => (
                    <TableHead
                      key={vendor.id}
                      className="text-center font-bold text-xs"
                    >
                      <div className="flex flex-col gap-2 items-center mb-2">
                        <span className="h-14 w-14 rounded-full border border-gray-300 bg-white p-1 flex items-center justify-center shadow-sm mt-1">
                          <Image
                            src={
                              vendor.logo &&
                              vendor.logo.trim() !== "" &&
                              vendor.logo !== null
                                ? vendor.logo
                                : DEFAULT_LOGO
                            }
                            alt={`${vendor.name} Logo`}
                            height={50}
                            width={50}
                            className="h-12 w-12 object-cover rounded-full"
                          />
                        </span>
                        <span className="truncate w-full">{vendor.name}</span>
                        <CircularProgress percentage={vendor.matchPercentage} />
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.categories.map((category) => (
                  <React.Fragment key={category.id}>
                    <TableRow
                      className="cursor-pointer"
                      onClick={() => toggleCategory(category.id)}
                    >
                      <TableCell className=" p-0 pl-2 flex items-center gap-2">
                        {openCategories.has(category.id) ? (
                          <ChevronDown />
                        ) : (
                          <ChevronRight />
                        )}
                        <p className="font-medium capitalize text-sm flex-1">
                          {category.name}
                        </p>
                      </TableCell>
                      {data.vendors.map((vendor) => (
                        <TableCell
                          key={vendor.id}
                          align="center"
                          className="p-2"
                        >
                          <CircularProgress
                            percentage={
                              vendor.categoryMatches.find(
                                (match) => match.categoryId === category.id
                              )?.matchPercentage || 0
                            }
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                    {openCategories.has(category.id) &&
                      category.options.map((option) => (
                        <TableRow
                          key={option.id}
                          className="border-b border-gray-200"
                        >
                          <TableCell className="w-1/3 p-0 pl-8">
                            <p className="font-light text-xs">{option.name}</p>
                          </TableCell>
                          {data.vendors.map((vendor) => (
                            <TableCell
                              key={vendor.id}
                              align="center"
                              className="p-2"
                            >
                              {vendor.categoryMatches
                                .find(
                                  (match) => match.categoryId === category.id
                                )
                                ?.matchedOptions.includes(option.id) ? (
                                <Check className="text-green-500" />
                              ) : (
                                <X className="text-red-500" />
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CompareModal;
