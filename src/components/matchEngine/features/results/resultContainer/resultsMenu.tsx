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
import { MoreVertical } from "lucide-react";
import { useMatchEngine } from "@/components/matchEngine/features/matchEngineContext";

// Lazy load the CompareModal
const CompareModal = lazy(() => import("../compare/compareModal"));

const ResultsMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selected, handleUnselectAll } = useMatchEngine();

  const openModal = () => setIsModalOpen(true);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-600 hover:text-[#003E78]"
            aria-label="Actions"
          >
            <MoreVertical className="h-4 w-4" />
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
            <DropdownMenuShortcut></DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

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
