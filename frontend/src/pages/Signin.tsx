import Auth from "../components/Auth"
import Quote from "../components/Quote"

const Signin = () => {
  return (
    <div className=" flex">
    <Auth/>
   <div className=" invisible w-0 lg:visible lg:w-full">
   <Quote/>
   </div>
 </div>
  )
}

export default Signin