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
  red: "bg-red-500/20 text-red-400 border border-red-500/30 backdrop-blur-sm",
  amber:
    "bg-amber-500/20 text-amber-400 border border-amber-500/30 backdrop-blur-sm",
  blue: "bg-blue-500/20 text-blue-400 border border-blue-500/30 backdrop-blur-sm",
  green:
    "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 backdrop-blur-sm",
  gray: "bg-white/10 text-gray-300 border border-white/10 backdrop-blur-sm",
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
