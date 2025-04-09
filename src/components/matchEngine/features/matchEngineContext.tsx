"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import { AppFeatureType, get_search_params } from "./searchObject";
import { ListItemInterface } from "@/components/matchEngine/features/resultListObject";

// Define Context Type
interface MatchEngineContextType {
  isLoading: boolean;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  handleNext: () => void;
  handlePrevious: () => void;
  reset: () => void;
  searchParams: AppFeatureType | undefined;
  setSearchParams: (searchParams: AppFeatureType | undefined) => void;
  appType: string | undefined;
  SetApptype: (apptype: string | undefined) => void;
  selectedOptions: Record<number, number[]>;
  setSelectedOptions: (selectedoption: Record<number, number[]>) => void;
  handleSelectionChange: (categoryId: number, selectedIds: number[]) => void;
  objectList: ListItemInterface[];
  setObjectList: (objectList: ListItemInterface[]) => void;
  selected: string[];
  setSelected: (selected: string[]) => void;
  handleSelect: (id: string, isSelected: boolean) => void;
  handleUnselectAll: () => void;
}

// Create Context with Default Values
const MatchEngineContext = React.createContext<MatchEngineContextType | null>(
  null
);

// MatchEngineProvider Props
interface MatchEngineProviderProps {
  children: ReactNode;
}

export const MatchEngineProvider = ({ children }: MatchEngineProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchParams, setSearchParams] = useState<
    AppFeatureType | undefined
  >();
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, number[]>
  >({});
  const [appType, SetApptype] = useState<string | undefined>();
  const [objectList, setObjectList] = useState<ListItemInterface[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const urlParam = useSearchParams();
  const system = urlParam.get("system");

  useEffect(() => {
    const fetchSearchParams = async () => {
      try {
        if (system) {
          SetApptype(system);
          const seachParams = await get_search_params(system);
          setSearchParams(seachParams);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch searchParams", error);
      }
    };
    fetchSearchParams();
  }, [urlParam]);

  const handleSelectionChange = (categoryId: number, selectedIds: number[]) => {
    setSelectedOptions((prev) =>
      selectedIds.length === 0
        ? Object.fromEntries(
            Object.entries(prev).filter(([key]) => Number(key) !== categoryId)
          )
        : { ...prev, [categoryId]: selectedIds }
    );
  };

  const handleNext = () => {
    if (
      searchParams &&
      currentPage < (searchParams?.subTypes?.length || 0) - 1
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  const reset = () => {
    setCurrentPage(0);
    setSelectedOptions({});
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle checkbox selection
  const handleSelect = (id: string, isSelected: boolean) => {
    setObjectList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, selected: isSelected } : item
      )
    );
    setSelected((prevSelected) =>
      isSelected
        ? [...prevSelected, id]
        : prevSelected.filter((selectedId) => selectedId !== id)
    );
  };

  // Handle unselect all
  const handleUnselectAll = () => {
    setObjectList((prevList) =>
      prevList.map((item) => ({ ...item, selected: false }))
    );
    setSelected([]);
  };

  return (
    <MatchEngineContext.Provider
      value={{
        isLoading,
        currentPage,
        setCurrentPage,
        handleNext,
        handlePrevious,
        searchParams,
        setSearchParams,
        appType,
        SetApptype,
        reset,
        handleSelectionChange,
        selectedOptions,
        setSelectedOptions,
        objectList,
        setObjectList,
        selected,
        setSelected,
        handleSelect,
        handleUnselectAll,
      }}
    >
      {children}
    </MatchEngineContext.Provider>
  );
};

// Custom Hook for using MatchEngine
export const useMatchEngine = (): MatchEngineContextType => {
  const context = useContext(MatchEngineContext);
  if (!context) {
    throw new Error("useMatchEngine must be used within a MatchEngineProvider");
  }
  return context;
};
