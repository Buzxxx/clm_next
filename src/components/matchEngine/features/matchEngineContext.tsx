"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { CategoryType, get_categories_controller } from "./categoryObject";

// Define Context Type
interface MatchEngineContextType {
  isLoading: boolean;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  handleNext: () => void;
  handlePrevious: () => void;
  reset: () => void;
  categories: CategoryType[];
  setCategories: (categories: CategoryType[]) => void;
  paginatedCategories: CategoryType[][];
  selectedOptions: Record<number, number[]>;
  handleSelectionChange: (categoryId: number, selectedIds: number[]) => void;
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
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [paginatedCategories, setPaginatedCategories] = useState<
    CategoryType[][]
  >([]);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, number[]>
  >({});

  useEffect(() => {
    const setCustomPaginatedCategories = (categories: CategoryType[]) => {
      const paginated = [];
      const threshold = 3;
      for (let i = 0; i < categories.length; i += threshold) {
        paginated.push(categories.slice(i, i + threshold));
      }
      paginated.push([]);
      setCategories(categories);
      setPaginatedCategories(paginated);
    };

    const fetchCategories = async () => {
      try {
        const category = await get_categories_controller();
        setCustomPaginatedCategories(category);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSelectionChange = (categoryId: number, selectedIds: number[]) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [categoryId]: selectedIds,
    }));
  };

  const handleNext = () => {
    if (currentPage < paginatedCategories.length - 1) {
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

  return (
    <MatchEngineContext.Provider
      value={{
        isLoading,
        currentPage,
        setCurrentPage,
        handleNext,
        handlePrevious,
        categories,
        setCategories,
        paginatedCategories,
        reset,
        handleSelectionChange,
        selectedOptions,
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
