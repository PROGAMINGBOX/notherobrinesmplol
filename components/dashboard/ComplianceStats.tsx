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

  const cards = [
    { label: "Tracked Regulations", value: totalRegulations, critical: false },
    { label: "Pending Actions", value: pendingActions, critical: false },
    { label: "Compliance Rate", value: `${complianceRate}%`, critical: false },
    { label: "Critical Alerts", value: criticalAlerts, critical: criticalAlerts > 0 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div
          key={card.label}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 transition-all duration-300 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-0.5 animate-scale-in will-change-transform"
          style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "forwards", opacity: 0 }}
        >
          <p className="text-sm text-gray-400">{card.label}</p>
          <p className={`mt-1 text-2xl font-bold ${card.critical ? "text-red-400" : "bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"}`}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}
