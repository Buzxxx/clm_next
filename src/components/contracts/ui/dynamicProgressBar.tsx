import React, { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import colors from "tailwindcss/colors"

/**
 * Get color based on percentage using Tailwind CSS colors
 * @param {number} percentage
 * @returns {string} Color value
 */
const getColor = (percentage: number): string => {
  if (percentage <= 25) return colors.red[500]
  if (percentage <= 50) return colors.yellow[500]
  if (percentage <= 75) return colors.blue[500]
  return colors.green[500]
}

/**
 * DynamicProgressBar component with customizable props and dynamic color.
 * @param {{ percentage: number, animation?: boolean, dynamicColors?: boolean, color?: string }} props
 * @returns {JSX.Element}
 */
const DynamicProgressBar = ({
  percentage,
  animation = true,
  dynamicColors = true,
  color = "#4caf50", // Default static color
}: {
  percentage: number
  animation?: boolean
  dynamicColors?: boolean
  color?: string
}): JSX.Element => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0)

  useEffect(() => {
    if (animation) {
      setAnimatedPercentage(percentage)
    } else {
      setAnimatedPercentage(percentage)
    }
  }, [percentage, animation])

  // Use dynamic color based on percentage or fallback to provided color
  const progressBarColor = dynamicColors ? getColor(percentage) : color

  return (
    <div
      className="h-2 relative w-full overflow-hidden rounded-full bg-secondary"
      style={{
        backgroundColor: "#e6e6e6", // Background color of the track
      }}
    >
      <div
        className="h-full flex-1 transition-all"
        style={{
          width: `${animatedPercentage}%`,
          backgroundColor: progressBarColor, // Set the dynamic color here
          transition: animation
            ? "width 1s ease-out, background-color 0.35s"
            : "none",
        }}
      />
    </div>
  )
}

export default DynamicProgressBar
