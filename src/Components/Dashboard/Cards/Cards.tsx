import StatCard from "../../Statcard/StatCard";
import { useStore, selectTotals } from "../../../store/useStore";
// FIX: Import shallow from zustand
import { useShallow } from 'zustand/react/shallow';

const Cards = () => {
    const { totalBalance, monthlyIncome, monthlyExpenses } = useStore(
        useShallow((state) => selectTotals(state))
    );
    return (
        <div className="flex flex-col gap-6 pt-10">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Total Balance" amount={totalBalance} type="balance" percentage={75} />
                <StatCard title="Monthly Income" amount={monthlyIncome} type="income" percentage={5} />
                <div className="hidden lg:block">
                    <StatCard title="Monthly Expenses" amount={monthlyExpenses} type="expense" percentage={-2} />
                </div>
            </div>
            {/* ... rest of your UI */}
        </div>
    );
}

export default Cards;