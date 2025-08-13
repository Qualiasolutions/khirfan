"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { TrendingDown, TrendingUp, Timer, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { SimpleAreaChart } from "@/components/ui/Charts";
import { toast } from "sonner";
import { AIAssistantChat } from "@/components/AIAssistantChat";

export default function Home() {
  const { t } = useTranslation();
  const [chatOpen, setChatOpen] = useState(false);
  
  // Mock performance data
  const performanceData = [
    { month: "Jan", efficiency: 72 },
    { month: "Feb", efficiency: 78 },
    { month: "Mar", efficiency: 85 },
    { month: "Apr", efficiency: 88 },
    { month: "May", efficiency: 92 },
    { month: "Jun", efficiency: 95 },
  ];

  const handleAIAssist = () => {
    setChatOpen(true);
    toast.success("🤖 AI Assistant activated!");
  };
  
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 bg-white/50 dark:bg-black/20">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-cyan-600 text-white flex items-center justify-center">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-semibold">AI that augments your practice, not replaces it.</h1>
            <p className="opacity-70 text-sm">{t("poweredBy")}</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <KpiCard icon={<Timer className="h-5 w-5" />} title="Turnaround time" value="↓ 40–70%" trend="positive" />
          <KpiCard icon={<TrendingDown className="h-5 w-5" />} title="Manual errors" value="↓ 32%" trend="positive" />
          <KpiCard icon={<TrendingUp className="h-5 w-5" />} title="Client SLAs met" value="↑ 98%" trend="positive" />
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 bg-white/50 dark:bg-black/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">System Efficiency</h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleAIAssist}
          >
            <Sparkles className="h-4 w-4 mr-2" /> AI Assist
          </Button>
        </div>
        <SimpleAreaChart 
          data={performanceData} 
          dataKey="efficiency" 
          xDataKey="month"
          height={200}
        />
      </div>
      <div className="xl:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <MiniWidget title="Next Deadlines" items={["Hearing - 12 Apr", "Filing - 19 Apr"]} />
        <MiniWidget title="Active Matters" items={["KPA-2025-0012", "KPA-2025-0045"]} />
        <MiniWidget title="Client Satisfaction" items={["NPS 62", "4.7/5 avg"]} />
        <MiniWidget title="Data Compliance Status" items={["PDP 2023 - Pass", "3 warnings"]} />
      </div>
      
      <AIAssistantChat open={chatOpen} onOpenChange={setChatOpen} />
    </div>
  );
}

function KpiCard({ icon, title, value, trend }: { icon: React.ReactNode; title: string; value: string; trend: "positive" | "negative" }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
      <div className="flex items-center gap-2 text-sm opacity-70">{icon} {title}</div>
      <div className={"mt-1 text-2xl font-semibold " + (trend === "positive" ? "text-emerald-600" : "text-rose-600")}>{value}</div>
    </motion.div>
  );
}

function MiniWidget({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-white/50 dark:bg-black/20">
      <div className="text-sm font-medium mb-2">{title}</div>
      <ul className="space-y-1 text-sm opacity-80">
        {items.map((i) => (
          <li key={i}>• {i}</li>
        ))}
      </ul>
    </div>
  );
}
