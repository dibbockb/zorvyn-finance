import * as z from "zod";

export type Role = 'Admin' | 'User';

export interface Transaction {
    id: string;
    date: string;
    amount: number;
    category: 'Food' | 'Rent' | 'Salary' | 'Tech' | 'Entertainment';
    type: 'Income' | 'Expense';
    description: string;
}

export const transactionSchema = z.object({
    description: z.string().min(3, "Description is too short"),
    amount: z.coerce.number().positive("Amount must be greater than 0"),
    type: z.enum(["Income", "Expense"]),
    category: z.string().min(1, "Please select a category"),
    date: z.string(),
});