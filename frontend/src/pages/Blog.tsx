import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import { BlogPage } from "../components/BlogPage";

import { Spinner } from "../components/Spinner";

export const Blog = () => {
    const {id} = useParams();
    const {loading, blog} = useBlog( {id: id || ""} )

    if (loading) {
        return <div className="flex justify-center pt-[20rem]">
            <Spinner />
        </div>
    }
    return <div>
        <BlogPage text= {blog?.title || ""}
            publishedDate = {"15th July, 2025"}
            authorName = {blog?.author.FirstName|| "Anonymous"}
            content={blog?.content || ""} />
    </div>
}