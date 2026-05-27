"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ComplianceStats } from "@/components/dashboard/ComplianceStats";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { RegulationCard } from "@/components/dashboard/RegulationCard";

interface Regulation {
  id: string;
  name: string;
  shortName: string;
  severity: "CRITICAL" | "WARNING" | "INFO";
  category: string;
  region: string;
  summary: string;
  publishedAt: string;
  affectedArea: string;
}

interface Stats {
  totalRegulations: number;
  pendingActions: number;
  completedActions: number;
  criticalAlerts: number;
}

interface Filters {
  search: string;
  severity: string;
  category: string;
  dateRange: string;
}

export default function DashboardPage() {
  const [regulations, setRegulations] = useState<Regulation[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalRegulations: 0,
    pendingActions: 0,
    completedActions: 0,
    criticalAlerts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch {
      setError("Failed to load dashboard statistics. Please try again.");
    }
  };

  const fetchRegulations = useCallback(async (filters?: Filters) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters?.search) params.set("search", filters.search);
      if (filters?.severity) params.set("severity", filters.severity);
      if (filters?.category) params.set("category", filters.category);
      if (filters?.dateRange) params.set("dateRange", filters.dateRange);

      const res = await fetch(`/api/regulations?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setRegulations(data.regulations || []);
        if (data.needsOnboarding) {
          setNeedsOnboarding(true);
        }
      } else {
        setError("Failed to load regulations. Please try again.");
      }
    } catch {
      setError("Failed to load regulations. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRegulations();
    fetchStats();
  }, [fetchRegulations]);

  const handleFilterChange = useCallback((filters: Filters) => {
    fetchRegulations(filters);
  }, [fetchRegulations]);

  if (needsOnboarding) {
    return (
      <div className="flex flex-col items-center justify-center py-16 animate-scale-in">
        <h2 className="text-xl font-semibold text-white mb-2">
          Complete Your Profile
        </h2>
        <p className="text-gray-400 mb-6 text-center max-w-md">
          Set up your compliance profile to start tracking regulations relevant to your business.
        </p>
        <Link
          href="/onboarding"
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all font-medium text-sm"
        >
          Start Onboarding
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white animate-slide-up">
        Compliance Dashboard
      </h1>

      <div className="animate-scale-in [animation-delay:0.1s] opacity-0 [animation-fill-mode:forwards]">
        <ComplianceStats {...stats} />
      </div>

      <div className="animate-slide-up [animation-delay:0.2s] opacity-0 [animation-fill-mode:forwards]">
        <FilterBar onFilterChange={handleFilterChange} />
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm animate-scale-in">
          {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 rounded-2xl bg-white/5 animate-pulse"
            />
          ))}
        </div>
      ) : regulations.length === 0 ? (
        <div className="text-center py-12 animate-scale-in">
          <p className="text-gray-400">
            No regulations found matching your filters.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {regulations.map((reg, i) => (
            <div
              key={reg.id}
              className="animate-slide-up"
              style={{ animationDelay: `${0.3 + i * 0.05}s`, animationFillMode: "forwards", opacity: 0 }}
            >
              <RegulationCard regulation={reg} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
