"use client";

import React from "react";
import { useMatchEngine } from "@/components/matchEngine/features/matchEngineContext";
import { MultiSelect } from "@/components/matchEngine/ui/multiSelectComboBox";
import { AnimatePresence, motion } from "framer-motion";

const SelectForm = () => {
  const { currentPage, searchParams, selectedOptions, handleSelectionChange } =
    useMatchEngine();

  const categories = searchParams?.subTypes?.[currentPage];
  if (!categories) return null;

  const categoryList = categories?.categories || [];

  return (
    <div className="container mx-auto">
      <div className="py-3">
        {categoryList.length === 0 ? (
          <p className="text-center text-gray-500 italic mt-4">
            Capabilities not found, please comeback later.
          </p>
        ) : (
          categoryList.map((cat) => (
            <motion.div
              key={cat?.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <MultiSelect
                name={cat.name}
                description={cat.description}
                image={cat.image}
                options={cat.options || []}
                selected={selectedOptions[cat.id] || []}
                onChange={(selectedIds) =>
                  handleSelectionChange(cat.id, selectedIds)
                }
              />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default SelectForm;
