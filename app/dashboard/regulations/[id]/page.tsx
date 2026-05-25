"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatRelativeDate } from "@/lib/utils";

interface ActionItem {
  id: string;
  title: string;
  description: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  techStackRelevance: string[];
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
}

interface Regulation {
  id: string;
  name: string;
  shortName: string;
  severity: "CRITICAL" | "WARNING" | "INFO";
  category: string;
  region: string;
  affectedArea: string;
  summary: string;
  fullDescription: string;
  whatChanged: string;
  deadline: string | null;
  publishedAt: string;
  actionItems: ActionItem[];
}

const severityColor: Record<string, "red" | "amber" | "blue"> = {
  CRITICAL: "red",
  WARNING: "amber",
  INFO: "blue",
};

const priorityColor: Record<string, "red" | "amber" | "blue"> = {
  HIGH: "red",
  MEDIUM: "amber",
  LOW: "blue",
};

const statusLabels: Record<string, string> = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
};

const nextStatus: Record<string, "TODO" | "IN_PROGRESS" | "COMPLETED"> = {
  TODO: "IN_PROGRESS",
  IN_PROGRESS: "COMPLETED",
  COMPLETED: "TODO",
};

export default function RegulationDetailPage() {
  const params = useParams();
  const [regulation, setRegulation] = useState<Regulation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRegulation() {
      try {
        const res = await fetch(`/api/regulations/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setRegulation(data);
        }
      } catch {
        // fetch failed
      } finally {
        setLoading(false);
      }
    }
    fetchRegulation();
  }, [params.id]);

  const toggleStatus = async (actionItemId: string, currentStatus: string) => {
    const newStatus = nextStatus[currentStatus];
    try {
      const res = await fetch(`/api/actions/${actionItemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok && regulation) {
        setRegulation({
          ...regulation,
          actionItems: regulation.actionItems.map((item) =>
            item.id === actionItemId ? { ...item, status: newStatus } : item
          ),
        });
      }
    } catch {
      // update failed
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
        <div className="h-64 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-xl" />
      </div>
    );
  }

  if (!regulation) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">Regulation not found.</p>
        <Button href="/dashboard" variant="outline" className="mt-4">
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const deadlineDate = regulation.deadline ? new Date(regulation.deadline) : null;
  const isDeadlineUrgent =
    deadlineDate && deadlineDate.getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000;

  return (
    <div className="max-w-4xl space-y-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Dashboard
      </Link>

      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Badge color={severityColor[regulation.severity]}>
            {regulation.severity}
          </Badge>
          <Badge color="gray">{regulation.category}</Badge>
          <Badge color="gray">{regulation.region}</Badge>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {regulation.name}
        </h1>
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
          <span>Published {formatRelativeDate(regulation.publishedAt)}</span>
          <span>Affected Area: {regulation.affectedArea}</span>
        </div>
        {deadlineDate && (
          <p className={`mt-2 text-sm font-medium ${isDeadlineUrgent ? "text-red-600 dark:text-red-400" : "text-gray-600 dark:text-gray-400"}`}>
            Deadline: {deadlineDate.toLocaleDateString()}
            {isDeadlineUrgent && " (Approaching!)"}
          </p>
        )}
      </div>

      {/* Summary */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Summary</h2>
        <p className="text-gray-700 dark:text-gray-300">{regulation.summary}</p>
      </section>

      {/* What Changed */}
      {regulation.whatChanged && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">What Changed</h2>
          <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800">
            <p className="text-gray-800 dark:text-gray-200">{regulation.whatChanged}</p>
          </div>
        </section>
      )}

      {/* Full Description */}
      {regulation.fullDescription && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Full Description</h2>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{regulation.fullDescription}</p>
        </section>
      )}

      {/* Action Items */}
      {regulation.actionItems.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Action Items</h2>
          <div className="space-y-3">
            {regulation.actionItems.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
              >
                <button
                  onClick={() => toggleStatus(item.id, item.status)}
                  className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    item.status === "COMPLETED"
                      ? "bg-green-500 border-green-500 text-white"
                      : item.status === "IN_PROGRESS"
                      ? "bg-amber-500 border-amber-500 text-white"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  {item.status === "COMPLETED" && (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {item.status === "IN_PROGRESS" && (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className={`text-sm font-medium ${item.status === "COMPLETED" ? "line-through text-gray-500 dark:text-gray-500" : "text-gray-900 dark:text-white"}`}>
                      {item.title}
                    </h4>
                    <Badge color={priorityColor[item.priority]} size="sm">
                      {item.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {item.description}
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {statusLabels[item.status]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
