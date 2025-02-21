


// src/lib/api.ts

// Types for Transactions
export interface TransactionFormValues {
  description: string;
  amount: string;
  date: string;
  category: string;
}

export interface Transaction {
  id?: string; // Provided by the database
  description: string;
  amount: number;
  date: string;
  category: string;
}

// Create a new transaction
export async function createTransaction(
  data: TransactionFormValues
): Promise<Transaction> {
  const response = await fetch("/api/transactions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create transaction");
  }
  return response.json();
}

// Fetch all transactions
export async function fetchTransactions(): Promise<Transaction[]> {
  const response = await fetch("/api/transactions");
  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }
  return response.json();
}

// Update an existing transaction by ID
export async function updateTransaction(
  id: string,
  data: TransactionFormValues
): Promise<Transaction> {
  const response = await fetch(`/ api / transactions / ${ id } `, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update transaction");
  }
  return response.json();
}

// Delete a transaction by ID
export async function deleteTransaction(id: string): Promise<Transaction> {
  const response = await fetch(`/ api / transactions / ${ id } `, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete transaction");
  }
  return response.json();
}

// Types for Budgets
export interface Budget {
  id?: string; // Provided by the database
  category: string;
  amount: number;
}

// Fetch all budgets
export async function fetchBudgets(): Promise<Budget[]> {
  const response = await fetch("/api/budgets");
  if (!response.ok) {
    throw new Error("Failed to fetch budgets");
  }
  return response.json();
}

// Upsert (create/update) budgets for all categories
export async function upsertBudgets(
  budgets: Record<string, number>
): Promise<Budget[]> {
  const response = await fetch("/api/budgets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(budgets),
  });
  if (!response.ok) {
    throw new Error("Failed to upsert budgets");
  }
  return response.json();
}
