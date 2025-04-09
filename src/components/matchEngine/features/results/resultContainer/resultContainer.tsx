"use client";

import React, { useEffect, useState, Suspense, lazy } from "react";
import { useMatchEngine } from "@/components/matchEngine/features/matchEngineContext";
import { get_matching_list_controller } from "../../resultListObject";
import ResultListItem from "./resultListItem";
import ResultsMenu from "./resultsMenu";
import { Spinner } from "@/components/ui/icons";
import { motion, AnimatePresence } from "framer-motion";

// Lazy load compare modal
const CompareModal = lazy(() => import("../compare/compareModal"));

const ResultContainer = () => {
  const {
    handleUnselectAll,
    objectList,
    setObjectList,
    handleSelect,
    selectedOptions,
    appType,
    selected,
  } = useMatchEngine();

  const [loading, setLoading] = useState(true);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const results = await get_matching_list_controller(
          appType,
          selectedOptions
        );
        console.log("results are -", results);
        setObjectList(results);
        handleUnselectAll();
      } catch (error) {
        console.error("Error fetching vendors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [selectedOptions]);

  return (
    <>
      {/* Main Panel */}
      <section className="w-full bg-white rounded-2xl shadow-md p-5 sm:p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 leading-tight">
              Matched Vendors
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Based on your selected capabilities
            </p>
          </div>
          <ResultsMenu />
        </div>

        {/* Loader / Empty / List */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spinner className="h-6 w-6 text-[#003E78]" />
          </div>
        ) : objectList.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-base font-medium">
              No matching vendors found.
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Try adjusting filters or selected capabilities.
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {objectList.map((vendor) => (
              <li key={vendor.id}>
                <ResultListItem
                  object={{ ...vendor, onSelect: handleSelect }}
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Compare Bar */}
      <AnimatePresence>
        {selected.length >= 2 && !isCompareOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4 z-50"
          >
            <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-4 flex items-center justify-between">
              <span className="text-sm text-gray-700">
                {selected.length} vendors selected
              </span>
              <button
                onClick={() => setIsCompareOpen(true)}
                className="bg-[#003E78] text-white px-4 py-2 text-sm rounded-md hover:bg-[#002B56] transition"
              >
                Compare
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compare Modal */}
      {isCompareOpen && (
        <Suspense
          fallback={<div className="text-center py-10">Loading...</div>}
        >
          <CompareModal
            isOpen={isCompareOpen}
            onClose={() => setIsCompareOpen(false)}
          />
        </Suspense>
      )}
    </>
  );
};

export default ResultContainer;
