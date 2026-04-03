import { BellDot, Search } from "lucide-react"
import { ToggleRole } from "../ToggleRole/toggleRole"

const Dashboard = () => {
    return (
        <section className="h-screen bg-[#faf8ff] rounded shadow-xl p-5">

            <div className="flex justify-between">
                {/* searchbar */}
                <div className="relative max-w-65 flex justify-center items-center">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2  ">
                        <Search size={20} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search ..."
                        className="w-full bg-[#f1f3ff] rounded-2xl pl-10 pr-4 py-3 text-sm text-[#434654] outline-none focus:ring-2 focus:ring-blue-400 transition-all placeholder:text-[#434654]"
                    />
                </div>

                <div className="flex items-center gap-5">
                    <ToggleRole></ToggleRole>
                    <BellDot size={21} className="text-[#434654] rounded-full"></BellDot>
                    <div className="hidden lg:flex justify-center items-center gap-3 border-l border-black/30">
                        <div className="flex-col text-right">
                            <p className=" font-medium text-base text-black/90">John Doe</p>
                            <p className=" pl-4 text-sm text-black/70">Chief Financial Officer</p>
                        </div>
                        <img src="https://pbs.twimg.com/profile_images/1862717563311968256/xfgt1L9l_400x400.jpg" alt="user-image"
                            className="size-12 rounded-full" />
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Dashboard