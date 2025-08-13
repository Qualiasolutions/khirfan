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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { Briefcase, Calendar, AlertTriangle, User, FileText } from "lucide-react";
import { toast } from "sonner";

type ViewMode = "list" | "board" | "calendar";

export default function MattersPage() {
  const { t } = useTranslation<"translation", undefined>();
  const [mode, setMode] = useState<ViewMode>("list");
  const [items, setItems] = useState<Matter[]>([]);
  const [selectedMatter, setSelectedMatter] = useState<Matter | null>(null);
  const [matterOpen, setMatterOpen] = useState(false);

  useEffect(() => {
    fetchMatters().then(setItems);
  }, []);

  const handleMatterClick = (matter: Matter) => {
    setSelectedMatter(matter);
    setMatterOpen(true);
  };

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
                  <TableRow 
                    key={m.id} 
                    className="cursor-pointer"
                    onClick={() => handleMatterClick(m)}
                  >
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

      <Dialog open={matterOpen} onOpenChange={setMatterOpen}>
        <DialogContent>
          <DialogHeader onClose={() => setMatterOpen(false)}>
            <DialogTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Matter {selectedMatter?.id}
            </DialogTitle>
          </DialogHeader>
          <DialogBody>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                      <User className="h-4 w-4" />
                      Client
                    </div>
                    <div className="text-lg font-semibold">{selectedMatter?.client}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                      <FileText className="h-4 w-4" />
                      Practice Area
                    </div>
                    <div>
                      <Badge label={selectedMatter?.practiceArea || ""} tone="info" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                      <AlertTriangle className="h-4 w-4" />
                      Risk Level
                    </div>
                    <div>
                      {selectedMatter?.risk === "High" && <Badge label="high" tone="danger" />}
                      {selectedMatter?.risk === "Medium" && <Badge label="medium" tone="warning" />}
                      {selectedMatter?.risk === "Low" && <Badge label="low" tone="success" />}
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Stage</div>
                    <div>
                      <Badge label={selectedMatter?.stage || ""} tone="neutral" />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Owner</div>
                    <div className="font-medium">{selectedMatter?.owner}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                      <Calendar className="h-4 w-4" />
                      Deadline
                    </div>
                    <div className="font-medium">
                      {selectedMatter?.deadline ? new Date(selectedMatter.deadline).toLocaleDateString() : 'No deadline set'}
                    </div>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Next Action</div>
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                    <div className="text-sm">{selectedMatter?.nextAction}</div>
                  </div>
                </div>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMatterOpen(false)}>
              Close
            </Button>
            <Button onClick={() => toast.success("Matter assigned to calendar!")}>
              <Calendar className="h-4 w-4 mr-1" />
              Schedule Action
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


