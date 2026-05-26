"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

interface ActionItem {
  id: string;
  title: string;
  description: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  techStackRelevance: string[];
  regulationId: string;
  regulationName: string;
  regulationShortName: string;
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  completedAt: string | null;
}

const priorityColor: Record<string, "red" | "amber" | "blue"> = {
  HIGH: "red",
  MEDIUM: "amber",
  LOW: "blue",
};

export default function ActionsPage() {
  const [items, setItems] = useState<ActionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchActions() {
      try {
        const res = await fetch("/api/actions");
        if (res.ok) {
          const data = await res.json();
          setItems(data.items || []);
        } else {
          setError("Failed to load action items. Please try again.");
        }
      } catch {
        setError("Failed to load action items. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchActions();
  }, []);

  const updateStatus = async (
    itemId: string,
    newStatus: "TODO" | "IN_PROGRESS" | "COMPLETED"
  ) => {
    try {
      const res = await fetch(`/api/actions/${itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setItems((prev) =>
          prev.map((item) =>
            item.id === itemId ? { ...item, status: newStatus } : item
          )
        );
      } else {
        setError("Failed to update action item status.");
      }
    } catch {
      setError("Failed to update action item status.");
    }
  };

  const todoItems = items.filter((i) => i.status === "TODO");
  const inProgressItems = items.filter((i) => i.status === "IN_PROGRESS");
  const completedItems = items.filter((i) => i.status === "COMPLETED");

  const total = items.length;
  const completedCount = completedItems.length;
  const progressPercent = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
        <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
        <div className="h-64 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Action Items
      </h1>

      {error && (
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Progress bar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Compliance Progress
          </span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {progressPercent}% ({completedCount}/{total})
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3">
          <div
            className="bg-green-500 dark:bg-green-400 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Todo */}
        <div>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gray-400" />
            To Do ({todoItems.length})
          </h2>
          <div className="space-y-3">
            {todoItems.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                No pending items
              </p>
            ) : (
              todoItems.map((item) => (
                <ActionCard
                  key={item.id}
                  item={item}
                  onStatusChange={updateStatus}
                />
              ))
            )}
          </div>
        </div>

        {/* In Progress */}
        <div>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            In Progress ({inProgressItems.length})
          </h2>
          <div className="space-y-3">
            {inProgressItems.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                No items in progress
              </p>
            ) : (
              inProgressItems.map((item) => (
                <ActionCard
                  key={item.id}
                  item={item}
                  onStatusChange={updateStatus}
                />
              ))
            )}
          </div>
        </div>

        {/* Completed */}
        <div>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            Completed ({completedItems.length})
          </h2>
          <div className="space-y-3">
            {completedItems.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                No completed items
              </p>
            ) : (
              completedItems.map((item) => (
                <ActionCard
                  key={item.id}
                  item={item}
                  onStatusChange={updateStatus}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionCard({
  item,
  onStatusChange,
}: {
  item: ActionItem;
  onStatusChange: (id: string, status: "TODO" | "IN_PROGRESS" | "COMPLETED") => void;
}) {
  return (
    <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="flex items-start justify-between gap-2 mb-1">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
          {item.title}
        </h3>
        <Badge color={priorityColor[item.priority]} size="sm">
          {item.priority}
        </Badge>
      </div>
      <Link
        href={`/dashboard/regulations/${item.regulationId}`}
        className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
      >
        {item.regulationShortName}
      </Link>
      <div className="flex gap-1 mt-2">
        {item.status !== "TODO" && (
          <button
            onClick={() => onStatusChange(item.id, "TODO")}
            className="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Todo
          </button>
        )}
        {item.status !== "IN_PROGRESS" && (
          <button
            onClick={() => onStatusChange(item.id, "IN_PROGRESS")}
            className="px-2 py-1 text-xs rounded bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/50"
          >
            In Progress
          </button>
        )}
        {item.status !== "COMPLETED" && (
          <button
            onClick={() => onStatusChange(item.id, "COMPLETED")}
            className="px-2 py-1 text-xs rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50"
          >
            Complete
          </button>
        )}
      </div>
    </div>
  );
}
