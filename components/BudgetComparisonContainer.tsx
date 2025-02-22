"use client";

import { useState, useEffect } from "react";
import { BudgetComparisonChart } from "@/components/BudgetComparisonChart";

interface BudgetComparisonData {
    category: string;
    budget: number;
    actual: number;
}

interface BudgetComparisonContainerProps {
    budgets: Record<string, number>;
    transactions: { category: string; amount: number }[];
}

export default function BudgetComparisonContainer({
    budgets,
    transactions,
}: BudgetComparisonContainerProps) {
    const [data, setData] = useState<BudgetComparisonData[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        try {
            // Aggregate expenses per category from the transactions prop
            const categoryExpenses = transactions.reduce((acc: Record<string, number>, t) => {
                acc[t.category] = (acc[t.category] || 0) + t.amount;
                return acc;
            }, {} as Record<string, number>);

            // Build comparison data using the budgets from props
            const comparisonData: BudgetComparisonData[] = Object.keys(budgets).map((category) => ({
                category,
                budget: budgets[category],
                actual: categoryExpenses[category] || 0,
            }));

            setData(comparisonData);
        } catch (err: any) {
            setError(err.message);
        }
    }, [budgets, transactions]); // Recalculate whenever budgets or transactions change

    if (error) {
        return <div>Error: {error}</div>;
    }

    return <BudgetComparisonChart data={data} />;
}
