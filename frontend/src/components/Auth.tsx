import { ChangeEvent, useState } from "react";
import { SinginInput } from "medium-commontypes";
import { PiEyeClosed, PiEye} from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
const Auth = () => {
  const [userData, setUserData] = useState<SinginInput>({
    name: "",
    email: "",
    password: "",
  });
  const location = useLocation()
 
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <div className=" text-center">
        <h1 className=" text-3xl font-bold"> 
        {location.pathname === '/signup' ? "Create an account" : "Login Now" }
        </h1>
        <p className=" mt-1 text-slate-600 text-[16px]">
          {
            location.pathname === '/signup' ? "Already have an account ?" : "Don't have an account" 
          } {
            location.pathname === '/signup' ? <Link className=" decoration" to={'/signin'} >Login</Link> : <Link className=" decoration" to={'/signup'} >Signup</Link>
          }
        </p>
      </div>

      <div>
        <form action="">
           {
            location.pathname === '/signup' ? 
            <SignUpInput
            placeholder={"Enter Your name"}
            label={"Username"}
            type={"text"}
            onChange={(e)=>{
                setUserData({
                    ...userData,
                    name:e.target.value
                })
            }}
          /> : ''
           }
          <SignUpInput
            placeholder={"Enter Your email"}
            label={"Email"}
            type={"email"}
            onChange={(e)=>{
                setUserData({
                    ...userData,
                    email:e.target.value
                })
            }}
          />
          <SignUpInput
            placeholder={"Enter Your password"}
            label={"Password"}
            type={"password"}
            onChange={(e)=>{
                setUserData({
                    ...userData,
                    password:e.target.value
                })
            }}
          />
          <button type="button" className="text-white w-full mt-7 bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5  dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2">

    {
        location.pathname === '/signup' ? 'Sign Up' : 'Login '
    }
</button>
        </form>
      </div>
    </div>
  );
};

interface InputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string 
}

const SignUpInput = ({ label, placeholder, onChange, type }: InputType) => {
   const [show,setShow] = useState<boolean>(false)
   const inputType = type === 'password' && show ? 'text' : type
  return (
    <div className="w-[21rem] mt-5">
      <label className="block mb-2 text-sm font-semibold">{label}</label>
      <input
        type={inputType}
        onChange={onChange}
        id="first_name"
        className="bg-gray-50 border border-black-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        placeholder={placeholder}
        required
        
      />
 {
        type === 'password' && (
            <div onClick={()=>setShow(!show)} >
                 {
                    show ? <PiEye/> : <PiEyeClosed/>
                 }
            </div>
        )
      }
     
   
    </div>
  );
};

export default Auth;
