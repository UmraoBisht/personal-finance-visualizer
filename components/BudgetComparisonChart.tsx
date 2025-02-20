"use client"

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
import { JSX } from "react"

interface BudgetComparisonData {
    category: string;
    budget: number;
    actual: number;
}

interface BudgetComparisonChartProps {
    data: BudgetComparisonData[];
}

const chartConfig: ChartConfig = {
    budget: {
        label: "Budget",
        color: "hsl(var(--chart-1))",
    },
    actual: {
        label: "Actual",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export function BudgetComparisonChart({ data }: BudgetComparisonChartProps): JSX.Element {
    return (
        <Card className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300 flex flex-col mb-6">
            <CardHeader className="pb-2 border-b border-white/30">
                <CardTitle className="text-2xl font-bold">Budget vs Actual</CardTitle>
                <CardDescription className="text-white/90">Comparison by Category</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
                <ChartContainer config={chartConfig}>
                    <BarChart data={data}>
                        <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.3)" />
                        <XAxis
                            dataKey="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            stroke="rgba(255,255,255,0.8)"
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                        <Bar dataKey="budget" fill="var(--color-budget)" radius={4} />
                        <Bar dataKey="actual" fill="var(--color-actual)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="pt-4 border-t border-white/30 flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up by <span className="text-lg font-bold">5.2%</span> this month{" "}
                    <TrendingUp className="h-5 w-5 text-white animate-bounce" />
                </div>
                <div className="leading-none text-white/80">
                    Budget vs Actual comparison across categories
                </div>
            </CardFooter>
        </Card>
    )
}
