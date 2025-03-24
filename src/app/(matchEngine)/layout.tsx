import React from "react";
import Header from "@/components/base/layout/header";
import Footer from "@/components/base/layout/footer";
import { MatchEngineProvider } from "@/components/matchEngine/features/matchEngineContext";

import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <MatchEngineProvider>
        <main>{children}</main>
      </MatchEngineProvider>

      <Footer />
    </div>
  );
};

export default Layout;
