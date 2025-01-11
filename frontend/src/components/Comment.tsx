import { useState } from "react";
import useComments from "../hooks/useComments";
import { Loader } from "../pages/Create";
const Comment = ({id}:{id:string}) => {
  const [comment, setComment] = useState<string>("");
  const { loading, makeComment } = useComments({ id, comment });
  return (
    <div>
      <div className=" mt-16 ml-4 flex  items-center">
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  lg:w-[30rem] w-[22rem] p-2.5"
          onChange={(e)=>setComment(e.target.value)}
          value={comment}
          placeholder="Make a Comment"
          required
        />{" "}
        <br />
        <button
        onClick={makeComment}
          type="button"
          className="text-white ml-4 mt-2 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          {
            loading ? <Loader/> : 'Add' 
          }
        </button>
      </div>
      <div className=" ml-4 mt-5">
        <h1 className=" text-[20px] font-semibold">Comments Here</h1>
      </div>
    </div>
  );
};

export default Comment;
