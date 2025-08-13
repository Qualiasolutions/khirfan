import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

export function Card({ className, children, ...props }: { className?: string; children: ReactNode } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-black/20", className)} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("px-5 pt-5 pb-3", className)}>{children}</div>;
}

export function CardContent({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("px-5 pb-5", className)}>{children}</div>;
}


