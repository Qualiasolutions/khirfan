import { cn } from "@/lib/utils";

export function Badge({ label, tone = "neutral", className }: { label: string; tone?: "neutral" | "success" | "warning" | "danger" | "info"; className?: string }) {
  const tones: Record<string, string> = {
    neutral: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200",
    success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    warning: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    danger: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
    info: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
  };
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", tones[tone], className)}>{label}</span>;
}


