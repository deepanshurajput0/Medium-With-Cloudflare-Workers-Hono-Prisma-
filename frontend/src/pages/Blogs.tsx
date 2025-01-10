import BlogCard from "../components/BlogCard"
import BlogSkeleton from "../components/BlogSkeleton"
import Navbar from "../components/Navbar"
import useBlogs from "../hooks/useBlogs"
import moment from 'moment'
const Blogs = () => {
    const { loading, blogs } = useBlogs()
    const skeletons = [1,2,3,4,5]
    if(loading){
        return(
           <div>
            <Navbar/>
             <div className=" lg:flex lg:flex-col lg:justify-center lg:items-center ml-10 mt-6 ">
            {
                skeletons.map((item)=>{
                  return (
                     <BlogSkeleton key={item} />
                  )
                })
            }
            </div>
           </div>
        )
    }
  return (
   <div>
    <Navbar/>
    
     <div className=" flex flex-col items-center space-y-5 justify-center mt-10 ">
         {
            blogs.map((item)=>{
                const formatedDate = item?.createdAt

                return(
                    <BlogCard 
                    id={item.id}
                    author={item.author.name} 
                    publishedDate={moment(formatedDate).format('DD/MM/YYYY')} 
                    title={item?.title} 
                    content={item?.content}
                    authorId={item?.authorId}
                    />
                )
            })
         }

    
    </div>
   </div>
  )
}

export default Blogs


