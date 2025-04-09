"use client";

import React from "react";
import AppFeature from "./appFeatures/appFeature";

const AppCardsSection = () => {
  return (
    <section
      id="systems"
      className="relative scroll-mt-32 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  text-center"
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

      {/* Cards / Features */}
      <div className="relative z-10 isolate">
        <AppFeature ref="search" />
      </div>

      {/* Decorative background blur */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#003E78] opacity-10 rounded-full blur-[120px] z-0" />
    </section>
  );
};

export default AppCardsSection;
