"use client"

import { JSX } from "react"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface MonthlyExpenseData {
  month: string
  total: number
}

interface MonthlyExpensesChartProps {
  data: MonthlyExpenseData[]
}

const chartConfig: ChartConfig = {
  total: {
    label: "Expenses",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function MonthlyExpensesChart({ data }: MonthlyExpensesChartProps): JSX.Element {
  return (
    <Card className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300 flex flex-col mb-6">
      <CardHeader className="pb-2 border-b border-white/30">
        <CardTitle className="text-2xl font-bold">Monthly Expenses</CardTitle>
        <CardDescription className="text-white/90">Last 6 Months</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <ChartContainer config={chartConfig}>
          <BarChart data={data}>
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.25)" />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              stroke="rgba(255,255,255,0.9)"
              className="font-semibold"
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="total" fill={chartConfig.total.color} radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm border-t border-white/30 p-4">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by <span className="text-lg font-bold">5.2%</span> this month{" "}
          <TrendingUp className="h-5 w-5 text-white animate-bounce" />
        </div>
        <div className="leading-none text-white/80">
          Showing expenses for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
