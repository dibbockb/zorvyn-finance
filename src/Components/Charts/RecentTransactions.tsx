import { Link } from "react-router-dom";
import { useStore } from "../../store/useStore";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, Variants } from "framer-motion";

const RecentTransactions = () => {
    const { transactions } = useStore();

    if (transactions.length === 0) {
        return (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-secondary/5 flex flex-col items-center justify-center text-center">
                <p className="text-black/40 font-bold text-xl">No recent activity</p>
                <p className=" text-black/30 text-base">Your financial logs will appear here.</p>
            </div>
        );
    }

    const container = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item: Variants = {
        hidden: { opacity: 0, y: 0 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm h-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-black font-bold text-xl">Recent Transactions</h3>
                <Link to={"/transactions"} className="text-primary text-sm font-bold px-2 py-1 rounded text-sm text-primary font-bold hover:bg-[#E2E8FC] transition-all duration-100 ease-in-out">View All</Link>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-col gap-4">
                {transactions.slice(0, 5).map((tx) => (
                    <motion.div
                        key={tx.id}
                        variants={item}
                        className="flex items-center justify-between p-3 hover:bg-background rounded-xl transition-all">
                        <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg ${tx.type === 'Income' ? 'bg-tertiary/10 text-tertiary' : 'bg-red-50 text-red-500'}`}>
                                {tx.type === 'Income' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-black">{tx.description}</p>
                                <p className="text-xs text-black/40 font-medium">{tx.date} • {tx.category}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className={`font-bold ${tx.type === 'Income' ? 'text-tertiary' : 'text-red-500'}`}>
                                {tx.type === 'Income' ? '+' : '-'}${Math.abs(tx.amount).toLocaleString()}
                            </p>

                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default RecentTransactions;