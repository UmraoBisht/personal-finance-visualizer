import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { categories } from "@/lib/constants";

interface Transaction {
  description: string;
  amount: number;
  date: string;
  category: string;
}

interface DashboardSummaryProps {
  totalExpenses: number;
  categoryExpenses: Record<string, number>;
  recentTransactions: Transaction[];
}

export function DashboardSummary({
  totalExpenses,
  categoryExpenses,
  recentTransactions,
}: DashboardSummaryProps) {
  // Helper function to format dates for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
      {/* Total Expenses Card */}
      <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
        <CardHeader className="border-b border-white/30 pb-2">
          <CardTitle className="text-2xl font-bold">Total Expenses</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="mt-2 text-5xl font-extrabold">${totalExpenses.toFixed(2)}</p>
        </CardContent>
        <CardFooter className="pt-2 border-t border-white/30 text-sm">
          <p className="opacity-80">Overall spending to date</p>
        </CardFooter>
      </Card>

      {/* Category Breakdown Card */}
      <Card className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
        <CardHeader className="border-b border-white/30 pb-2">
          <CardTitle className="text-2xl font-bold">Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ul className="mt-4 space-y-3">
            {categories.map((cat) => (
              <li key={cat} className="flex justify-between text-lg">
                <span className="font-medium">{cat}</span>
                <span className="font-semibold">
                  ${(categoryExpenses[cat] || 0).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="pt-2 border-t border-white/30 text-sm">
          <p className="opacity-80">Spending per category</p>
        </CardFooter>
      </Card>

      {/* Recent Transactions Card */}
      <Card className="bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
        <CardHeader className="border-b border-white/30 pb-2">
          <CardTitle className="text-2xl font-bold">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ul className="mt-4 space-y-3 text-lg">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((t, index) => (
                <li key={index} className="flex justify-between">
                  <span>{formatDate(t.date)} - {t.description}</span>
                  <span className="font-semibold">${t.amount.toFixed(2)}</span>
                </li>
              ))
            ) : (
              <li className="text-center opacity-80">No recent transactions.</li>
            )}
          </ul>
        </CardContent>
        <CardFooter className="pt-2 border-t border-white/30 text-sm">
          <p className="opacity-80">Latest recorded transactions</p>
        </CardFooter>
      </Card>
    </div>
  );
}
