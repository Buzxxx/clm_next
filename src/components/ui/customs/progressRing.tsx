"use client";

import React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

type ProgressRingProps = {
  percentage: number;
  size?: number;
  strokeWidth?: number;
};

const getColorClass = (percentage: number): string => {
  if (percentage < 40) return "text-red-500";
  if (percentage < 70) return "text-yellow-500";
  return "text-green-500";
};

const ProgressRing: React.FC<ProgressRingProps> = ({
  percentage,
  size = 48,
  strokeWidth = size * 0.1,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const fontSize = size * 0.3;

  const motionPercentage = useMotionValue(0);
  const animatedText = useTransform(
    motionPercentage,
    (latest) => `${Math.round(latest)}%`
  );
  const [colorClass, setColorClass] = useState(getColorClass(0));

  useEffect(() => {
    const controls = animate(motionPercentage, percentage, {
      duration: 1,
      ease: "easeOut",
      onUpdate: (latest) => {
        setColorClass(getColorClass(latest));
      },
    });
    return controls.stop;
  }, [percentage]);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Background ring */}
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="lightgray"
          strokeWidth={strokeWidth}
          fill="none"
        />
      </svg>

      {/* Foreground animated ring */}
      <svg width={size} height={size} className="absolute rotate-[-90deg]">
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={colorClass}
        />
      </svg>

      {/* Animated Percentage Text */}
      <motion.span
        className="absolute font-bold text-black"
        style={{ fontSize: `${fontSize}px` }}
      >
        {animatedText}
      </motion.span>
    </div>
  );
};

export default ProgressRing;
