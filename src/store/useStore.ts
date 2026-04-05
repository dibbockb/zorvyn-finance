import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RECENT_TRANSACTIONS, Role, SUMMARY_STATS, type Transaction } from '../lib/mockdata/data';

interface FinanceState {
    transactions: Transaction[];
    role: Role;
    setRole: (role: Role) => void;
    addTransaction: (tx: Transaction) => void;
}

export const useStore = create<FinanceState>()(
    persist(
        (set) => ({
            transactions: RECENT_TRANSACTIONS,
            role: 'User',
            setRole: (role) => set({ role }),
            addTransaction: (newTx) => set((state) => ({
                transactions: [newTx, ...state.transactions],
            })),

        }),
        { name: 'zorvyn-ledger' }
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