/**
 * @path src/components/contracts/layout/contractsLayout.tsx
 */

"use client";
import React, { useEffect } from "react";
import ContractsHeaderTab from "../features/contractsHeaderTab";
import ContractsNavbar from "../features/contractsNavbar";
import { defaultSelectedOptions } from "../features/contractsObject";
import Step1 from "../features/step1";
import Step2 from "../features/step2";
import ResultsTab from "../features/resultsTab";
import ContractsFooter from "../features/contractsFooter";

const ContractsLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);
  const [selectedOptions, setSelectedOptions] = React.useState(
    defaultSelectedOptions
  );
  const [selectedVendors, setSelectedVendors] = React.useState<string[]>([]);
  const steps = [
    <Step1
      key={0}
      selectedItems={selectedOptions}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      setSelectedOptions={setSelectedOptions}
    />,
    <Step2
      key={1}
      selectedItems={selectedOptions}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      setSelectedOptions={setSelectedOptions}
    />,
    <ResultsTab
      key={2}
      setActiveTab={setActiveTab}
      setSelectedOptions={setSelectedOptions}
      selectedOptions={selectedOptions}
      selectedVendors={selectedVendors}
      setSelectedVendors={setSelectedVendors}
      isDrawerOpen={isDrawerOpen}
      setIsDrawerOpen={setIsDrawerOpen}
    />,
  ];

  useEffect(() => {
    console.log("calling category");

    fetch("/api/v1/categories")
      .then((response) => {
        console.log("Response status:", response.status);
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        console.log("ending fetch"); // Now logs after data is received
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
        console.log("ending fetch"); // Logs even if there's an error
      });
  }, []);

  return (
    <div className={`bg-gray-100 overflow-hidden w-full relative pb-12`}>
      <div className="bg-blue-100 text-blue-800 p-4 rounded-md shadow-md mb-4">
        This is a test div for production. We are testing!
      </div>
      <ContractsNavbar />
      <div className=" flex flex-col md:gap-12  min-h-screen overflow-hidden w-full ">
        <ContractsHeaderTab
          activeStep={activeTab}
          setActiveStep={setActiveTab}
        />
        <div className="md:px-16 px-4 relative">{steps[activeTab]}</div>
      </div>
      <ContractsFooter />
    </div>
  );
};

export default ContractsLayout;
