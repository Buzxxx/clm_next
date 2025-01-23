"use client";

import Image from "next/image";
import Link from "next/link";
import { GeneralInfo } from "../ui/vendorInfo";
import { vendors } from "../noSql";
import styles from "@/app/contract.module.css";
import { useParams } from "next/navigation";

const VendorDetails = () => {
  const params = useParams();
  const id = params.vendorId?.toString();
  const vendor = vendors.find((v) => v.id === id);

  if (!vendor) {
    // If vendor not found, display an error UI
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-bold mb-4 text-red-500">Oops!</h1>
        <p className="text-lg text-gray-600">
          Couldn`&apos;`t find the vendor you were looking for.
        </p>
        <Link href="/" className="mt-6 text-blue-500 underline">
          Go back to Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex md:gap-4 items-center mb-8 max-md:px-4">
        <Image
          className="inline mr-4 rounded-full p-2 border border-slate-200 h-16 w-16 object-contain"
          src={vendor.logo}
          alt="logo"
          width={400}
          height={400}
        />
        <div className="text-left flex-1">
          <div className="flex md:items-center gap-2 md:flex-row flex-col">
            <h2 className="text-4xl inline-block font-semibold">
              {vendor.vendorName}
            </h2>
            <Link
              href={vendor.website}
              className="bg-gray-300 text-blue-500 rounded-md text-sm px-2 py-px w-fit"
            >
              {vendor?.website}
            </Link>
          </div>
          <div>
            <p className={`${styles.textGray} text-sm`}>
              Estd. {vendor?.estYr} | Lorem ipsum dolor sit.
            </p>
          </div>
        </div>
      </div>
      <div className="md:px-24 px-4">
        <GeneralInfo vendor={vendor} />
      </div>
    </>
  );
};

export default VendorDetails;
