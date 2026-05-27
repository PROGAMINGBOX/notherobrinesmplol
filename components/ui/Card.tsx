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
      className={`glass-premium glass-shine shadow-xl shadow-emerald-500/5 transition-all duration-300 hover:border-white/20 hover:shadow-emerald-500/10 hover:-translate-y-0.5 will-change-transform ${className}`}
    >
      {header && (
        <div className="relative z-10 border-b border-white/10 px-6 py-4">
          {header}
        </div>
      )}
      <div className="relative z-10 px-6 py-4">{children}</div>
      {footer && (
        <div className="relative z-10 border-t border-white/10 px-6 py-4">
          {footer}
        </div>
      )}
    </div>
  );
}
