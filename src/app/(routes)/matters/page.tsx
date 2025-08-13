"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "react-i18next";
import { KanbanSquare, List, CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { fetchMatters } from "@/services/mockService";
import { useEffect } from "react";
import type { Matter } from "@/types/data";

type ViewMode = "list" | "board" | "calendar";

export default function MattersPage() {
  const { t } = useTranslation<"translation", undefined>();
  const [mode, setMode] = useState<ViewMode>("list");
  const [items, setItems] = useState<Matter[]>([]);

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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Matter #</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Practice Area</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Risk</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="font-medium">{m.id}</TableCell>
                    <TableCell>{m.client}</TableCell>
                    <TableCell><Badge label={m.practiceArea} tone="info" /></TableCell>
                    <TableCell><Badge label={m.stage} tone="neutral" /></TableCell>
                    <TableCell>{m.owner}</TableCell>
                    <TableCell>
                      {m.risk === "High" && <Badge label="high" tone="danger" />}
                      {m.risk === "Medium" && <Badge label="medium" tone="warning" />}
                      {m.risk === "Low" && <Badge label="low" tone="success" />}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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


