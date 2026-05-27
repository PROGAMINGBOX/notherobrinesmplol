import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { formatRelativeDate } from "@/lib/utils";

interface RegulationCardProps {
  regulation: {
    id: string;
    name: string;
    shortName: string;
    severity: "CRITICAL" | "WARNING" | "INFO";
    category: string;
    region: string;
    summary: string;
    publishedAt: string;
    affectedArea: string;
  };
}

const severityColor: Record<string, "red" | "amber" | "blue"> = {
  CRITICAL: "red",
  WARNING: "amber",
  INFO: "blue",
};

const severityBorder: Record<string, string> = {
  CRITICAL: "border-l-red-500",
  WARNING: "border-l-amber-500",
  INFO: "border-l-emerald-500",
};

export function RegulationCard({ regulation }: RegulationCardProps) {
  return (
    <Link href={`/dashboard/regulations/${regulation.id}`}>
      <div className={`group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 border-l-2 ${severityBorder[regulation.severity]} hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer overflow-hidden will-change-transform`}>
        {/* Shimmer on hover */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
        <div className="relative z-10 flex items-start justify-between gap-2 mb-2">
          <h3 className="text-sm font-semibold text-white line-clamp-1">
            {regulation.name}
          </h3>
          <Badge color={severityColor[regulation.severity]} size="sm">
            {regulation.severity}
          </Badge>
        </div>
        <p className="relative z-10 text-sm text-gray-400 line-clamp-2 mb-3">
          {regulation.summary}
        </p>
        <div className="relative z-10 flex items-center gap-2 flex-wrap">
          <Badge color="gray" size="sm">{regulation.affectedArea}</Badge>
          <Badge color="gray" size="sm">{regulation.region}</Badge>
          <span className="ml-auto text-xs text-gray-500">
            {formatRelativeDate(regulation.publishedAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}
