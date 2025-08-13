"use client";

import { useTranslation } from "react-i18next";
import seed from "@/data/seed.json";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function WorkflowsPage() {
  const { t } = useTranslation();
  const flows = seed.workflows as any[];
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{t("workflows")}</h1>
      <div className="grid grid-cols-1 gap-4">
        {flows.map((f) => (
          <Card key={f.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="font-medium">{f.name}</div>
                <div className="flex gap-2 items-center">
                  {f.tags.map((t: string) => (
                    <Badge key={t} label={t} tone="info" />
                  ))}
                  <Badge label={f.active ? "Running" : "Paused"} tone={f.active ? "success" : "neutral"} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 text-sm opacity-80 flex-wrap">
                {f.steps.map((s: string, i: number) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 px-3 py-1">{s}</div>
                    {i < f.steps.length - 1 && <span className="opacity-50">→</span>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


