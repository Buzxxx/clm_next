/**
 * @path src/components/ui/modal.tsx
 */

"use client"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogOverlay } from "./dialog"
interface ModalProps {
  children?: React.ReactNode
  className?: string
}

const Modal: React.FC<ModalProps> = ({ children, className }) => {
  const router = useRouter()
  const handleOpenChange = () => {
    router.back()
  }
  return (
    <Dialog open={true} defaultOpen={true} onOpenChange={handleOpenChange} >
      <DialogOverlay className={className}>
        <DialogContent
          className={`${className} max-w-6xl overflow-auto h-full`}
        >
          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  )
}

export default Modal
