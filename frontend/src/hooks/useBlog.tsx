import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../config"
const useBlog = ({id}:{id:string | undefined}) => {
     interface BlogsType{
        id:number,
        createdAt:string,
        title:string,
        content:string,
        authorId:number,
        published:boolean,
        author:{
         name:string
        }
    }
   const [loading, setLoading] = useState(false)
   const [blog, setBlog] = useState<BlogsType>()

      async function getBlogs(){
          try {
            setLoading(true)
            const res =  await axios.get(`${BASE_URL}/api/v1/blog/get/${id}`,{
                headers:{
                    Authorization: localStorage.getItem('token')
                }
               })
               setLoading(false)
               setBlog(res.data)
          } catch (error) {
             console.log(error)
             setLoading(false)
          }
       }
       useEffect(()=>{
         getBlogs()
       },[id])
    return {
        loading, blog
    }
}

export default useBlog
