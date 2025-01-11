import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { BASE_URL } from "../config"
import useGetUserId from "./useGetUserId"
const useComments = ({id,comment}:{id:string,comment:string}) => {
    const [loading , setLoading] = useState<boolean>(false)
    const { userId } = useGetUserId()
   async function makeComment (){
    setLoading(true)
        try {
            const res = await axios.post(`${BASE_URL}/api/v1/blog/comment/${id}`,{
             comment,
             userId
            },{
                headers:{
                    Authorization: localStorage.getItem('token')
                }
            })
            setLoading(false)
             toast.success(res.data.message)

        } catch (error) {
            setLoading(false)
            if(axios.isAxiosError(error) && error.response){
                toast.error(error.response.data.error)
            }
            console.log(error)
        }
    }

    return {
      loading , makeComment
    }
}

export default useComments