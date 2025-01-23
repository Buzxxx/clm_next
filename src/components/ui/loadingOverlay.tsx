import ReactDOM from "react-dom"
import LoadingSpinner from "../contracts/ui/loadingSpinner"

/**
 * Renders a full-screen loading overlay using a React portal.
 */

export default function LoadingOverlay() {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex justify-center items-center bg-gray-100 bg-opacity-75 z-50">
      <LoadingSpinner  />
    </div>,
    document.body
  )
}
