const Cards = () => {
    return (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-10">

            <div className="bg-white min-h-50 p-8 rounded-2xl shadow-sm border border-secondary/10  hover:shadow-md transition-all duration-300 ease-in-out">
            </div>

            <div className="bg-white min-h-50 p-8 rounded-2xl shadow-sm border border-secondary/10 hover:shadow-md transition-all duration-300 ease-in-out">
            </div>

            <div className="bg-white min-h-50 p-8 rounded-2xl shadow-sm border border-secondary/10  hover:shadow-md transition-all duration-300 ease-in-out">
            </div>

            <div className="lg:col-span-2 bg-white p-8 rounded-4xl shadow-sm border border-secondary/5 min-h-100 hover:shadow-md transition-all duration-300 ease-in-out">
            </div>

            <div className="bg-white p-8 rounded-4xl shadow-sm border border-secondary/5 min-h-100 hover:shadow-md transition-all duration-300 ease-in-out">
            </div>

            <div className="lg:col-span-3 min-h-50 bg-white p-8 rounded-2xl shadow-sm border border-secondary/10  hover:shadow-md transition-all duration-300 ease-in-out">
            </div>

        </section>
    )
}

export default Cards