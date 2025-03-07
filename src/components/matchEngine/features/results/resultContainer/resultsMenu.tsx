import React, { useState, lazy, Suspense } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuShortcut,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bolt } from "lucide-react";
import { useMatchEngine } from "@/components/matchEngine/features/matchEngineContext";

// Lazy load the CompareModal
const CompareModal = lazy(() => import("./menu/compareModal"));

const ResultsMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selected, handleUnselectAll } = useMatchEngine();

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Bolt size={20} />
            Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={openModal}>
            Overview
            <DropdownMenuShortcut>{selected.length}</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleUnselectAll}>
            Unselect all
            <DropdownMenuShortcut>L</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Export</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Load CompareModal only when needed */}
      {isModalOpen && (
        <Suspense fallback={<div>Loading...</div>}>
          <CompareModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </Suspense>
      )}
    </>
  );
};

export default ResultsMenu;
