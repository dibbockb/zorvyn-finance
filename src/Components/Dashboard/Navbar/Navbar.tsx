import { ArrowDownToLine, BellDot, Plus, Search } from 'lucide-react'
import { ToggleRole } from '../../ToggleRole/ToggleRole'

const Navbar = () => {
    return (
        <nav >
            <div className="flex justify-between">
                {/* searchbar */}
                <div className="relative max-w-65 flex justify-center items-center">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2  ">
                        <Search size={20} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search ..."
                        className="text-xs md:text-sm w-full bg-[#f1f3ff] rounded-2xl pl-10 pr-4 py-3 text-[#434654] outline-none focus:ring-2 focus:ring-blue-400 transition-all placeholder:text-[#434654]"
                    />
                </div>

                <div className="flex items-center gap-5">
                    <ToggleRole></ToggleRole>
                    <BellDot size={21} className="text-[#434654] rounded-full"></BellDot>
                    <div className="hidden lg:flex justify-center items-center gap-3 border-l border-black/30 scale-85">
                        <div className="flex-col text-right">
                            <p className=" font-medium text-base text-black/90">John Doe</p>
                            <p className=" pl-4 text-sm text-black/70">Chief Financial Officer</p>
                        </div>
                        <img src="https://pbs.twimg.com/profile_images/1862717563311968256/xfgt1L9l_400x400.jpg" alt="user-image"
                            className="size-12 rounded-full" />
                    </div>
                </div>
            </div>

            <div className="hidden lg:flex justify-between items-center pt-5">
                <div>
                    <h1 className="hidden lg:block text-2xl text-black font-bold pb-1">Financial Overview</h1>
                    <h3 className="hidden lg:block text-black/70 font-medium">Aggregated data for fiscal year 2026</h3>
                </div>

                <div className="gap-2 hidden lg:flex">
                    <button className="flex justify-center items-center gap-1 px-3 py-3 rounded-xl text-sm text-primary font-bold bg-[#E2E8FC] hover:bg-[#E2E8FC]/75 transition-all duration-100 ease-in-out"><ArrowDownToLine size={18}></ArrowDownToLine>
                        <p className="">Export Report</p>
                    </button>

                    <button className="flex justify-center items-center gap-1 px-3 py-3 rounded-xl text-sm text-white font-bold bg-primary hover:bg-primary/75 transition-all duration-100 ease-in-out"><Plus size={18}></Plus>
                        <p className="">Add Transaction</p>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar