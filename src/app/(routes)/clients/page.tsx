"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import seed from "@/data/seed.json";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { Badge } from "@/components/ui/Badge";
import type { ClientRecord } from "@/types/data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { Building2, Star, TrendingUp, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

export default function ClientsPage() {
  const { t } = useTranslation<"translation", undefined>();
  const clients = seed.clients as ClientRecord[];
  const [selectedClient, setSelectedClient] = useState<ClientRecord | null>(null);
  const [clientOpen, setClientOpen] = useState(false);

  const handleClientClick = (client: ClientRecord) => {
    setSelectedClient(client);
    setClientOpen(true);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{t("clients")}</h1>
      <div className="grid grid-cols-1 gap-4">
        {clients.map((c) => (
          <Card key={c.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleClientClick(c)}>
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

      <Dialog open={clientOpen} onOpenChange={setClientOpen}>
        <DialogContent>
          <DialogHeader onClose={() => setClientOpen(false)}>
            <DialogTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              {selectedClient?.name}
            </DialogTitle>
          </DialogHeader>
          <DialogBody>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Sector</div>
                  <div className="font-semibold">{selectedClient?.sector}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">SLA Status</div>
                  <div>
                    <Badge label={selectedClient?.sla || ""} tone="info" />
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Client ID</div>
                  <div className="font-mono text-xs">{selectedClient?.id}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    <Star className="h-4 w-4" />
                    Overall Rating
                  </div>
                  <div className="text-lg font-semibold">4.7/5</div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Performance Metrics
                </h3>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Engagement Score</span>
                      <span className="font-medium">{selectedClient?.scores.engagement}%</span>
                    </div>
                    <Progress value={selectedClient?.scores.engagement || 0} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Billing Timeliness</span>
                      <span className="font-medium">{selectedClient?.scores.billing}%</span>
                    </div>
                    <Progress value={selectedClient?.scores.billing || 0} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Satisfaction</span>
                      <span className="font-medium">{selectedClient?.scores.satisfaction}%</span>
                    </div>
                    <Progress value={selectedClient?.scores.satisfaction || 0} />
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Quick Actions</div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" onClick={() => toast.success("Email sent to client!")}>
                    <Mail className="h-3 w-3 mr-1" />
                    Send Email
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => toast.success("Call scheduled!")}>
                    <Phone className="h-3 w-3 mr-1" />
                    Schedule Call
                  </Button>
                </div>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onClick={() => setClientOpen(false)}>
              Close
            </Button>
            <Button onClick={() => toast.success("Client profile updated!")}>
              Update Profile
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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


