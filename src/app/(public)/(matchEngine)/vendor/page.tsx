"use client";

import React, { Suspense } from "react";
import ResultLayout from "@/components/matchEngine/layout/resultLayout";
import { Spinner } from "@/components/ui/icons";

export default function Page() {
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
      <ResultLayout />
    </Suspense>
  );
}
