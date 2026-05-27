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
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4">
        <p className="text-sm text-gray-400">Tracked Regulations</p>
        <p className="mt-1 text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">{totalRegulations}</p>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4">
        <p className="text-sm text-gray-400">Pending Actions</p>
        <p className="mt-1 text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">{pendingActions}</p>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4">
        <p className="text-sm text-gray-400">Compliance Rate</p>
        <p className="mt-1 text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">{complianceRate}%</p>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4">
        <p className="text-sm text-gray-400">Critical Alerts</p>
        <p className={`mt-1 text-2xl font-bold ${criticalAlerts > 0 ? "text-red-400" : "bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"}`}>
          {criticalAlerts}
        </p>
      </div>
    </div>
  );
}
