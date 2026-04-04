import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Role } from '../../public/data/types/types';
import { SUMMARY_STATS, type Transaction } from '../../public/data/mockdata/data';

interface FinanceState {
    transactions: Transaction[];
    role: Role;
    setRole: (role: Role) => void;
    addTransaction: (tx: Transaction) => void;
}

export const useStore = create<FinanceState>()(
    persist(
        (set) => ({
            transactions: [],
            role: 'User',
            setRole: (role) => set({ role }),
            addTransaction: (tx) =>
                set((state) => ({
                    transactions: [tx, ...state.transactions]
                })),
        }),
        { name: 'finance-storage' }
    )
);

export const selectTotals = (state: FinanceState) => {
    if (state.transactions.length === 0) {
        return {
            totalBalance: SUMMARY_STATS.totalBalance,
            monthlyIncome: SUMMARY_STATS.monthlyIncome,
            monthlyExpenses: SUMMARY_STATS.monthlyExpenses,
        };
    }

    const income = state.transactions
        .filter((t) => t.type === 'Income')
        .reduce((acc, t) => acc + t.amount, 0);

    const expenses = state.transactions
        .filter((t) => t.type === 'Expense')
        .reduce((acc, t) => acc + Math.abs(t.amount), 0);

    return {
        totalBalance: income - expenses,
        monthlyIncome: income,
        monthlyExpenses: expenses,
    };
};