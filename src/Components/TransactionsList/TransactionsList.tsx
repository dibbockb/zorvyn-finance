import { ArrowDownToLine, Eye, ChevronDown, ListFilter, Terminal, Briefcase, ShoppingBag, Plane, Home, CheckCircle2, Clock } from "lucide-react";
import { useMemo, useState } from "react";
import { useStore, selectTotals } from "../../store/useStore";
import { useShallow } from 'zustand/react/shallow';
import Navbar from "../Dashboard/Navbar/Navbar";
import MobileAddButton from "../MobileAddButton/MobileAddButton";
import { exportToCSV } from "../../lib/utils/exportUtils";
import { AddTransactionModal } from "../AddTransactionModal/AddTransactionModal";

const TransactionsList = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { transactions, role, setRole } = useStore(useShallow((state) => ({
        transactions: state.transactions,
        role: state.role,
        setRole: state.setRole,
        ...selectTotals(state)
    })));

    const toggleRole = () => {
        setRole(role === 'Admin' ? 'User' : 'Admin')
    }

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

    return (
        <section className="h-screen bg-[#faf8ff] rounded shadow-xl px-4 lg:px-10 py-3 pb-20 lg:pb-10 overflow-y-auto">
            <Navbar />
            <AddTransactionModal open={isOpen} onOpenChange={setIsOpen} />
            <MobileAddButton onClick={() => setIsOpen(true)}></MobileAddButton>

            <div className={`mt-4 text-center lg:text-left flex items-center gap-2 p-3 px-6 text-xs lg:text-sm rounded-xl border transition-all duration-300 ${role === 'Admin'
                ? 'text-tertiary bg-tertiary/10 border-tertiary/20'
                : 'text-primary bg-primary/10 border-primary/20'
                }`}>
                <Eye size={16} className="shrink-0 hidden lg:block" />
                <p className="font-bold flex-1 max-w-60 lg:max-w-fit mx-auto lg:mx-0">
                    {role === 'Admin'
                        ? "Full Access: Administrative actions and exports are enabled."
                        : "You are currently in View Only mode. Administrative actions are restricted."}
                </p>
                <button
                    onClick={toggleRole}
                    className="hidden lg:block hover:underline font-black tracking-tighter ml-auto"
                >
                    Switch to {role === 'Admin' ? 'User' : 'Admin'}
                </button>
            </div>

            <div className="flex items-center pt-8">
                <div className="pl-2">
                    <h1 className="text-2xl text-black font-bold pb-1">Transactions</h1>
                    <p className="text-black/60 font-medium text-sm max-w-75 lg:max-w-125">Detailed ledger of all institutional movements.</p>
                </div>
                <button
                    disabled={role === 'User'}
                    className={`ml-auto flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${role === 'User'
                        ? 'bg-black/5 text-black/30 cursor-not-allowed'
                        : 'text-primary bg-[#E2E8FC] hover:bg-[#E2E8FC]/80'
                        }`}
                    onClick={() => { exportToCSV(filteredTransactions) }}
                >
                    <ArrowDownToLine size={18} />
                    <span className="hidden lg:block">Export</span>
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 pt-8 ">
                {/* ///filters */}
                <div className="flex-1  bg-white p-6 rounded-3xl shadow-md flex flex-wrap justify-center lg:justify-start items-center  gap-8">
                    <div className="flex flex-col gap-2 ">
                        <label className="text-[10px] font-black uppercase text-black/40 tracking-widest text-center lg:text-start lg:pl-1">Date Range</label>
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
                        <label className="text-[10px] font-black uppercase text-black/40 tracking-widest text-center lg:text-start lg:pl-1">Transaction Type</label>
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
                        <label className="text-[10px] font-black uppercase text-black/40 tracking-widest text-center lg:text-start lg:pl-1">Categories</label>
                        <div className="relative group">
                            <select
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="appearance-none bg-[#f1f3ff] px-4 py-2.5 pr-10 rounded-xl text-sm font-bold text-black/80 outline-none cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all duration-300 ease-in-out"
                            >
                                <option className="font-bold" value="All">All Sectors</option>
                                <option className="font-bold" value="Technology">Technology</option>
                                <option className="font-bold" value="Food">Food</option>
                                <option className="font-bold" value="Income">Income</option>
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
            <div className="mt-8 ">
                {/* Desktop View: Traditional Table */}
                <div className="hidden md:block bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-black/10">
                                <th className="px-8 py-5 text-[10px] font-black uppercase text-black/30 tracking-widest">Date</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase text-black/30 tracking-widest">Description</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase text-black/30 tracking-widest text-right">Amount</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase text-black/30 tracking-widest text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/10">
                            {filteredTransactions.length > 0 ? (
                                filteredTransactions.map((tx) => (
                                    <tr key={tx.id} className="hover:bg-primary/5 transition-all duration-250 group">
                                        <td className="px-8 py-6 text-sm font-bold text-black/60">{tx.date}, 2026</td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2.5 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform">
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
                                ))
                            ) : <tr>
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
                            </tr>}
                        </tbody>
                    </table>
                </div>

                {/* Mobile View: Vertical Cards */}
                <div className="md:hidden flex flex-col gap-4">
                    {filteredTransactions.length > 0 ? (
                        filteredTransactions.map((tx) => (
                            <div key={tx.id} className="bg-white p-5 rounded-2xl border border-black/5 shadow-sm flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-primary/10 rounded-xl">
                                        {getCategoryIcon(tx.category)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-black/80">{tx.description}</p>
                                        <p className="text-[10px] font-bold text-black/40 uppercase tracking-tight">{tx.date}, 2026</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`text-sm font-black ${tx.type === 'Income' ? 'text-tertiary' : 'text-red-600'}`}>
                                        {tx.type === 'Income' ? '+' : '-'}${tx.amount.toLocaleString()}
                                    </p>
                                    <div className="hidden lg:flex justify-end mt-1">
                                        {tx.status === 'Completed' ? <CheckCircle2 size={14} className="text-tertiary" /> : <Clock size={14} className="text-black/20" />}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white py-10 rounded-2xl border border-dashed border-black/10 text-center">
                            <p className="text-black/40 text-sm font-bold">Nothing found.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TransactionsList;