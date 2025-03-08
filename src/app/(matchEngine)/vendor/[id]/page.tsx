"use client";
import Header from "@/components/base/layout/header";
import Footer from "@/components/base/layout/footer";
import { useParams } from "next/navigation";
import VendorLayout from "@/components/vendor/layout/vendorLayout";

export default function VendorPage() {
  const params = useParams();
  const vendorid = params.id?.toString();

  return (
    <div>
      <Header />
      <VendorLayout id={vendorid ? vendorid : "s"} />
      <Footer />
    </div>
  );
}
