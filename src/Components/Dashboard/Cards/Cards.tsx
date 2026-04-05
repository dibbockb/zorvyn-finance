import StatCard from "../../Statcard/StatCard";
import { useStore, selectTotals } from "../../../store/useStore";
// FIX: Import shallow from zustand
import { useShallow } from 'zustand/react/shallow';
import { ArrowDownToLine, Plus, } from 'lucide-react'
import MobileAddButton from "../../MobileAddButton/MobileAddButton";

const Cards = () => {
    const { role } = useStore(useShallow((state) => ({ role: state.role })));
    const { totalBalance, monthlyIncome, monthlyExpenses } = useStore(
        useShallow((state) => selectTotals(state))
    );

    return (
        <div className="flex flex-col gap-6 pt-2">
            <MobileAddButton onClick={() => { console.log(`clicked add`) }}></MobileAddButton>
            <div className="hidden lg:flex justify-between items-center pt-5">
                <div className="pl-1">
                    <h1 className="hidden lg:block text-2xl text-black font-bold pb-1 ">Financial Overview</h1>
                    <h3 className="hidden lg:block text-black/70 font-medium">Aggregated data for fiscal year 2026</h3>
                </div>

                <div className="gap-2 hidden lg:flex">
                    <button
                        disabled={role === 'User'}
                        className={`ml-auto flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${role === 'User'
                            ? 'bg-black/5 text-black/30 cursor-not-allowed'
                            : 'text-primary bg-[#E2E8FC] hover:bg-[#E2E8FC]/80'
                            }`}
                    >
                        <ArrowDownToLine size={18}></ArrowDownToLine>
                        <p className="">Export Report</p>
                    </button>
                    {/* <button disabled={role === 'User'} className="flex justify-center items-center gap-1 px-3 py-3 rounded-xl text-sm text-white font-bold bg-primary hover:bg-primary/75 transition-all duration-100 ease-in-out"> */}

                    <button
                        className={`ml-auto flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${role === 'User'
                            ? 'bg-black/5 text-black/30 cursor-not-allowed transition-all duration-200 ease-in-out'
                            : 'bg-primary hover:bg-primary/75 transition-all text-white duration-200 ease-in-out'
                            }`}>
                        <Plus size={18}></Plus>
                        <p className="">Add Transaction</p>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Total Balance" amount={totalBalance} type="balance" percentage={75} />
                <StatCard title="Monthly Income" amount={monthlyIncome} type="income" percentage={5} />
                <div className="hidden lg:block">
                    <StatCard title="Monthly Expenses" amount={monthlyExpenses} type="expense" percentage={-2} />
                </div>
            </div>
            {/* ... rest of your UI */}
        </div >
    );
}

export default Cards;