import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

interface SpendingInsightsProps {
    insights: string[];
    budgets: Record<string, number>;
    categoryExpenses: Record<string, number>;
}

export function SpendingInsights({ insights, budgets, categoryExpenses }: SpendingInsightsProps) {
    return (
        <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300 mb-8">
            <CardHeader className="pb-2 border-b border-white/30">
                <CardTitle className="text-3xl font-extrabold">Spending Insights</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
                {insights.length > 0 ? (
                    <ul className="list-disc pl-6 space-y-3">
                        {insights.map((cat) => (
                            <li key={cat} className="text-red-100 text-lg">
                                You have exceeded your budget for{" "}
                                <span className="font-semibold">{cat}</span>: Budget ${budgets[cat]}, Spent $
                                {(categoryExpenses[cat] || 0).toFixed(2)}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-green-200 text-lg">All categories are within budget.</p>
                )}
            </CardContent>
            <CardFooter className="pt-2 border-t border-white/30">
                <p className="text-sm text-white/80">
                    Review your spending habits to stay on track.
                </p>
            </CardFooter>
        </Card>
    );
}
