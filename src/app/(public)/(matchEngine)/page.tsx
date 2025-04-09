"use client";

import React, { Suspense, lazy } from "react";
import { Spinner } from "@/components/ui/icons";

const AppLayout = lazy(
  () => import("@/components/matchEngine/layout/appLayout")
);

const AppPage = () => {
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
      <div>
        <AppLayout />
      </div>
    </Suspense>
  );
};

export default AppPage;
