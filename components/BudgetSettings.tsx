"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BudgetSettingsProps {
    budgets: Record<string, number>;
    onBudgetChange: (budgets: Record<string, number>) => void;
}

const categories = ["Food", "Transport", "Entertainment", "Bills", "Shopping", "Other"];

export function BudgetSettings({ budgets, onBudgetChange }: BudgetSettingsProps) {
    const [localBudgets, setLocalBudgets] = useState<Record<string, number>>(budgets);

    // Update local state if the parent budgets change
    useEffect(() => {
        setLocalBudgets(budgets);
    }, [budgets]);

    const handleChange = (category: string, value: string) => {
        const numericValue = parseFloat(value);
        setLocalBudgets((prev) => ({
            ...prev,
            [category]: isNaN(numericValue) ? 0 : numericValue,
        }));
    };

    const handleSave = async () => {
        try {
            const res = await fetch("/api/budgets", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(localBudgets),
            });
            if (!res.ok) {
                throw new Error("Failed to update budgets");
            }
            const data = await res.json();
            console.log(data.message);
            onBudgetChange(localBudgets);
        } catch (error) {
            console.error("Error saving budgets:", error);
        }
    };

    return (
        <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300 mb-6">
            <CardHeader className="pb-2 border-b border-white/30">
                <CardTitle className="text-2xl font-bold">Set Monthly Budgets</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className="space-y-4">
                    {categories.map((category) => (
                        <div key={category} className="flex items-center justify-between">
                            <label className="text-lg font-medium">{category}</label>
                            <input
                                type="number"
                                value={localBudgets[category] ?? 0}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(category, e.target.value)}
                                className="w-24 p-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
                            />
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="pt-2 border-t border-white/30 text-sm flex justify-end p-4">
                <Button
                    onClick={handleSave}
                    className="bg-white text-orange-500 font-bold px-6 py-3 rounded-md shadow hover:bg-orange-100 transition-colors"
                >
                    Save Budgets
                </Button>
            </CardFooter>
        </Card>
    );
}
