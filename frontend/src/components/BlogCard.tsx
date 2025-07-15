import { Link } from "react-router-dom"

interface BlogCardType {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string
    id: string
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
    id
}: BlogCardType) => {
    
    return <Link to = {`/blog/${id}`} >
        <div className="pt-8 pr-8 pl-8">
        
        <div className="flex text-sm items-center">
            
            <Avatar name= {authorName}/>

            <div className="pr-1 pl-2">
                {authorName}
            </div>
            ·
            <div className="text-slate-500 pl-1">
                {publishedDate}
            </div>
        </div>

        <div className="text-2xl font-bold pb-1 pt-2">
            {title}
        </div>

        <div className="font-serif text-gray-700">
            {content.slice(0,300)} ...
        </div>
        <div className="p-4">

        </div>
        <div className="text-sm text-slate-500">
            {Math.ceil(content.length/100)} min read
        </div>
        
        <hr className="h-px my-8 bg-gray-200 border-0">

        </hr>
    </div>
    </Link>
}

interface AvatarType {
    name: string,
}

export const Avatar = ({name}: AvatarType) => {
    return <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
        <span className=" font-medium text-gray-600">{name[0]}</span>
    </div>
}