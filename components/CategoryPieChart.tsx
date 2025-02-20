"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart, Cell } from "recharts"

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

interface CategoryData {
    category: string
    total: number
    color: string
}

interface CategoryPieChartProps {
    data: CategoryData[]
}

const chartConfig: ChartConfig = {
    total: {
        label: "Total",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export function CategoryPieChart({ data }: CategoryPieChartProps): JSX.Element {
    return (
        <Card className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300 flex flex-col mb-6">
            <CardHeader className="items-center pb-2 border-b border-white/30">
                <CardTitle className="text-2xl font-bold">Category Breakdown</CardTitle>
                <CardDescription className="text-white/90">Current Period</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie data={data} dataKey="total" nameKey="category" outerRadius={100}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm border-t border-white/30 p-4">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by <span className="text-lg font-bold">5.2%</span> this month
                    <TrendingUp className="h-5 w-5 text-white animate-bounce" />
                </div>
                <div className="leading-none text-white/80">
                    Category breakdown of expenses
                </div>
            </CardFooter>
        </Card>
    )
}
