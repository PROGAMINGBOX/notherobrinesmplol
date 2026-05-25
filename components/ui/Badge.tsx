import React from "react";

type BadgeColor = "red" | "amber" | "blue" | "green" | "gray";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
  size?: BadgeSize;
  className?: string;
}

const colorStyles: Record<BadgeColor, string> = {
  red: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  amber:
    "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  blue: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  green:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  gray: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
};

export function Badge({
  children,
  color = "gray",
  size = "sm",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${colorStyles[color]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
}
