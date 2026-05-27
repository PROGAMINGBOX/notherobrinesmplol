import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export function Card({ children, className = "", header, footer }: CardProps) {
  return (
    <div
      className={`glass shadow-xl shadow-emerald-500/5 transition-colors hover:border-white/20 ${className}`}
    >
      {header && (
        <div className="border-b border-white/10 px-6 py-4">
          {header}
        </div>
      )}
      <div className="px-6 py-4">{children}</div>
      {footer && (
        <div className="border-t border-white/10 px-6 py-4">
          {footer}
        </div>
      )}
    </div>
  );
}
