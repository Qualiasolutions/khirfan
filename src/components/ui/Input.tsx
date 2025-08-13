import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input(props: InputHTMLAttributes<HTMLInputElement> & { className?: string }) {
  const { className, ...rest } = props;
  return (
    <input
      {...rest}
      className={cn(
        "w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-black/20 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-500",
        className
      )}
    />
  );
}


