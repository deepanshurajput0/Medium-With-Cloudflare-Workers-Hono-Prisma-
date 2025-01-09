import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL } from "../config"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const useCreateBlog = ({title,content}:{title:string,content:string}) => {
   const [loading, setLoading] = useState<boolean>(false)
   const [userId, setUserId] = useState<number>()
   const navigate = useNavigate() 
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

   async function createPost(){
         try {
            setLoading(true)
           const res = await axios.post(`${BASE_URL}/api/v1/blog/create`,{
                title,
                content,
                authorId:userId
            },{
                headers:{
                    Authorization: localStorage.getItem('token')
                }
            }
        )
            setLoading(false)
             toast.success(res.data.message)
             navigate('/')
         } catch (error) {
            console.log(error)
            if(axios.isAxiosError(error) && error.response){
                toast.error(error.response.data.error)
            }
            setLoading(false)
         }
   }
    useEffect(()=>{
      getUserId()  
    },[])
    return {
      loading,
      createPost
    }
}

export default useCreateBlog