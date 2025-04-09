"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { get_matching_overview_controller } from "../compareObject";
import { useMatchEngine } from "@/components/matchEngine/features/matchEngineContext";
import VendorHeaderCell from "./vendorHeaderCellLayout";
import CapabilityRow from "./capabilityRowLayout";
import OptionRow from "./optionRow";

// Types
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

type MatchData = {
  categories: Category[];
  vendors: Vendor[];
};

const CompareBody: React.FC = () => {
  const { selected, selectedOptions } = useMatchEngine();
  const [data, setData] = useState<MatchData>({ categories: [], vendors: [] });
  const [openCategories, setOpenCategories] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (selected.length && Object.keys(selectedOptions).length) {
          const result = await get_matching_overview_controller(
            selectedOptions,
            selected
          );
          console.log("result is  -", result);
          setData(result);
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching overview:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selected, selectedOptions]);

  const toggleCategory = (id: number) => {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  if (error) {
    return (
      <div className="text-center text-red-600 py-20 font-semibold">
        Please select at least one vendor and one capability.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="flex-1  sm:p-6">
      <div className="max-h-[70vh] overflow-y-auto ">
        <Table className="w-full table-fixed text-sm">
          <TableHeader>
            <TableRow className="text-center align-middle">
              <TableHead className="w-1/3 px-4 py-3 text-left text-gray-800 font-semibold">
                Capability
              </TableHead>
              {data.vendors.map((vendor) => (
                <VendorHeaderCell key={vendor.id} vendor={vendor} />
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.categories.map((category) => (
              <React.Fragment key={category.id}>
                <CapabilityRow
                  category={category}
                  vendors={data.vendors}
                  isOpen={openCategories.has(category.id)}
                  toggle={() => toggleCategory(category.id)}
                />
                {openCategories.has(category.id) &&
                  category.options.map((option) => (
                    <OptionRow
                      key={option.id}
                      option={option}
                      vendors={data.vendors}
                      categoryId={category.id}
                    />
                  ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CompareBody;
