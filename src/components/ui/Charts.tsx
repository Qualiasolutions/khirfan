"use client"

import * as React from "react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface ChartContainerProps {
  children: React.ReactElement
  className?: string
  height?: number
}

export function ChartContainer({ children, className, height = 300 }: ChartContainerProps) {
  return (
    <ResponsiveContainer width="100%" height={height} className={className}>
      {children}
    </ResponsiveContainer>
  )
}

interface SimpleAreaChartProps {
  data: Record<string, unknown>[]
  dataKey: string
  xDataKey?: string
  color?: string
  className?: string
  height?: number
}

export function SimpleAreaChart({ 
  data, 
  dataKey, 
  xDataKey = "name",
  color = "#06b6d4",
  className,
  height = 300 
}: SimpleAreaChartProps) {
  return (
    <ChartContainer height={height} className={className}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
            <stop offset="95%" stopColor={color} stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-800" />
        <XAxis 
          dataKey={xDataKey}
          className="text-xs"
          tick={{ fill: 'currentColor', opacity: 0.7 }}
        />
        <YAxis 
          className="text-xs"
          tick={{ fill: 'currentColor', opacity: 0.7 }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'var(--color-background)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px'
          }}
        />
        <Area 
          type="monotone" 
          dataKey={dataKey} 
          stroke={color}
          fill={`url(#gradient-${dataKey})`}
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  )
}

interface SimpleBarChartProps {
  data: Record<string, unknown>[]
  dataKey: string
  xDataKey?: string
  color?: string
  className?: string
  height?: number
}

export function SimpleBarChart({ 
  data, 
  dataKey,
  xDataKey = "name",
  color = "#06b6d4",
  className,
  height = 300
}: SimpleBarChartProps) {
  return (
    <ChartContainer height={height} className={className}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-800" />
        <XAxis 
          dataKey={xDataKey}
          className="text-xs"
          tick={{ fill: 'currentColor', opacity: 0.7 }}
        />
        <YAxis 
          className="text-xs"
          tick={{ fill: 'currentColor', opacity: 0.7 }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'var(--color-background)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px'
          }}
        />
        <Bar dataKey={dataKey} fill={color} radius={[8, 8, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}

interface SimplePieChartProps {
  data: Record<string, unknown>[]
  dataKey: string
  colors?: string[]
  className?: string
  height?: number
}

export function SimplePieChart({
  data,
  dataKey,
  colors = ["#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
  className,
  height = 300
}: SimplePieChartProps) {
  return (
    <ChartContainer height={height} className={className}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey={dataKey}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ChartContainer>
  )
}