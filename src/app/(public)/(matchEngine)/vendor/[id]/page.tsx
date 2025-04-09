"use client";
import { useParams } from "next/navigation";
import VendorLayout from "@/components/vendor/layout/vendorLayout";

export default function VendorPage() {
  const params = useParams();
  const vendorid = params.id?.toString();

  return (
    <div>
      <VendorLayout id={vendorid ? vendorid : "s"} />
    </div>
  );
}
