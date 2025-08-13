"use client";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { fetchPracticeAreas } from "@/services/mockService";
import seed from "@/data/seed.json";

export default function ResearchPage() {
  const { t } = useTranslation();
  const [lens, setLens] = useState(false);
  const results = seed.research;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{t("research")}</h1>
        <Button variant={lens ? "default" : "outline"} size="sm" onClick={() => setLens((v) => !v)}>
          Construction / FIDIC Lens
        </Button>
      </div>
      <Card>
        <CardHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input placeholder="Enter your legal research query..." />
            <Input placeholder="Jurisdiction (e.g., Jordan)" defaultValue="Jordan" />
            <Button className="w-full md:w-auto">Search</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {results.map((r: any, idx: number) => (
              <div key={idx} className="rounded-xl border border-gray-100 dark:border-gray-800 p-4">
                <div className="text-sm opacity-70">{r.type} • {r.jurisdiction}</div>
                <div className="mt-1 font-medium">{r.title}</div>
                <div className="mt-1 text-sm opacity-80">{r.summary}</div>
                <div className="mt-2 text-xs opacity-60">{new Date(r.date).toLocaleDateString()} • {r.relevance}% relevant</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


