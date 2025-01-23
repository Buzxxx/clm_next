/**
 * @path src/components/contracts/features/resulsTab.tsx
 */

import React, { Dispatch, SetStateAction } from "react";
import VendorResultDisplayCard from "../ui/vendorResultDisplayCard";
import ContractsFilter from "./contractsFilter";
import {
  calculateFeatureMatchPercentage,
  calculateVendorAverageMatchPercentage,
  calculateVendorMatchBreakdown,
  defaultSelectedOptions,
  getVendorFeatures,
  getVendorLocation,
  isSelectedOptionsEmpty,
  SelectedOptions,
  Vendor,
} from "./contractsObject";
import { Button } from "@/components/ui/button";
import { X } from "@/components/ui/icons";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useToast } from "@/components/ui/use-toast";

import styles from "@/app/contracts/contract.module.css";
import VendorCompareModal from "./vendorCompareModal";
import { vendors } from "../noSql";

interface ResultsTabProps {
  setActiveTab: Dispatch<SetStateAction<number>>;
  selectedOptions: SelectedOptions;
  setSelectedOptions: Dispatch<SetStateAction<SelectedOptions>>;
  selectedVendors: string[];
  setSelectedVendors: Dispatch<SetStateAction<string[]>>;
  isDrawerOpen: boolean;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
}
const ResultsTab: React.FC<ResultsTabProps> = ({
  setActiveTab,
  selectedOptions,
  setSelectedOptions,
  selectedVendors,
  setSelectedVendors,
  isDrawerOpen,
  setIsDrawerOpen,
}) => {
  const { toast } = useToast();

  // Store the vendors data in a state variable so that we can update it
  // when the user selects new options
  const [vendorsData, setVendorsData] = React.useState<Vendor[]>(vendors);

  // State to control the visibility of vendorComparisonModal
  const [showComparison, setShowComparison] = React.useState<boolean>(false);

  // Store the data for the comparison modal in a state variable
  const [comparisonData, setComparisonData] = React.useState<
    { vendorName: string; breakdown: {} }[]
  >([]);

  // This function is called when the user selects new options in the filter
  // It updates the selected options state variable and triggers a re-render
  const handleSelectOption = React.useCallback(
    (title: keyof SelectedOptions, items: number[]) =>
      setSelectedOptions((prevSelected) => ({
        ...prevSelected,
        [title]: items,
      })),
    []
  );

  // This function resets the state variables to their default values
  const handleReset = React.useCallback(() => {
    setActiveTab(0);
    setSelectedOptions(defaultSelectedOptions);
  }, [setActiveTab, setSelectedOptions]);

  // This function is called when the user clicks the compare button
  // It calculates the match breakdown for the selected vendors and shows the modal
  const handleShowComparison = React.useCallback(() => {
    if (isSelectedOptionsEmpty(selectedOptions)) {
      toast({
        title: "Please select an option!",
        variant: "destructive",
        description: " Select at least one option/filter to compare vendors.",
        className: "sm:top-0 top-0",
      });
    } else {
      const data = calculateVendorMatchBreakdown(
        selectedOptions,
        selectedVendors
      );
      setComparisonData(data);
      setShowComparison(true);
    }
  }, [selectedOptions, selectedVendors]);

  // This function is called when the user selects a vendor in the results tab
  // It updates the selected vendors state variable
  const handleSelectVendor = React.useCallback(
    (vendorId: string, isSelected: boolean) =>
      setSelectedVendors((prevSelected) =>
        isSelected
          ? [...prevSelected, vendorId]
          : prevSelected.filter((id) => id !== vendorId)
      ),
    []
  );

  // This effect is triggered when the user selects new options in the filter
  // It updates the vendors data state variable with the new match percentages
  React.useEffect(() => {
    const updatedVendorsData =
      calculateVendorAverageMatchPercentage(selectedOptions);

    setVendorsData(updatedVendorsData);
  }, [selectedOptions]);

  return (
    <>
      {/* Drawer for filter component on mobile devices */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="w-screen top-0 mt-2 md:hidden h-full">
          <div className="flex justify-between items-center px-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Button
              className="bg-transparent"
              onClick={() => setIsDrawerOpen(false)}
            >
              <X color="gray" />
            </Button>
          </div>

          <ContractsFilter
            selectedOptions={selectedOptions}
            handleSelectOption={handleSelectOption}
          />
        </DrawerContent>
      </Drawer>

      <div className="flex min-h-screen gap-8 pb-20">
        <div className="md:w-1/4 w-full z-40 max-h-screen md:sticky hidden md:block">
          <h2 className="text-2xl font-semibold mb-2">Search Results</h2>

          <ContractsFilter
            selectedOptions={selectedOptions}
            handleSelectOption={handleSelectOption}
          />
        </div>

        <div className="flex-1 flex flex-col gap-4 md:w-3/4 ml-auto max-md:mt-4">
          {vendorsData.map((vendor) => {
            const vendorLocation = getVendorLocation(vendor.regions);
            const vendorFeatures = getVendorFeatures(vendor);

            return (
              <VendorResultDisplayCard
                key={vendor.id}
                vendorId={vendor.id}
                isSelected={selectedVendors.includes(vendor.id)}
                onSelectVendor={handleSelectVendor}
                vendorName={vendor.vendorName}
                vendorLogo={vendor.logo}
                vendorDesc={vendor.description}
                vendorLocation={vendorLocation}
                vendorServices={vendorFeatures}
                vendorMatchPercentage={vendor.vendorMatchPercentage}
                isVerified={vendor.isVerified}
                estYr={vendor.estYr}
                selectedOptions={selectedOptions}
              />
            );
          })}
        </div>
      </div>

      <div
        className={`fixed left-0 bottom-0 z-50 flex justify-end gap-8 items-center ${styles.bgAccentMuted} bg-gray-300/50 backdrop-blur-3xl py-3 md:px-16 px-4 border w-full`}
      >
        <div className="justify-center gap-4 flex">
          {/* Filter button that opens the drawer on mobile devices */}
          <Button
            className={`${styles.btnSecondary} h-fit md:hidden`}
            onClick={() => setIsDrawerOpen(true)}
          >
            Filter
          </Button>
          {/* Reset button that resets the state variables to their default values */}
          <Button
            className={`${styles.btnSecondary} h-fit`}
            onClick={handleReset}
          >
            Reset
          </Button>
          {/* Compare button that shows the comparison modal */}
          <Button
            className={`${styles.btnSecondary} h-fit`}
            disabled={selectedVendors.length < 2}
            onClick={handleShowComparison}
          >
            Compare
          </Button>
        </div>
      </div>

      <VendorCompareModal
        vendorComparisonData={comparisonData}
        showComparision={showComparison}
        setShowComparison={setShowComparison}
        selectedOptions={selectedOptions}
      />
    </>
  );
};

export default ResultsTab;
