"use client";

import { useTranslation } from "react-i18next";
import seed from "@/data/seed.json";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { Badge } from "@/components/ui/Badge";

export default function ClientsPage() {
  const { t } = useTranslation();
  const clients = seed.clients as any[];
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{t("clients")}</h1>
      <div className="grid grid-cols-1 gap-4">
        {clients.map((c) => (
          <Card key={c.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="font-medium">{c.name}</div>
                <Badge label={c.sla} tone="info" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <Metric label="Engagement" value={c.scores.engagement} />
                <Metric label="Billing Timeliness" value={c.scores.billing} />
                <Metric label="Satisfaction" value={c.scores.satisfaction} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="opacity-70">{label}</div>
        <div className="font-medium">{value}%</div>
      </div>
      <div className="mt-2"><Progress value={value} /></div>
    </div>
  );
}


