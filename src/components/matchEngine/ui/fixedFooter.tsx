import React from "react";
import { Button } from "@/components/ui/button";

interface FixedFooterProps {
  button1Handle: () => void;
  button2Handle: () => void;
  button3Handle: () => void;
  currentPage: number;
  paginatedCategories: any[];
  button1Name?: string;
  button2Name?: string;
  button3Name?: string;
}

const FixedFooter: React.FC<FixedFooterProps> = ({
  button1Handle,
  button2Handle,
  button3Handle,
  currentPage,
  paginatedCategories,
  button1Name,
  button2Name,
  button3Name,
}) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center">
      <div
        className={`fixed left-0 bottom-0 z-50 flex justify-end gap-8 items-center bg-gray-300/50 backdrop-blur-3xl py-3 md:px-16 px-4 border w-full mt-8`}
      >
        <div className="justify-center gap-4 flex">
          <Button
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${"bg-red-500 text-white hover:bg-red-600"}`}
            onClick={button3Handle}
          >
            {button3Name ? button3Name : "Previous"}
          </Button>
          <Button
            disabled={currentPage === 0}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              currentPage === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            onClick={button1Handle}
          >
            {button1Name ? button1Name : "Previous"}
          </Button>
          <Button
            onClick={button2Handle}
            disabled={currentPage === paginatedCategories.length - 1}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              currentPage === paginatedCategories.length - 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {button2Name ? button2Name : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FixedFooter;
