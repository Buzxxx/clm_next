"use client";

import React from "react";
import Results from "../features/results/results";
import AppFeature from "../features/app/appFeatures/appFeature";
import { useMatchEngine } from "@/components/matchEngine/features/matchEngineContext";
import { Spinner } from "@/components/ui/icons";

const ResultLayout = () => {
  const { appType, isLoading } = useMatchEngine();
  return isLoading ? (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <Spinner className="w-10 h-10 animate-spin" />
      </div>
    </>
  ) : !appType ? (
    <AppFeature ref="vendor" />
  ) : (
    <Results />
  );
};

export default ResultLayout;
