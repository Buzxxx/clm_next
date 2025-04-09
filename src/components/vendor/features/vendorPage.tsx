import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { vendor_object_controller } from "./vendorObject";

const VendorPage = ({ id }: { id: string }) => {
  const DEFAULT_LOGO = "vendor-default-logo.webp";
  const [isLoading, setIsLoading] = useState(true);
  const [vendorData, setVendorData] = useState<any>(null);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const data = await vendor_object_controller(id);
        setVendorData(data);
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [id]);

  if (isLoading) {
    return <p className="text-center text-lg font-medium">Loading...</p>;
  }

  if (!vendorData) {
    return (
      <p className="text-center text-lg text-red-500 font-semibold">
        No vendor data available.
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Vendor Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">
        <Image
          className="rounded-lg border border-gray-300 shadow-md p-2 h-20 w-20 md:h-24 md:w-24 object-contain"
          src={`/vendor/images/logo/${vendorData.logo || DEFAULT_LOGO}`}
          alt={`${vendorData.name} logo`}
          width={96}
          height={96}
        />
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-900">
            {vendorData.name}
          </h2>
          <p className="text-lg text-gray-600">{vendorData.software_name}</p>
          {vendorData.website && (
            <Link
              href={vendorData.website}
              className="mt-2 inline-block text-blue-600 hover:text-blue-800 transition duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Website →
            </Link>
          )}
        </div>
      </div>

      {/* Vendor Description */}
      {vendorData.description && (
        <p className="mt-6 text-gray-700 text-lg leading-relaxed bg-gray-100 p-4 rounded-lg shadow-sm">
          {vendorData.description}
        </p>
      )}

      {/* Vendor Categories */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
          Vendor Capabilities
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendorData.categoryOptions?.map((category: any) => (
            <div
              key={category.id}
              className="bg-white p-5 rounded-lg shadow-md border"
            >
              <h4 className="text-xl font-semibold text-gray-900">
                {category.name}
              </h4>
              <p className="text-sm text-gray-600">{category.description}</p>
              <ul className="mt-3 space-y-1">
                {category.options.map((option: any) => (
                  <li
                    key={option.id}
                    className="text-gray-800 bg-gray-100 rounded-md px-3 py-1 text-sm inline-block"
                  >
                    {option.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorPage;
