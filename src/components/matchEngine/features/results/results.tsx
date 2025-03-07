import React from "react";
import ResultFilterForm from "./resultFilterForm";
import ResultList from "./resultContainer/resultContainer";

const Results = () => {
  return (
    <div className="container mx-auto" style={{ maxWidth: "95%" }}>
      <div className="flex min-h-screen gap-8 pb-20 relative">
        <div className="w-1/4 ">
          <ResultFilterForm />
        </div>
        <div className="w-3/4">
          <ResultList />
        </div>
      </div>
    </div>
  );
};

export default Results;
