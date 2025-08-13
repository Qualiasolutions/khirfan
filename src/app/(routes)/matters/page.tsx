"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "react-i18next";
import { KanbanSquare, List, CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { fetchMatters } from "@/services/mockService";
import { useEffect } from "react";

type ViewMode = "list" | "board" | "calendar";

export default function MattersPage() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<ViewMode>("list");
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetchMatters().then(setItems);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{t("matters")}</h1>
        <div className="flex gap-2">
          <Button variant={mode === "list" ? "default" : "outline"} size="sm" onClick={() => setMode("list")}>
            <List className="h-4 w-4 mr-2" /> List
          </Button>
          <Button variant={mode === "board" ? "default" : "outline"} size="sm" onClick={() => setMode("board")}>
            <KanbanSquare className="h-4 w-4 mr-2" /> Board
          </Button>
          <Button variant={mode === "calendar" ? "default" : "outline"} size="sm" onClick={() => setMode("calendar")}>
            <CalendarDays className="h-4 w-4 mr-2" /> Calendar
          </Button>
        </div>
      </div>

      {mode === "list" && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Input placeholder="Search..." className="max-w-md" />
              <div className="ml-auto flex gap-2">
                <Button variant="outline" size="sm">All Practice Areas</Button>
                <Button variant="outline" size="sm">All Risk</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left opacity-70">
                  <tr>
                    <th className="py-2 pr-4">Matter #</th>
                    <th className="py-2 pr-4">Client</th>
                    <th className="py-2 pr-4">Practice Area</th>
                    <th className="py-2 pr-4">Stage</th>
                    <th className="py-2 pr-4">Owner</th>
                    <th className="py-2 pr-4">Risk</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((m) => (
                    <tr key={m.id} className="border-t border-gray-100 dark:border-gray-800">
                      <td className="py-3 pr-4 font-medium">{m.id}</td>
                      <td className="py-3 pr-4">{m.client}</td>
                      <td className="py-3 pr-4"><Badge label={m.practiceArea} tone="info" /></td>
                      <td className="py-3 pr-4"><Badge label={m.stage} tone="neutral" /></td>
                      <td className="py-3 pr-4">{m.owner}</td>
                      <td className="py-3 pr-4">
                        {m.risk === "High" && <Badge label="high" tone="danger" />}
                        {m.risk === "Medium" && <Badge label="medium" tone="warning" />}
                        {m.risk === "Low" && <Badge label="low" tone="success" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {mode === "board" && (
        <Card className="p-6 text-sm">Kanban board placeholder with stages.</Card>
      )}
      {mode === "calendar" && (
        <Card className="p-6 text-sm">Calendar view placeholder with deadlines.</Card>
      )}
    </div>
  );
}


