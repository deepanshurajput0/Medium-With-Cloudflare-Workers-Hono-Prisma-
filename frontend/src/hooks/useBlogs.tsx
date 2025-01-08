import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../config"
const useBlogs = () => {
   const [loading, setLoading] = useState(false)
   const [blogs, setBlogs] = useState([])
      async function getBlogs(){
          try {
            setLoading(false)
            const res =  await axios.get(`${BASE_URL}/api/v1/blog/blogs`,{
                headers:{
                    Authorization: localStorage.getItem('token')
                }
               })
               setLoading(false)
               setBlogs(res.data)
          } catch (error) {
             console.log(error)
             setLoading(false)
          }
       }
       useEffect(()=>{
         getBlogs()
       },[])
    return {
        loading, blogs
    }
}

export default useBlogs
