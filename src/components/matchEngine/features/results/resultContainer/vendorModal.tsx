import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  id?: string;
}

const VendorPage = dynamic(
  () => import("@/components/vendor/layout/vendorLayout"),
  {
    ssr: false,
  }
);

const VendorPageWrapper = ({ id }: { id: string }) => {
  return <VendorPage id={id} />;
};

export default function VendorModal({ isOpen, onClose, id }: ModalProps) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay />
      <DialogDescription>Vendor Page</DialogDescription>
      <DialogContent className="md:min-w-[60%] max-w-3xl p-6 flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
        <DialogTitle></DialogTitle>
        {id ? <VendorPageWrapper id={id} /> : <p>Vendor not found.</p>}
      </DialogContent>
    </Dialog>
  );
}
