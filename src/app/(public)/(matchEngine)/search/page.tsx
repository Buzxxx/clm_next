"use client";

import React, { Suspense } from "react";
import MatchEngineSearchLayout from "@/components/matchEngine/layout/matchEngineLayout";
import { Spinner } from "@/components/ui/icons";

const CategorySelectPage = () => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spinner />
        </div>
      }
    >
      <MatchEngineSearchLayout />
    </Suspense>
  );
};

export default CategorySelectPage;
