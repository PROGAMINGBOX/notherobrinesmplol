"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";

const FREQUENCY_OPTIONS = [
  { value: "immediate", label: "Immediate" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
];

const SEVERITY_OPTIONS = [
  { value: "CRITICAL", label: "Critical" },
  { value: "WARNING", label: "Warning" },
  { value: "INFO", label: "Info" },
];

export default function SettingsPage() {
  const [alertFrequency, setAlertFrequency] = useState("weekly");
  const [severityLevels, setSeverityLevels] = useState<string[]>(["CRITICAL", "WARNING"]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          setAlertFrequency(data.alertFrequency);
          setSeverityLevels(data.severityLevels);
        } else {
          setError("Failed to load settings. Please try again.");
        }
      } catch {
        setError("Failed to load settings. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const toggleSeverity = (level: string) => {
    setSeverityLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);
    setError(null);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alertFrequency, severityLevels }),
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError("Failed to save settings. Please try again.");
      }
    } catch {
      setError("Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-32 bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
        <div className="h-64 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-xl" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>

      {error && (
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Alert Frequency */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Alert Frequency
        </h2>
        <div className="space-y-2">
          {FREQUENCY_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 cursor-pointer hover:border-gray-300 dark:hover:border-gray-600"
            >
              <input
                type="radio"
                name="alertFrequency"
                value={opt.value}
                checked={alertFrequency === opt.value}
                onChange={(e) => setAlertFrequency(e.target.value)}
                className="w-4 h-4 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </section>

      {/* Severity Levels */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Severity Levels
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Choose which severity levels trigger alerts.
        </p>
        <div className="space-y-2">
          {SEVERITY_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 cursor-pointer hover:border-gray-300 dark:hover:border-gray-600"
            >
              <input
                type="checkbox"
                checked={severityLevels.includes(opt.value)}
                onChange={() => toggleSeverity(opt.value)}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </section>

      {/* Save */}
      <div className="flex items-center gap-4">
        <Button onClick={handleSave} loading={saving}>
          Save Settings
        </Button>
        {success && (
          <span className="text-sm text-green-600 dark:text-green-400 font-medium">
            Settings saved successfully!
          </span>
        )}
      </div>
    </div>
  );
}
