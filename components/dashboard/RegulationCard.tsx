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

export function RegulationCard({ regulation }: RegulationCardProps) {
  return (
    <Link href={`/dashboard/regulations/${regulation.id}`}>
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all cursor-pointer">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">
            {regulation.name}
          </h3>
          <Badge color={severityColor[regulation.severity]} size="sm">
            {regulation.severity}
          </Badge>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
          {regulation.summary}
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge color="gray" size="sm">{regulation.affectedArea}</Badge>
          <Badge color="gray" size="sm">{regulation.region}</Badge>
          <span className="ml-auto text-xs text-gray-500 dark:text-gray-500">
            {formatRelativeDate(regulation.publishedAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}
