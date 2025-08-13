export function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(d);
}

export function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export function randomLatency() {
  return 200 + Math.floor(Math.random() * 400);
}

export function currency(amount: number, currencyCode: string = "JOD") {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 3,
  }).format(amount);
}

export type WithId<T> = T & { id: string };


