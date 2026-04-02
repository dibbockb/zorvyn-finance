export type Role = 'Admin' | 'User';

export interface Transaction {
    id: string;
    date: string;
    amount: number;
    category: 'Food' | 'Rent' | 'Salary' | 'Tech' | 'Entertainment';
    type: 'Income' | 'Expense';
    description: string;
}