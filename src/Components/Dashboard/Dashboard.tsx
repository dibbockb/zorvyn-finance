import BalanceChart from "../Charts/BalanceChart"
import Cards from "./Cards/Cards"
import Navbar from "./Navbar/Navbar"

const Dashboard = () => {
    return (
        <section className="min-h-screen bg-[#faf8ff] rounded shadow-xl px-4 lg:px-10 py-3">
            <Navbar></Navbar>
            <Cards></Cards>
            <br />
            <BalanceChart></BalanceChart>
        </section>

    )
}

export default Dashboard