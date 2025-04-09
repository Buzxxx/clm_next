"use client";

import React from "react";
import { useMatchEngine } from "@/components/matchEngine/features/matchEngineContext";
import { Spinner } from "@/components/ui/icons";
import AppFeature from "../features/app/appFeatures/appFeature";
import MatchEngine from "../features/search/matchEngine";

const MatchEngineSearchLayout: React.FC = () => {
  const { appType, isLoading } = useMatchEngine();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (appType) {
    return <MatchEngine />;
  }

  return (
    <section
      id="match-engine-start"
      className="relative scroll-mt-32 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8  text-center"
    >
      {/* Text container */}
      <div className="relative z-20 max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-8">
          Explore the Right Solutions
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-14">
          Choose what matters most to you — we’ll help you discover and compare
          the best-fit options available.
        </p>
      </div>

      {/* App Feature Cards */}
      <div className="relative z-10 isolate">
        <AppFeature ref="search" />
      </div>

      {/* Background Blur */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#003E78] opacity-10 rounded-full blur-[120px] z-0" />
    </section>
  );
};

export default MatchEngineSearchLayout;
