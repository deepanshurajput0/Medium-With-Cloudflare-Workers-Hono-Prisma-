import axios from "axios"
import { BASE_URL } from "../config"
import { useEffect, useState } from "react"

const useGetUserId = () => {
    const [userId, setUserId] = useState<number>()
    async function getUserId (){
        try {
         const res = await axios.get(`${BASE_URL}/api/v1/blog/me`,{
             headers:{
                 Authorization: localStorage.getItem('token')
             }
         })
           setUserId(res.data)
          
        } catch (error) {
         console.log(error)
        }
  }
  useEffect(()=>{
     getUserId()
  },[])
    return{
      userId
    }
}

export default useGetUserId



