import { Link } from "react-router-dom"
import { BsThreeDotsVertical } from "react-icons/bs";
import useGetUserId from "../hooks/useGetUserId";
export interface Blogtype {
    author:string,
    publishedDate:string,
    title:string,
    authorId:number,
    content:string,
    id?:number
}

const BlogCard = ({author,publishedDate,title,content,id,authorId}:Blogtype) => {
    const { userId } = useGetUserId()
  return (
   
    <div className=" w-96 lg:w-[35rem] border-b-2 pb-4 cursor-pointer">
        <div className=" flex items-center space-x-1">
        <div >
            <Avatar name={author} />
        </div>
            <div className="">
                {author}.
            </div>
          <div className=" text-gray-600 pl-2">
          {publishedDate}
          </div>
          <div>
              {
                authorId === userId ? 
                <details className="dropdown">
                <summary className="btn bg-white border-none m-1">
                    <BsThreeDotsVertical/>
                </summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                  <li><Link to={`/update/${id}`} > Update </Link></li>
                  <li><a> Delete </a></li>
                </ul>
              </details>  
                : null
              }
          </div>
    
        </div>
        <Link to={`/blog/${id}`} >
        <div className=" font-bold text-[20px] pt-1">
            {title}
        </div>
        <div className=" font-serif text-gray-600">
            {content.substring(0,150)}...
        </div>
        </Link>
    </div>
  )
}


const Avatar =({name}:{name:string})=>{
    return(      

<div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
</div>


    )
}

export default BlogCard


