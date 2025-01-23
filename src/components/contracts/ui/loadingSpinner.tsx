import { Spinner } from "@/components/ui/icons"
import OverlayLoading from "@/components/ui/overlayLoading"

const LoadingSpinner = () => {
  return (
    <OverlayLoading>
      <Spinner className="w-8 h-8 md:w-14 md:h-16 "></Spinner>
    </OverlayLoading>
  )
}

export default LoadingSpinner
