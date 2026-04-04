import BalanceChart from "../Charts/BalanceChart"
import RecentTransactions from "../Charts/RecentTransactions"
import SpendingBreakdown from "../Charts/SpendingBreakdown"
import Cards from "./Cards/Cards"
import Navbar from "./Navbar/Navbar"

const Dashboard = () => {
    return (
        <section className="min-h-screen bg-[#faf8ff] rounded shadow-xl px-4 lg:px-10 py-3 pb-20 lg:pb-10">
            <Navbar />
            <Cards />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                <div className="lg:col-span-2">
                    <BalanceChart />
                </div>
                <div className="lg:col-span-1">
                    <SpendingBreakdown />
                </div>
                <div className="lg:col-span-3">
                    <RecentTransactions></RecentTransactions>
                </div>
            </div>
        </section>
    )
}

export default Dashboard