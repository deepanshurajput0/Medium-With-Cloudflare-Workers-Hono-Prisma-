const Navbar = () => {
  return (
    <div className=" flex justify-between border-b-2 p-3">
         <div>
            <h1 className=" text-[18px] font-semibold"> Medium</h1>
         </div>

         <div>
         <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="font-medium text-gray-600 dark:text-gray-300">A</span>
</div>
         </div>
    </div>
  )
}

export default Navbar