import React from "react";
import Header from "@/components/base/layout/header";
import Footer from "@/components/base/layout/footer";
import CategorySelectLayout from "@/components/matchEngine/layout/matchEngineLayout";
import { MatchEngineProvider } from "@/components/matchEngine/features/matchEngineContext";

const CategorySelectPage = () => {
  return (
    <>
      <Header />
      <MatchEngineProvider>
        <CategorySelectLayout />
      </MatchEngineProvider>
      <Footer />
    </>
  );
};

export default CategorySelectPage;
