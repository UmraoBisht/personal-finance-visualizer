import { Button } from "./ui/button";

interface Transaction {
    id: string;
    description: string;
    amount: number;
    date: string;
    category: string;
}

interface TransactionListProps {
    transactions: Transaction[];
    onEdit: (transaction: Transaction) => void;
    onDelete: (id: string) => void;
}

export function TransactionList({ transactions, onEdit, onDelete }: TransactionListProps) {
    // Helper to format date using the user's locale (or specify "en-US", etc.)
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    };

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">All Transactions</h2>
            {transactions.length > 0 ? (
                <ul className="space-y-6">
                    {transactions.map((t) => (
                        <li
                            key={t.id}
                            className="bg-white/95 backdrop-blur-sm p-5 rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                        >
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                <div>
                                    <p className="text-xl font-semibold text-gray-900">{t.description}</p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {formatDate(t.date)} &bull; {t.category} &bull; ${t.amount.toFixed(2)}
                                    </p>
                                </div>
                                <div className="mt-4 sm:mt-0 flex space-x-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onEdit(t)}
                                        className="text-blue-600 hover:bg-blue-50"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onDelete(t.id)}
                                        className="text-red-600 hover:bg-red-50"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500">No transactions added yet.</p>
            )}
        </div>
    );
}
