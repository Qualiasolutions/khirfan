"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { fetchDocuments } from "@/services/mockService";
import { useEffect } from "react";
import type { DocumentItem } from "@/types/data";

type Flow = "library" | "generate" | "review";

export default function DocumentsPage() {
  const { t } = useTranslation<"translation", undefined>();
  const [flow, setFlow] = useState<Flow>("library");
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  useEffect(() => {
    fetchDocuments().then(setDocs);
  }, []);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{t("documents")}</h1>
        <div className="flex gap-2">
          <Button variant={flow === "library" ? "default" : "outline"} size="sm" onClick={() => setFlow("library")}>Library</Button>
          <Button variant={flow === "generate" ? "default" : "outline"} size="sm" onClick={() => setFlow("generate")}>Generate</Button>
          <Button variant={flow === "review" ? "default" : "outline"} size="sm" onClick={() => setFlow("review")}>Review</Button>
        </div>
      </div>
      {flow === "library" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {docs.map((d) => (
            <Card key={d.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="font-medium">{d.name}</div>
                  <Badge label={d.status} tone={d.status === "approved" ? "success" : d.status === "review" ? "warning" : "neutral"} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-xs opacity-70">Version: {d.version}</div>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm">View</Button>
                  <Button variant="outline" size="sm">Export</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {flow === "generate" && (
        <Card className="p-6 text-sm">Generate flow: template → form → recommendations → preview → approve.</Card>
      )}
      {flow === "review" && (
        <Card className="p-6 text-sm">Review mode: risky clauses, signatures, date mismatches.</Card>
      )}
    </div>
  );
}


