"use client";

import React from "react";
import ResultFilterForm from "./resultFilter/resultFilterForm";
import ResultList from "./resultContainer/resultContainer";

const Results = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-6 min-h-screen">
        <aside className="w-full lg:w-1/4">
          <ResultFilterForm />
        </aside>
        <main className="w-full lg:w-3/4">
          <ResultList />
        </main>
      </div>
    </div>
  );
};

export default Results;
