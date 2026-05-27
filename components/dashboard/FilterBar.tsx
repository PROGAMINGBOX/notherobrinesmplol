"use client";

import { useState, useEffect } from "react";

interface Filters {
  search: string;
  severity: string;
  category: string;
  dateRange: string;
}

interface FilterBarProps {
  onFilterChange: (filters: Filters) => void;
}

const SEVERITY_OPTIONS = ["All", "CRITICAL", "WARNING", "INFO"];
const CATEGORY_OPTIONS = ["All", "Privacy", "App Store", "Security", "Accessibility", "Healthcare", "AI"];
const DATE_OPTIONS = [
  { label: "All time", value: "" },
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 90 days", value: "90d" },
];

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("All");
  const [category, setCategory] = useState("All");
  const [dateRange, setDateRange] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      onFilterChange({
        search,
        severity: severity === "All" ? "" : severity,
        category: category === "All" ? "" : category,
        dateRange,
      });
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, severity, category, dateRange, onFilterChange]);

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <div className="relative flex-1">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search regulations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-3 py-2 text-sm rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
        />
      </div>

      {/* Severity */}
      <select
        value={severity}
        onChange={(e) => setSeverity(e.target.value)}
        className="px-3 py-2 text-sm rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
      >
        {SEVERITY_OPTIONS.map((opt) => (
          <option key={opt} value={opt} className="bg-gray-900">{opt === "All" ? "All Severities" : opt}</option>
        ))}
      </select>

      {/* Category */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="px-3 py-2 text-sm rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
      >
        {CATEGORY_OPTIONS.map((opt) => (
          <option key={opt} value={opt} className="bg-gray-900">{opt === "All" ? "All Categories" : opt}</option>
        ))}
      </select>

      {/* Date Range */}
      <select
        value={dateRange}
        onChange={(e) => setDateRange(e.target.value)}
        className="px-3 py-2 text-sm rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
      >
        {DATE_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-gray-900">{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
