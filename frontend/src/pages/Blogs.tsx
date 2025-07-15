import { useState } from "react";
import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks";
import { Skeleton } from "../components/Skeleton";


export const Blogs = () => {
    const {loading, blogs} = useBlogs();

    if(loading){
        return <div>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
        </div>
    }

    return <div>
        <Appbar />
        {blogs.map(blog => 
            <BlogCard authorName = {blog.author.FirstName|| "Anonymous"}
            title = {blog.title}
            content = {blog.content}
            publishedDate = "15th July, 2025"
            id= {blog.id} />
        )}
    
    </div>
 
}