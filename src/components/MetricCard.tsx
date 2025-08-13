import { ReactNode } from "react";

export function MetricCard({
  title,
  value,
  helper,
  icon,
}: {
  title: string;
  value: string | number;
  helper?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-4 bg-white/50 dark:bg-black/20">
      <div className="flex items-center justify-between">
        <div className="text-sm opacity-70">{title}</div>
        {icon}
      </div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      {helper && <div className="text-xs opacity-70 mt-1">{helper}</div>}
    </div>
  );
}


