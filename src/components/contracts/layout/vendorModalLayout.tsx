import { Suspense } from "react"
import Modal from "@/components/ui/modal"
import VendorDetails from "../features/vendorDetails"
import LoadingSpinner from "../ui/loadingSpinner"

import styles from "@/app/contracts/contract.module.css"

const VendorModalLayout = () => {
  
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Modal className={styles.contractsLayout}>
        <VendorDetails />
      </Modal>
    </Suspense>
  )
}

export default VendorModalLayout
