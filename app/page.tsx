"use client";

import { DashboardSummary } from "@/components/DashboardSummary";
import { MonthlyExpensesChart } from "@/components/MonthlyExpensesChart";
import { TransactionForm } from "@/components/TransactionForm";
import { TransactionList } from "@/components/TransactionList";
import { CategoryPieChart } from "@/components/CategoryPieChart";
import { SpendingInsights } from "@/components/SpendingInsights";
import { BudgetSettings } from "@/components/BudgetSettings";
import { COLORS } from "@/lib/constants";
import { JSX, useState, useEffect } from "react";
import BudgetComparisonContainer from "@/components/BudgetComparisonContainer";

// Types
interface TransactionFormValues {
  description: string;
  amount: string;
  date: string;
  category: string;
}

export interface Transaction {
  id: string;
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [budgets, setBudgets] = useState<Record<string, number>>({
    Food: 500,
    Transport: 200,
    Entertainment: 300,
    Bills: 400,
    Shopping: 250,
    Other: 150,
  });

  // Fetch transactions from the database on mount
  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error("Failed to fetch transactions", err));
  }, []);

  // Handle add/update transaction
  const handleSubmit = async () => {
    if (!form.description || !form.amount || !form.date || !form.category) {
      setError("All fields are required.");
      return;
    }
    try {
      let response;
      if (editingId) {
        // Update transaction via PUT request
        response = await fetch(`/api/transactions/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        // Create a new transaction via POST request
        response = await fetch("/api/transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      const savedTransaction = await response.json();
      if (!response.ok) {
        setError(savedTransaction.error || "Error saving transaction");
        return;
      }
      // Update local state
      const updatedTransactions = editingId
        ? transactions.map((t) => (t.id === editingId ? savedTransaction : t))
        : [...transactions, savedTransaction];
      setTransactions(updatedTransactions);
      setForm({ description: "", amount: "", date: "", category: "Food" });
      setEditingId(null);
      setError("");
    } catch (err) {
      setError("An error occurred while saving the transaction.");
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setForm({
      description: transaction.description,
      amount: transaction.amount.toString(),
      // Format date as YYYY-MM-DD for input type="date"
      date: new Date(transaction.date).toISOString().split("T")[0],
      category: transaction.category,
    });
    setEditingId(transaction.id);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/transactions/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTransactions(transactions.filter((t) => t.id !== id));
        if (editingId === id) {
          setEditingId(null);
          setForm({ description: "", amount: "", date: "", category: "Food" });
        }
      } else {
        console.error("Failed to delete transaction");
      }
    } catch (err) {
      console.error("Error deleting transaction", err);
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
      const date = new Date(t.date);
      const month = date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
      acc[month] = (acc[month] || 0) + t.amount;
      return acc;
    }, {})
  ).map(([month, total]) => ({ month, total }));
  const categoryExpensesData = Object.entries(categoryExpenses).map(([category, total], index) => ({
    category,
    total,
    color: COLORS[index % COLORS.length],
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
          setEditingId(null);
          setForm({ description: "", amount: "", date: "", category: "Food" });
        }}
        isEditing={editingId !== null}
        error={error}
      />
      <BudgetSettings budgets={budgets} onBudgetChange={setBudgets} />
      <DashboardSummary
        totalExpenses={totalExpenses}
        categoryExpenses={categoryExpenses}
        recentTransactions={mostRecentTransactions}
      />
      <TransactionList
        transactions={transactions}
        onEdit={handleEdit}
        onDelete={(id) => handleDelete(id)}
      />
      <MonthlyExpensesChart data={monthlyExpensesData} />
      <CategoryPieChart data={categoryExpensesData} />
      {/* Pass both budgets and transactions to BudgetComparisonContainer */}
      <BudgetComparisonContainer budgets={budgets} transactions={transactions} />
      <SpendingInsights
        insights={overBudgetCategories}
        budgets={budgets}
        categoryExpenses={categoryExpenses}
      />
    </div>
  );
}
