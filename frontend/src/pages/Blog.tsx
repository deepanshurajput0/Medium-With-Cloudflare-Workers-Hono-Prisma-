import SingleBlog from "../components/SingleBlog";
import useBlog from "../hooks/useBlog";
import { useParams } from "react-router-dom";
const Blog = () => {
  const { id } = useParams();
  const { blog, loading } = useBlog({ id });
  if (loading) {
    return <div>Loading....</div>;
  }
  return (
    <div>
      <SingleBlog
        title={blog?.title ?? "Untitled"}
        content={blog?.content ?? "No content available"}
        publishedDate={blog?.createdAt ?? "Unknown date"}
        author={blog?.author?.name ?? "Anonymous"}
      />
    </div>
  );
};

export default Blog;
