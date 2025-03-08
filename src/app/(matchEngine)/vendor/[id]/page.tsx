"use client";
import Header from "@/components/base/layout/header";
import Footer from "@/components/base/layout/footer";
import { useParams } from "next/navigation";
import VendorLayout from "@/components/vendor/layout/vendorLayout";

export default function VendorPage({ vendorid }: { vendorid?: string }) {
  const params = useParams();
  const id = vendorid ?? params.id?.toString();

  return (
    <div>
      <Header />
      <VendorLayout id={id ? id : "s"} />
      <Footer />
    </div>
  );
}
