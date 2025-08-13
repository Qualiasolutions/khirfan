"use client";

import { useTranslation } from "react-i18next";
import seed from "@/data/seed.json";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";

export default function GovernancePage() {
  const { t } = useTranslation();
  const g = seed.governance as any;
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{t("governance")}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <div className="text-sm opacity-70">Overall Compliance</div>
            <div className="text-2xl font-semibold">{g.overall}%</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <div className="text-sm opacity-70">Active Policies</div>
            <div className="text-2xl font-semibold">{g.policies}</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <div className="text-sm opacity-70">Last Audit</div>
            <div className="text-2xl font-semibold">{g.lastAuditDays} days</div>
          </CardHeader>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <div className="font-medium">PDP Law 2023 Compliance</div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(g.pdp).map(([k, v]) => (
              <div key={k}>
                <div className="flex items-center justify-between text-sm">
                  <div className="opacity-70">{k}</div>
                  <div className="font-medium">{v as number}%</div>
                </div>
                <div className="mt-2"><Progress value={v as number} /></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


