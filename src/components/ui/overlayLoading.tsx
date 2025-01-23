import React, { ReactElement } from "react"

type childerType = {
  children: ReactElement
}

export default function OverlayLoading({ children }: childerType) {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="animate-pulse p-6 rounded-lg">{children}</div>
    </div>
  )
}
