import axios from "axios";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { BASE_URL } from "../config";
import { useEffect, useState } from "react";
import useGetUserId from "../hooks/useGetUserId";
import toast from "react-hot-toast";
const LikeSection = ({postId}:{postId:string}) => {
    const [liked, setLiked] = useState<boolean>(false)
    const [likes, setLikes] = useState([])
    const { userId } = useGetUserId()
     async function LikePost(){
        setLiked(true)
        try {
            const res = await axios.post(`${BASE_URL}/api/v1/blog/like/${postId}`,{
                postId, userId

            },{
                headers:{
                    Authorization: localStorage.getItem('token')
                }
            })
             if(res.data.message){
               const newLike = res.data
               setLikes([
                ...likes,
                newLike
               ])
             }

        } catch (error) {
            console.log(error)
            if(axios.isAxiosError(error) && error.response){
                toast.error(error.response.data.error)
            }
        }
     }

     async function getLikes(){
        try {
            const res = await axios.get(`${BASE_URL}/api/v1/blog/likes/${postId}`,{
                headers:{
                    Authorization: localStorage.getItem('token')
                }
            })
             if(res.data){
               setLikes(res.data)
               const myLike = res.data.some((like) => like.userId === userId);
               if(myLike){
                setLiked(true)
               }
             }

        } catch (error) {
            console.log(error)
            if(axios.isAxiosError(error) && error.response){
                toast.error(error.response.data.error)
            }
        }
     }

     async function Unlike(){
        try {
            const res = await axios.delete(`${BASE_URL}/api/v1/blog/unlike/${postId}`,{
                headers:{
                    Authorization: localStorage.getItem('token')
                }
            })
             if(res.data.message){
               setLiked(false)
               const newLikes = likes.filter((item)=>item.userId !== userId )
               if(newLikes){
                setLikes(newLikes)
               }
               
             }

        } catch (error) {
            console.log(error)
            if(axios.isAxiosError(error) && error.response){
                toast.error(error.response.data.error)
            }
        }
     }
     useEffect(()=>{
       getLikes()
     },[liked,userId])


  return (
    <div className=" mt-3 " >
        <div>
        <div onClick={ liked ? Unlike : LikePost} >
            {
                liked ? <FaHeart size={25} color="red" /> : <FaRegHeart size={25}/>
            }
            <div>
                {
                    likes.length>0 ? `${likes.length} Likes` :''
                }
            </div>
        </div>
        </div>
    </div>
  )
}

export default LikeSection


