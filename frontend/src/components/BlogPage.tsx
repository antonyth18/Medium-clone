import App from "../App"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

interface PageType {
    text: string,
    publishedDate: string,
    authorName: string,
    content: string
}

export const BlogPage = ({ 
    text,
    publishedDate,
    authorName,
    content
}: PageType) => {
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 gap-6 w-full max-w-screen-xl pt-10 px-20">
                <div className="col-span-8">
                    <div className="text-5xl font-extrabold">
                        {text}
                    </div>
                    <div className="pl-1 pt-4 pb-4 text-gray-400">
                        Posted on {publishedDate}
                    </div>
                    <div className="p-1 pb-10">
                        {content}
                    </div>
                </div>

                <div className="col-span-4">
                    <div>
                        Author
                    </div>

                    <div className="flex items-center pt-3">
                        <Avatar name={authorName}/>
                        <div className="text-xl font-bold pl-3">
                            {authorName}
                        </div>
                    </div>
                    
                </div>

            </div>
        </div>
        
    </div>
}