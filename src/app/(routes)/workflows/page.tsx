"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import seed from "@/data/seed.json";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { WorkflowRecord } from "@/types/data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { Workflow, Play, Pause, Settings } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

export default function WorkflowsPage() {
  const { t } = useTranslation<"translation", undefined>();
  const flows = seed.workflows as WorkflowRecord[];
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowRecord | null>(null);
  const [workflowOpen, setWorkflowOpen] = useState(false);

  const handleWorkflowClick = (workflow: WorkflowRecord) => {
    setSelectedWorkflow(workflow);
    setWorkflowOpen(true);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{t("workflows")}</h1>
      <div className="grid grid-cols-1 gap-4">
        {flows.map((f) => (
          <Card key={f.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleWorkflowClick(f)}>
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

      <Dialog open={workflowOpen} onOpenChange={setWorkflowOpen}>
        <DialogContent>
          <DialogHeader onClose={() => setWorkflowOpen(false)}>
            <DialogTitle className="flex items-center gap-2">
              <Workflow className="h-5 w-5" />
              {selectedWorkflow?.name}
            </DialogTitle>
          </DialogHeader>
          <DialogBody>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</div>
                  <div>
                    <Badge 
                      label={selectedWorkflow?.active ? "Running" : "Paused"} 
                      tone={selectedWorkflow?.active ? "success" : "neutral"} 
                    />
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Workflow ID</div>
                  <div className="font-mono text-xs">{selectedWorkflow?.id}</div>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Tags</div>
                <div className="flex flex-wrap gap-2">
                  {selectedWorkflow?.tags.map((tag) => (
                    <Badge key={tag} label={tag} tone="info" />
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Workflow Steps</div>
                <div className="space-y-2">
                  {selectedWorkflow?.steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300 flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm">
                        {step}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Quick Actions</div>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => toast.success(selectedWorkflow?.active ? "Workflow paused!" : "Workflow started!")}
                  >
                    {selectedWorkflow?.active ? (
                      <>
                        <Pause className="h-3 w-3 mr-1" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-3 w-3 mr-1" />
                        Start
                      </>
                    )}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => toast.success("Workflow settings opened!")}>
                    <Settings className="h-3 w-3 mr-1" />
                    Configure
                  </Button>
                </div>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onClick={() => setWorkflowOpen(false)}>
              Close
            </Button>
            <Button onClick={() => toast.success("Workflow duplicated!")}>
              Duplicate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


