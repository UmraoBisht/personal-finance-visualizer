import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Types
interface TransactionFormValues {
    description: string;
    amount: string;
    date: string;
    category: string;
}

interface TransactionFormProps {
    form: TransactionFormValues;
    onFormChange: (form: TransactionFormValues) => void;
    onSubmit: () => void;
    onCancel: () => void;
    isEditing: boolean;
    error: string;
}

// Constants
const categories = ["Food", "Transport", "Entertainment", "Bills", "Shopping", "Other"];

export function TransactionForm({
    form,
    onFormChange,
    onSubmit,
    onCancel,
    isEditing,
    error,
}: TransactionFormProps) {
    return (
        <Card className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300 mb-6">
            <CardHeader className="pb-2 border-b border-white/30">
                <CardTitle className="text-3xl font-extrabold">
                    {isEditing ? "Edit Transaction" : "Add Transaction"}
                </CardTitle>
                <CardDescription className="text-white/90">
                    Enter transaction details below
                </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
                <Input
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) => onFormChange({ ...form, description: e.target.value })}
                    className="bg-white text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <Input
                    type="number"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={(e) => onFormChange({ ...form, amount: e.target.value })}
                    className="bg-white text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <Input
                    type="date"
                    value={form.date}
                    onChange={(e) => onFormChange({ ...form, date: e.target.value })}
                    className="bg-white text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <select
                    value={form.category}
                    onChange={(e) => onFormChange({ ...form, category: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                {error && <p className="text-red-200 font-medium">{error}</p>}
                <div className="flex space-x-4">
                    <Button
                        onClick={onSubmit}
                        className="bg-white text-green-700 font-bold px-6 py-3 rounded-md shadow hover:bg-green-100 transition-colors"
                    >
                        {isEditing ? "Update Transaction" : "Add Transaction"}
                    </Button>
                    {isEditing && (
                        <Button
                            onClick={onCancel}
                            variant="outline"
                            className="border border-white text-white font-bold px-6 py-3 rounded-md hover:bg-white hover:text-green-700 transition-colors"
                        >
                            Cancel
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
