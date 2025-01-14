import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import { CiCirclePlus } from "react-icons/ci";
const Navbar = () => {
  const navigate = useNavigate()
  function Logout(){
     localStorage.removeItem('token')
     toast.success('Logged Out Successfully')
     navigate('/signin')
  }
  return (
    <div className=" h-16 flex justify-between border-b-2 p-3">
         <div>
            <h1 className=" text-[18px] font-semibold"> 
              <Link to={'/'} >Medium</Link>
            </h1>
         </div>

      

         <div className=" flex items-center space-x-6">
         <div>
          <Link to={'/create'} >
          <CiCirclePlus size={30}/>
          </Link>
         </div>
         <details className="dropdown">
                <summary className="btn bg-white border-none m-1">
                <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="font-medium text-gray-600 dark:text-gray-300">A</span>
</div>
                </summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                  <li className=" cursor-pointer p-2" onClick={Logout} >Logout</li>
                </ul>
              </details>  
         </div>
    </div>
  )
}

export default Navbar