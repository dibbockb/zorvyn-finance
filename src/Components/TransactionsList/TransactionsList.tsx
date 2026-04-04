import { ArrowDownToLine, Eye, ChevronDown, ListFilter, Terminal, Briefcase, ShoppingBag, Plane, Home, CheckCircle2, Clock } from "lucide-react";
import { useMemo, useState } from "react";
import { useStore, selectTotals } from "../../store/useStore";
import { useShallow } from 'zustand/react/shallow';
import Navbar from "../Dashboard/Navbar/Navbar";

const TransactionsList = () => {
    const { transactions, totalBalance } = useStore(useShallow((state) => ({
        transactions: state.transactions,
        ...selectTotals(state)
    })));

    const [filterType, setFilterType] = useState<'All' | 'Income' | 'Expense'>('All');

    const filteredTransactions = useMemo(() => {
        if (filterType === 'All') return transactions;
        return transactions.filter(tx => tx.type === filterType);
    }, [transactions, filterType]);

    const getCategoryIcon = (category: string) => {
        const props = { size: 18, className: "text-primary" };
        switch (category) {
            case 'Technology': return <Terminal {...props} />;
            case 'Income': return <Briefcase {...props} />;
            case 'Food': return <ShoppingBag {...props} />;
            case 'Transport': return <Plane {...props} />;
            case 'Housing': return <Home {...props} />;
            default: return <Briefcase {...props} />;
        }
    };

    const formattedBalance = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(totalBalance);

    return (
        <section className="h-screen bg-[#faf8ff] rounded shadow-xl px-4 lg:px-10 py-3 pb-20 lg:pb-10 overflow-y-auto">
            <Navbar />

            <div className="mt-4 text-primary bg-primary/10 border border-primary/20 rounded-xl flex items-center gap-2 p-3 px-6 text-xs lg:text-sm">
                <Eye size={16} className="shrink-0" />
                <p className="font-bold flex-1">You are currently in View Only mode. Administrative actions are restricted.</p>
                <button className="hidden lg:block hover:underline font-black">Change Role</button>
            </div>

            <div className="flex items-center pt-8">
                <div>
                    <h1 className="text-2xl text-black font-bold pb-1">Transactions</h1>
                    <p className="text-black/60 font-medium text-sm">Detailed ledger of all institutional movements.</p>
                </div>
                <button className="ml-auto flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-primary font-bold bg-[#E2E8FC] hover:bg-primary/10 transition-all">
                    <ArrowDownToLine size={18} />
                    Export
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 pt-8 ">
                <div className="flex-1  bg-white p-6 rounded-3xl shadow-sm border border-black/5 flex flex-wrap items-center  gap-8">
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase text-black/40 tracking-widest">Date Range</label>
                        <div className="flex items-center gap-2 bg-[#f1f3ff] px-4 py-2.5 rounded-xl cursor-pointer group">
                            <span className="text-sm font-bold text-black/80">Last 30 Days</span>
                            <ChevronDown size={16} className="text-black/40 group-hover:text-primary transition-colors" />
                        </div>
                    </div>

                    <div className="w-px h-12 mt-3 bg-black/20 hidden lg:block" />

                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase text-black/40 tracking-widest">Transaction Type</label>
                        <div className="flex bg-[#f1f3ff] p-1 rounded-xl gap-1">
                            {['All', 'Income', 'Expense'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setFilterType(type as any)}
                                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${filterType === type ? 'bg-primary text-white shadow-md' : 'text-black/50 hover:text-black'
                                        }`}
                                >
                                    {type === 'Income' ? 'Credits' : type === 'Expense' ? 'Debits' : 'All'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="w-px h-12  mt-3 bg-black/20 hidden lg:block" />

                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase text-black/40 tracking-widest">Categories</label>
                        <div className="flex items-center gap-2 bg-[#f1f3ff] px-4 py-2.5 rounded-xl cursor-pointer group">
                            <span className="text-sm font-bold text-black/80">All Sectors</span>
                            <ListFilter size={16} className="text-black/40 group-hover:text-primary transition-colors" />
                        </div>
                    </div>
                </div>

                <div className="lg:w-80 bg-linear-to-br from-[#0047AB] to-[#003177] p-6 rounded-2xl shadow-xl shadow-primary/20 flex flex-col justify-center">
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Total Flow</p>
                    <h2 className="text-white text-3xl font-bold tracking-tight">{formattedBalance}</h2>
                </div>
            </div>

            <div className="mt-8 bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-black/5">
                            <th className="px-8 py-5 text-[10px] font-black uppercase text-black/30 tracking-widest">Date</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase text-black/30 tracking-widest">Description</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase text-black/30 tracking-widest text-right">Amount</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase text-black/30 tracking-widest text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/10">
                        {filteredTransactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-primary/5 transition-all duration-250 ease-in-out group">
                                <td className="px-8 py-6 text-sm font-bold text-black/60">{tx.date}, 2026</td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2.5 bg-primary/10 rounded-xl">
                                            {getCategoryIcon(tx.category)}
                                        </div>
                                        <span className="text-sm font-black text-black/80">{tx.description}</span>
                                    </div>
                                </td>
                                <td className={`px-8 py-6 text-sm font-black text-right ${tx.type === 'Income' ? 'text-tertiary' : 'text-red-600'}`}>
                                    {tx.type === 'Income' ? '+' : '-'}${tx.amount.toLocaleString()}
                                </td>
                                <td className="px-8 py-6 text-center">
                                    <div className="flex justify-center">
                                        {tx.status === 'Completed' ? <CheckCircle2 size={20} className="text-tertiary" /> : <Clock size={20} className="text-black/20" />}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default TransactionsList;