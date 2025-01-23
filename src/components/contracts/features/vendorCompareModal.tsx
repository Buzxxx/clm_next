import { SelectedOptions } from "./contractsObject";
import VendorCompareTable from "../ui/vendorCompareTable";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";

import styles from "@/app/contract.module.css";

const VendorCompareModal = ({
  showComparision,
  selectedOptions,
  setShowComparison,
  vendorComparisonData,
}: {
  showComparision?: boolean;
  selectedOptions: SelectedOptions;
  setShowComparison: Dispatch<SetStateAction<boolean>>;
  vendorComparisonData: any;
}) => {
  return (
    <Dialog
      open={showComparision}
      defaultOpen={false}
      onOpenChange={() => setShowComparison(false)}
    >
      <DialogOverlay>
        <DialogContent
          className={` md:min-w-[75%] transition-all px-2 h-[90%] overflow-clip my-auto ${styles.contractsLayout}`}
        >
          <VendorCompareTable
            selectedOptions={selectedOptions}
            vendorComparisonData={vendorComparisonData}
          />
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default VendorCompareModal;
