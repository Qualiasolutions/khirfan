export function Progress({ value }: { value: number }) {
  return (
    <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-800">
      <div className="h-2 rounded-full bg-cyan-600" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}


