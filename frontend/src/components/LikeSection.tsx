import axios from "axios";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { BASE_URL } from "../config";
import { useEffect, useState } from "react";
import useGetUserId from "../hooks/useGetUserId";
import toast from "react-hot-toast";
interface Like {
    id:number,
    userId:number,
    postId:number
}
const LikeSection = ({postId}:{postId:string}) => {
    const [liked, setLiked] = useState<boolean>(false)
    const [likes, setLikes] = useState<Like[]>([])
    console.log(likes)
    const { userId } = useGetUserId()
     async function LikePost(){
        setLiked(true)
        setLikes((prev:Like)=>[...prev, {userId}])
        try {
            const res = await axios.post(`${BASE_URL}/api/v1/blog/like/${postId}`,{
                postId, userId

            },{
                headers:{
                    Authorization: localStorage.getItem('token')
                }
            })
             if(!res.data.message){
                throw new Error('Failed to like the Post')
             }

        } catch (error) {
            setLiked(false);
      setLikes((prev) => prev.filter((like) => like.userId !== userId));
            if(axios.isAxiosError(error) && error.response){
                toast.error(error.response.data.error)
            }
        }
     }

     async function Unlike(){
        setLiked(false)
        setLikes((prev) => prev.filter((like) => like.userId !== userId))
        try {
            const res = await axios.delete(`${BASE_URL}/api/v1/blog/unlike/${postId}`,{
                headers:{
                    Authorization: localStorage.getItem('token')
                }
            })
            if (!res.data.message) {
                throw new Error("Failed to unlike the post"); // Revert on failure
              }

        } catch (error) {
            console.log(error)
            setLiked(true);
      setLikes((prev) => [...prev, { userId }]);
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
                setLiked(myLike)
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
     },[userId,postId])





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


