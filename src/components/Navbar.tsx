
const Navbar = () => {
    return (
        <div className="navbar min-h-[70px] shadow-md sticky top-2 flex mx-2 p-3 px-10 rounded-full z-10 overflow-hidden">
            <div className="absolute inset-0 bg-[#efede6]  bg-opacity-10 backdrop-filter backdrop-blur-sm "></div>
            <div className="flex justify-between w-full text-l z-20 items-center  rounded-sm ">
                <div className="flex justify-between w-[20%]">
                    <div className=" pr-4">
                        <a className="pr-4" href={'/'}>Logo</a>
                        <a href={'/data'}>Dashboard</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar