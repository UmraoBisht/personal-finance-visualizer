"use client"

import { DashboardSummary } from "@/components/DashboardSummary";
import { MonthlyExpensesChart } from "@/components/MonthlyExpensesChart";
import { TransactionForm } from "@/components/TransactionForm";
import { TransactionList } from "@/components/TransactionList";
import { CategoryPieChart } from "@/components/CategoryPieChart";
import { BudgetComparisonChart } from "@/components/BudgetComparisonChart";
import { SpendingInsights } from "@/components/SpendingInsights";
import { BudgetSettings } from "@/components/BudgetSettings";
import { COLORS } from "@/lib/constants";
import { JSX, useState } from "react";

// Types
interface TransactionFormValues {
  description: string;
  amount: string;
  date: string;
  category: string;
}

interface Transaction {
  description: string;
  amount: number;
  date: string;
  category: string;
}

export default function PersonalFinanceVisualizer(): JSX.Element {
  // Global state
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [form, setForm] = useState<TransactionFormValues>({
    description: "",
    amount: "",
    date: "",
    category: "Food",
  });
  const [error, setError] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [budgets, setBudgets] = useState<Record<string, number>>({
    Food: 500,
    Transport: 200,
    Entertainment: 300,
    Bills: 400,
    Shopping: 250,
    Other: 150,
  });

  // Handle add/update transaction
  const handleSubmit = () => {
    if (!form.description || !form.amount || !form.date || !form.category) {
      setError("All fields are required.");
      return;
    }
    const newTransaction: Transaction = { ...form, amount: parseFloat(form.amount) };
    if (editingIndex !== null) {
      const updatedTransactions = [...transactions];
      updatedTransactions[editingIndex] = newTransaction;
      setTransactions(updatedTransactions);
      setEditingIndex(null);
    } else {
      setTransactions([...transactions, newTransaction]);
    }
    setForm({ description: "", amount: "", date: "", category: "Food" });
    setError("");
  };

  const handleEdit = (index: number) => {
    const t = transactions[index];
    setForm({
      description: t.description,
      amount: t.amount.toString(),
      date: t.date,
      category: t.category,
    });
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    setTransactions(transactions.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
      setForm({ description: "", amount: "", date: "", category: "Food" });
    }
  };

  // Dashboard calculations
  const totalExpenses = transactions.reduce((acc, t) => acc + t.amount, 0);
  const categoryExpenses = transactions.reduce<Record<string, number>>((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});
  const monthlyExpensesData = Object.entries(
    transactions.reduce<Record<string, number>>((acc, t) => {
      const month = new Date(t.date).toLocaleString("default", { month: "short" });
      acc[month] = (acc[month] || 0) + t.amount;
      return acc;
    }, {})
  ).map(([month, total]) => ({ month, total }));
  const categoryExpensesData = Object.entries(categoryExpenses).map(([category, total], index) => ({
    category,
    total,
    color: COLORS[index % COLORS.length],
  }));
  const budgetComparisonData = Object.keys(budgets).map((category) => ({
    category,
    budget: budgets[category],
    actual: categoryExpenses[category] || 0,
  }));
  const overBudgetCategories = Object.keys(budgets).filter(
    (cat) => (categoryExpenses[cat] || 0) > budgets[cat]
  );
  const mostRecentTransactions = [...transactions].slice(-3).reverse();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <TransactionForm
        form={form}
        onFormChange={setForm}
        onSubmit={handleSubmit}
        onCancel={() => {
          setEditingIndex(null);
          setForm({ description: "", amount: "", date: "", category: "Food" });
        }}
        isEditing={editingIndex !== null}
        error={error}
      />
      <BudgetSettings budgets={budgets} onBudgetChange={setBudgets} />
      <DashboardSummary
        totalExpenses={totalExpenses}
        categoryExpenses={categoryExpenses}
        recentTransactions={mostRecentTransactions}
      />
      <TransactionList transactions={transactions} onEdit={handleEdit} onDelete={handleDelete} />
      <MonthlyExpensesChart data={monthlyExpensesData} />
      <CategoryPieChart data={categoryExpensesData} />
      <BudgetComparisonChart data={budgetComparisonData} />
      <SpendingInsights insights={overBudgetCategories} budgets={budgets} categoryExpenses={categoryExpenses} />
    </div>
  );
}
