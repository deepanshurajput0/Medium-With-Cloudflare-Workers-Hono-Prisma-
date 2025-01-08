import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../config"
const useBlogs = () => {
    interface BlogsType{
        id:number,
        createdAt:string,
        title:string,
        content:string,
        published:boolean,
        author:{
         name:string
        }
    }
   const [loading, setLoading] = useState(false)
   const [blogs, setBlogs] = useState<BlogsType[]>([])

      async function getBlogs(){
          try {
            setLoading(true)
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
