import BlogCard from "../components/BlogCard"
import Navbar from "../components/Navbar"
import useBlogs from "../hooks/useBlogs"
import moment from 'moment'
const Blogs = () => {
    const { loading, blogs } = useBlogs()
    if(loading){
        return(
            <div>
                Loading....
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
                    author={item.author.name} 
                    publishedDate={moment(formatedDate).format('DD/MM/YYYY')} 
                    title={item?.title} 
                    content={item?.content}
                    />
                )
            })
         }

    
    </div>
   </div>
  )
}

export default Blogs


