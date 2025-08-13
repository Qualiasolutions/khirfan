"use client";

import { useTranslation } from "react-i18next";
import seed from "@/data/seed.json";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { MetricCard } from "@/components/MetricCard";
import { currency } from "@/lib/utils";
import type { BillingData } from "@/types/data";
import { SimpleAreaChart, SimpleBarChart } from "@/components/ui/Charts";

export default function BillingPage() {
  const { t } = useTranslation<"translation", undefined>();
  const b = seed.billing as BillingData;
  
  // Mock data for charts
  const revenueData = [
    { month: "Jan", revenue: 45000 },
    { month: "Feb", revenue: 52000 },
    { month: "Mar", revenue: 48000 },
    { month: "Apr", revenue: 61000 },
    { month: "May", revenue: 55000 },
    { month: "Jun", revenue: 67000 },
  ];
  
  const billingByPractice = [
    { area: "Corporate", amount: 120000 },
    { area: "Litigation", amount: 95000 },
    { area: "Real Estate", amount: 78000 },
    { area: "IP", amount: 65000 },
  ];
  
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{t("billing")}</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard title="Work in Progress" value={currency(b.wip, "JOD")} />
        <MetricCard title="AR Aging" value={currency(b.arAging, "JOD")} />
        <MetricCard title="Realization Rate" value={`${b.realization}%`} />
        <MetricCard title="Total Profit" value={currency(b.profit, "JOD")} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <div className="font-medium">Monthly Revenue Trend</div>
          </CardHeader>
          <CardContent>
            <SimpleAreaChart 
              data={revenueData} 
              dataKey="revenue" 
              xDataKey="month"
              height={250}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="font-medium">Billing by Practice Area</div>
          </CardHeader>
          <CardContent>
            <SimpleBarChart 
              data={billingByPractice} 
              dataKey="amount" 
              xDataKey="area"
              color="#10b981"
              height={250}
            />
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="font-medium">Time Capture</div>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
            {b.timeEntries.map((e, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{e.matter}</div>
                  <div className="opacity-70">{e.desc}</div>
                </div>
                <div className="opacity-80">{e.hours}h × JOD {e.rate}/h</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


