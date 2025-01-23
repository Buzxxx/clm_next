/**
 * @path src/app/contract/vendor/[vendorId]/page.tsx
 */
import VendorDetails from "@/components/contracts/features/vendorDetails"

const VendorModalPage = () => {

  return (
    <div className="py-4 md:px-8 lg:px-16 lg:py-8">
      <VendorDetails  />
    </div>
  )
}

export default VendorModalPage
