// /components/contracts/ui/selectionDisplayBox.tsx

import { Badge } from "@/components/ui/badge"
import { X } from "@/components/ui/icons"
import { getDisplayName } from "../features/contractsObject"

import styles from "@/app/contracts/contract.module.css"

interface SelectionDisplayBoxProps {
  selectedItems: number[]
  onRemoveItem: (item: number) => void
  category: string
}

const SelectionDisplayBox: React.FC<SelectionDisplayBoxProps> = ({
  selectedItems,
  onRemoveItem,
  category,
}) => {
  return (
    <div className={`${styles.selectionDisplayBox} border border-slate-300 mt-2 py-2 px-4 overflow-x-clip overflow-y-auto h-full`}>
      <div className="flex gap-2 flex-wrap md:h-16 h-10">
        {Object.keys(selectedItems).length > 0 ? (
          selectedItems.map((itemId) => (
            <Badge
              key={`${category}-${itemId}`}
              className={`${styles.textPrimary} hover:bg-white px-2 py-1 rounded-full text-xs flex items-center justify-between gap-2 h-fit w-fit bg-slate-300/40`}
            >
              {getDisplayName(category, itemId)}

              <button
                type="button"
                onClick={() => onRemoveItem(itemId)} // Pass category and item ID to the onRemoveItem handler
                className="ml-2"
              >
                <X className="h-4 w-4" />
              </button>
            </Badge>
          ))
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className={`${styles.textMuted} text-sm`}>No items selected</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SelectionDisplayBox
