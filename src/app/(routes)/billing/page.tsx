"use client";

import { useTranslation } from "react-i18next";
import seed from "@/data/seed.json";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { MetricCard } from "@/components/MetricCard";
import { currency } from "@/lib/utils";

export default function BillingPage() {
  const { t } = useTranslation();
  const b = seed.billing as any;
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{t("billing")}</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard title="Work in Progress" value={currency(b.wip, "JOD")} />
        <MetricCard title="AR Aging" value={currency(b.arAging, "JOD")} />
        <MetricCard title="Realization Rate" value={`${b.realization}%`} />
        <MetricCard title="Total Profit" value={currency(b.profit, "JOD")} />
      </div>
      <Card>
        <CardHeader>
          <div className="font-medium">Time Capture</div>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
            {b.timeEntries.map((e: any, idx: number) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{e.matter}</div>
                  <div className="opacity-70">{e.desc}</div>
                </div>
                <div className="opacity-80">{e.hours}h × JOD {e.rate}/h</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


