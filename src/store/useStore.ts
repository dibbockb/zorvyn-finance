import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Transaction, Role } from '../../public/data/types/types';
import { TRANSACTIONS } from '../../public/data/mockdata/data';

interface FinancialState {
    transactions: Transaction[];
    role: Role;
    setRole: (role: Role) => void;
    addTransaction: (tx: Transaction) => void;
    deleteTransaction: (id: string) => void;
}

export const useStore = create<FinancialState>()(
    persist(
        (set) => ({
            transactions: TRANSACTIONS as Transaction[],
            role: 'User',
            setRole: (role) => set({ role }),
            addTransaction: (tx) => set((state) => ({ transactions: [tx, ...state.transactions] })),
            deleteTransaction: (id) => set((state) => ({ transactions: state.transactions.filter((t) => t.id !== id) })),
        }),
        { name: 'zorvyn-finance-store' },
    )
)