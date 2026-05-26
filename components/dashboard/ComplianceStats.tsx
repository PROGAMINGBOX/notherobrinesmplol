interface ComplianceStatsProps {
  totalRegulations: number;
  pendingActions: number;
  completedActions: number;
  criticalAlerts: number;
}

export function ComplianceStats({
  totalRegulations,
  pendingActions,
  completedActions,
  criticalAlerts,
}: ComplianceStatsProps) {
  const total = completedActions + pendingActions;
  const complianceRate = total > 0 ? Math.round((completedActions / total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">Tracked Regulations</p>
        <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{totalRegulations}</p>
      </div>
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">Pending Actions</p>
        <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{pendingActions}</p>
      </div>
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">Compliance Rate</p>
        <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{complianceRate}%</p>
      </div>
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">Critical Alerts</p>
        <p className={`mt-1 text-2xl font-bold ${criticalAlerts > 0 ? "text-red-600 dark:text-red-400" : "text-gray-900 dark:text-white"}`}>
          {criticalAlerts}
        </p>
      </div>
    </div>
  );
}
