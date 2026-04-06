import { useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { useStore } from '@/store/useStore';
import { SUMMARY_STATS, MONTHLY_COMPARISON, INSIGHTS } from '@/lib/mockdata/data';
import { TrendingUp, TrendingDown, Zap, ArrowDownToLine } from 'lucide-react';
import { exportToCSV } from '@/lib/utils/exportUtils';
import { useShallow } from 'zustand/react/shallow';
import Navbar from '../Dashboard/Navbar/Navbar';
import MobileAddButton from '../MobileAddButton/MobileAddButton';
import { AddTransactionModal } from '../AddTransactionModal/AddTransactionModal';
import { motion } from "framer-motion";

const Insights = () => {
    const { transactions, role } = useStore(useShallow((state) => ({
        transactions: state.transactions,
        role: state.role,
    })));

    const stats = useMemo(() => {
        const expenses = transactions.filter(t => t.type === 'Expense');
        const income = transactions.filter(t => t.type === 'Income');

        const totalIncome = income.reduce((s, t) => s + t.amount, 0);
        const totalExpenses = expenses.reduce((s, t) => s + t.amount, 0);
        const netBalance = totalIncome - totalExpenses;

        const byCategory: { [k: string]: number } = {};
        expenses.forEach(t => {
            byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
        });

        const sortedCategories = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);
        const topCategory = sortedCategories[0];
        const topCategoryPct = topCategory
            ? Math.round((topCategory[1] / totalExpenses) * 100)
            : 0;

        const savingsRate = totalIncome > 0
            ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100)
            : 0;

        const fixedExpenses = expenses
            .filter(t => ['Housing', 'Technology'].includes(t.category))
            .reduce((s, t) => s + t.amount, 0);

        const debtToIncome = totalIncome > 0
            ? ((totalExpenses / totalIncome) * 100).toFixed(1)
            : '0.0';

        return {
            totalIncome,
            totalExpenses,
            netBalance,
            topCategory: topCategory?.[0] ?? '—',
            topCategoryPct,
            savingsRate,
            fixedExpenses,
            debtToIncome,
            sortedCategories,
        };
    }, [transactions]);

    const categoryColors: { [k: string]: string } = {
        Housing: '#4B5CF6',
        Food: '#006B3C',
        Transport: '#C41E3A',
        Entertainment: '#666666',
        Technology: '#8B5CF6',
        Income: '#059669',
    };

    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.section
            initial={{ opacity: 0, filter: "blur(15px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="min-h-screen bg-[#faf8ff] rounded shadow-xl px-4 lg:px-10 py-3 pb-20 lg:pb-10">
            <AddTransactionModal open={isOpen} onOpenChange={setIsOpen} />
            <MobileAddButton onClick={() => setIsOpen(true)}></MobileAddButton>

            <Navbar></Navbar>
            {/* Header */}
            <br />
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="hidden lg:block text-2xl text-black font-bold pb-1 ">Insights at a Glance</h1>
                    <p className="text-black/50 font-medium text-sm mt-0.5">Structural analysis of your current financial vector.</p>
                </div>
                <button
                    disabled={role === 'User'}
                    onClick={() => exportToCSV(transactions)}
                    className={`hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${role === 'User'
                        ? 'bg-black/5 text-black/30 cursor-not-allowed'
                        : 'text-primary bg-[#E2E8FC] hover:bg-[#E2E8FC]/80'
                        }`}
                >
                    <ArrowDownToLine size={16} />
                    Export Report
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">

                <div className="bg-white shadow-xl rounded-2xl p-6 relative overflow-hidden">
                    <p className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-2">Highest Spending</p>
                    <h2 className="text-2xl font-black text-black">{stats.topCategory}</h2>
                    <p className="text-primary font-black text-3xl mt-2">{stats.topCategoryPct}% <span className="text-sm text-black/40 font-bold">of total</span></p>
                    <div className="mt-4 h-1.5 w-full bg-[#f1f3ff] rounded-full">
                        <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${stats.topCategoryPct}%` }} />
                    </div>
                    <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-primary/5" />
                </div>

                <div className="bg-primary rounded-2xl p-6 shadow-2xl text-white relative overflow-hidden">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">Monthly Savings Rate</p>
                    <p className="text-sm font-bold text-white/70 mb-1">Momentum</p>
                    <div className="flex items-end gap-3">
                        <h2 className="text-lg text-shadow-md lg:text-3xl font-medium text-white manrope mt-1 ">{stats.savingsRate}%</h2>
                        <span className={`text-xs font-black mb-1.5 flex items-center gap-0.5 ${stats.savingsRate > 10 ? 'text-green-300' : 'text-red-300'}`}>
                            {stats.savingsRate > 10 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                            {stats.savingsRate > 10 ? 'Increase' : 'Decrease'}
                        </span>
                    </div>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider mt-1">vs last month</p>
                    <div className="flex gap-1.5 mt-4">
                        {[40, 55, 45, 65, 58, stats.savingsRate].map((h, i) => (
                            <div key={i} className="flex-1 bg-white/10 rounded-sm overflow-hidden" style={{ height: 28 }}>
                                <div className="bg-white/40 rounded-sm w-full transition-all" style={{ height: `${(h / 100) * 28}px`, marginTop: `${28 - (h / 100) * 28}px` }} />
                            </div>
                        ))}
                    </div>
                    <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-white/5" />
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
                    <p className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-2">Projected Balance</p>
                    <p className="text-sm font-bold text-black/40 mb-1">Month End</p>
                    <h2 className="text-4xl font-black text-black">
                        <span className="text-lg text-shadow-md lg:text-3xl font-bold manrope mt-1 ">$ </span>
                        {SUMMARY_STATS.projectedBalance.toLocaleString()}
                    </h2>
                    <p className="text-primary text-xs font-bold mt-2 flex items-center gap-1">
                        <Zap size={12} />Forecast Confidence: 94%
                    </p>
                    <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-tertiary/5" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">

                <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-xl">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-black font-black text-base">Monthly Comparison</h3>
                            <p className="text-black/40 text-xs font-bold mt-0.5">Income vs. Expenses (Last 6 Months)</p>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-wider">
                            <span className="flex items-center gap-1.5 text-black/40"><span className="w-2 h-2 rounded-full bg-primary inline-block" />Income</span>
                            <span className="flex items-center gap-1.5 text-black/40"><span className="w-2 h-2 rounded-full bg-red-400 inline-block" />Expenses</span>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={MONTHLY_COMPARISON} barGap={4} barCategoryGap="30%">
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 700 }} />
                            <YAxis hide />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: 12 }}
                            />
                            <Bar dataKey="income" fill="oklch(0.4802 0.2012 260.48)" radius={[6, 6, 0, 0]} />
                            <Bar dataKey="expenses" fill="#fca5a5" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-xl flex flex-col">
                    <h3 className="text-black font-black text-base mb-4 flex items-center gap-2">
                        <Zap size={16} className="text-primary" /> Observations
                    </h3>
                    <div className="flex flex-col gap-3 flex-1">
                        {INSIGHTS.map((insight) => (
                            <div key={insight.id} className={`flex gap-3 p-3 rounded-xl border-l-4 ${insight.type === 'warning'
                                ? 'bg-red-50 border-red-400'
                                : insight.type === 'info'
                                    ? 'bg-[#E2E8FC] border-primary'
                                    : 'bg-tertiary/10 border-tertiary'
                                }`}>
                                <div className={`mt-0.5 p-1.5 rounded-lg shrink-0 ${insight.type === 'warning' ? 'bg-red-100 text-red-500' : 'bg-primary/10 text-primary'}`}>
                                    {insight.type === 'warning' ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
                                </div>
                                <div>
                                    <p className="text-xs font-black text-black/80">{insight.title}</p>
                                    <p className="text-[11px] text-black/50 font-medium mt-0.5 leading-relaxed">{insight.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="mt-4 w-full py-2.5 rounded-xl border border-black/10 text-xs font-black text-black/50 hover:bg-[#f1f3ff] hover:text-primary transition-all">
                        VIEW ALL INTELLIGENCE
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    {
                        label: 'Net Worth Delta',
                        value: `+$${(stats.netBalance).toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
                        badge: '+1.2%',
                        badgeColor: 'bg-tertiary/20 text-tertiary',
                        valueColor: 'text-tertiary',
                    },
                    {
                        label: 'Fixed Expenses',
                        value: `$${stats.fixedExpenses.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
                        badge: 'Stable',
                        badgeColor: 'bg-blue-50 text-blue-500',
                        valueColor: 'text-black',
                    },
                    {
                        label: 'Liquid Reserves',
                        value: `$${(stats.totalIncome * 0.2).toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
                        badge: 'Optimal',
                        badgeColor: 'bg-tertiary/20 text-tertiary',
                        valueColor: 'text-black',
                    },
                    {
                        label: 'Debt-to-Income',
                        value: `${stats.debtToIncome}%`,
                        badge: null,
                        badgeColor: '',
                        valueColor: 'text-black',
                    },
                ].map((item) => (
                    <div key={item.label} className="bg-white rounded-2xl px-5 py-4 shadow-xl flex flex-col gap-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-black/50">{item.label}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xl font-bold ${item.valueColor}`}>{item.value}</span>
                            {item.badge && (
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${item.badgeColor}`}>{item.badge}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

        </motion.section>
    );
};

export default Insights;