"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import CompareBody from "./compareBody/compareBody";

type CompareModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CompareModal: React.FC<CompareModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Vendor Capability Matrix
          </DialogTitle>
          <DialogDescription>
            Compare selected vendors across categorized capabilities.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pb-4">
          <CompareBody />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompareModal;
