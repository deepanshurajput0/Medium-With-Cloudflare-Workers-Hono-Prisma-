import { Blogtype } from "./BlogCard"
import moment from "moment"
// import { BsThreeDotsVertical } from "react-icons/bs";

const SingleBlog = ({author,publishedDate,title,content}:Blogtype) => {
    const formatedDate = publishedDate
  return (
    <div className=" flex justify-evenly items-center" >
       <div className=" mt-10 p-3">
       <div>
        <h1 className=" text-3xl  font-bold ">{title}</h1>

       </div>
       <div className=" text-gray-600" >
        <p>Posted on {moment(formatedDate).format('DD/MM/YYYY')} </p>
       </div>
       <div>
        <p className=" font-serif mt-5" >
            {content}
        </p>
       </div>
       </div>

       <div>
        <p className=" ml-2 text-gray-500">Author</p>
    <div className=" flex mt-2 items-center">
    <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="font-medium text-gray-600 dark:text-gray-300">{author[0]}</span>
</div>
        <div className="pl-1 text-gray-600">
        {author}
        </div>
    </div>
       </div>
    </div>
  )
}

export default SingleBlog