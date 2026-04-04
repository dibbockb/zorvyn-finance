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

    const [dateRange, setDateRange] = useState('30');
    const [filterType, setFilterType] = useState<'All' | 'Income' | 'Expense'>('All');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const filteredTransactions = useMemo(() => {
        return transactions.filter(tx => {
            const matchesType = filterType === 'All' || tx.type === filterType;
            const matchesCategory = selectedCategory === 'All' || tx.category === selectedCategory;

            const txDate = new Date(`${tx.date}, 2026`);
            const now = new Date();
            const daysAgo = new Date();
            daysAgo.setDate(now.getDate() - parseInt(dateRange));

            const matchesDate = txDate >= daysAgo;

            return matchesType && matchesCategory && matchesDate;
        });
    }, [transactions, filterType, selectedCategory, dateRange]);

    const filteredTotal = useMemo(() => {
        return filteredTransactions.reduce((acc, tx) => {
            return tx.type === 'Income' ? acc + tx.amount : acc - tx.amount;
        }, 0);
    }, [filteredTransactions]);

    const formattedFilteredTotal = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(filteredTotal);


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
                {/* ///filters */}
                <div className="flex-1  bg-white p-6 rounded-3xl shadow-sm border border-black/5 flex flex-wrap items-center  gap-8">
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase text-black/40 tracking-widest">Date Range</label>
                        <div className="relative group">
                            <select
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                className="appearance-none bg-[#f1f3ff] px-4 py-2.5 pr-10 rounded-xl text-sm font-bold text-black/80 outline-none cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all duration-300"
                            >
                                <option className="font-bold" value="7">Last 7 Days</option>
                                <option className="font-bold" value="30">Last 30 Days</option>
                                <option className="font-bold" value="90">Last 3 Months</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 pointer-events-none" />
                        </div>
                    </div>
                    <div className="w-px h-12 mt-3 bg-black/20 hidden lg:block" />

                    <div className="flex flex-col gap-2 ">
                        <label className="text-[10px] font-black uppercase text-black/40 tracking-widest">Transaction Type</label>
                        <div className="flex bg-[#f1f3ff] p-1 rounded-xl gap-1">
                            {['All', 'Income', 'Expense'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setFilterType(type as any)}
                                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${filterType === type ? 'bg-primary text-white shadow-md' : 'text-black/50 hover:text-white hover:bg-primary transition-all duration-300 ease-in-out'}`}
                                >
                                    {type === 'Income' ? 'Credit' : type === 'Expense' ? 'Debit' : 'All'}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="w-px h-12  mt-3 bg-black/20 hidden lg:block" />

                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase text-black/40 tracking-widest">Categories</label>
                        <div className="relative group">
                            <select
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="appearance-none bg-[#f1f3ff] px-4 py-2.5 pr-10 rounded-xl text-sm font-bold text-black/80 outline-none cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all duration-300 ease-in-out"
                            >
                                <option className="font-bold" value="All">All Sectors</option>
                                <option className="font-bold" value="Technology">Technology</option>
                                <option className="font-bold" value="Income">Income</option>
                                <option className="font-bold" value="Food">Food</option>
                                <option className="font-bold" value="Transport">Transport</option>
                                <option className="font-bold" value="Housing">Housing</option>
                            </select>
                            <ListFilter size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="lg:w-80 bg-linear-to-br from-[#0047AB] to-[#003177] p-6 rounded-2xl shadow-xl shadow-primary/20 flex flex-col justify-center">
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Total Flow</p>
                    <h2 className="text-white text-3xl font-bold tracking-tight">{formattedFilteredTotal}</h2>
                </div>
            </div>


            {/* ///table */}
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
                        {filteredTransactions.length > 0 ? (
                            filteredTransactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-primary/5 transition-all duration-250 ease-in-out group">
                                    <td className="px-8 py-6 text-sm font-bold text-black/60">{tx.date}, 2026</td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2.5 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform duration-200">
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
                                            {tx.status === 'Completed' ? (
                                                <CheckCircle2 size={20} className="text-tertiary" />
                                            ) : (
                                                <Clock size={20} className="text-black/20" />
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-8 py-24 text-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="p-4 bg-[#f1f3ff] rounded-full text-black/20">
                                            <ListFilter size={32} />
                                        </div>
                                        <div>
                                            <p className="text-black/80 font-black text-base">No transactions found</p>
                                            <p className="text-black/40 text-xs font-bold">Try adjusting your filters or date range.</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default TransactionsList;