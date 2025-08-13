"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { fetchDocuments } from "@/services/mockService";
import { useEffect } from "react";
import type { DocumentItem } from "@/types/data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { FileText, Download, Eye } from "lucide-react";
import { toast } from "sonner";

type Flow = "library" | "generate" | "review";

export default function DocumentsPage() {
  const { t } = useTranslation<"translation", undefined>();
  const [flow, setFlow] = useState<Flow>("library");
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [viewOpen, setViewOpen] = useState(false);

  useEffect(() => {
    fetchDocuments().then(setDocs);
  }, []);

  const handleViewDocument = (doc: DocumentItem) => {
    setSelectedDoc(doc);
    setViewOpen(true);
  };

  const handleExportDocument = (doc: DocumentItem) => {
    toast.success(`📄 ${doc.name} exported successfully!`, {
      description: "Document saved to Downloads folder",
    });
  };
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
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDocument(d)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExportDocument(d)}
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Export
                  </Button>
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

      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent>
          <DialogHeader onClose={() => setViewOpen(false)}>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {selectedDoc?.name}
            </DialogTitle>
          </DialogHeader>
          <DialogBody>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium text-gray-500 dark:text-gray-400">Category</div>
                  <div>{selectedDoc?.category}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-500 dark:text-gray-400">Version</div>
                  <div>{selectedDoc?.version}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-500 dark:text-gray-400">Status</div>
                  <div>
                    <Badge 
                      label={selectedDoc?.status || "draft"} 
                      tone={
                        selectedDoc?.status === "approved" ? "success" : 
                        selectedDoc?.status === "review" ? "warning" : 
                        "neutral"
                      } 
                    />
                  </div>
                </div>
                <div>
                  <div className="font-medium text-gray-500 dark:text-gray-400">Document ID</div>
                  <div className="font-mono text-xs">{selectedDoc?.id}</div>
                </div>
              </div>
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Document Preview</div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded p-4 text-sm">
                  <p className="mb-2"><strong>AGREEMENT</strong></p>
                  <p className="mb-2">This agreement is entered into between the parties...</p>
                  <p className="mb-2">1. <strong>Terms and Conditions</strong></p>
                  <p className="text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                  <p className="mt-4 text-center text-gray-400">--- Document continues ---</p>
                </div>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewOpen(false)}>
              Close
            </Button>
            <Button onClick={() => selectedDoc && handleExportDocument(selectedDoc)}>
              <Download className="h-4 w-4 mr-1" />
              Export PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


