import { MatchEngineProvider } from "@/components/matchEngine/features/matchEngineContext";
import { ReactNode, Suspense } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <MatchEngineProvider>
          <main>{children}</main>
        </MatchEngineProvider>
      </Suspense>
    </div>
  );
};

export default Layout;
