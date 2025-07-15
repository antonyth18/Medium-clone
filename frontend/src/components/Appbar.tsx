import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar = () => {
    return <div className="flex justify-between border-b px-8 py-4 items-center">
        <Link to = "/blogs">
            <div className="font-medium text-lg">
                Medium
            </div>
        </Link>
        
        <div>
            <Link to='/publish'>
                <button type="button" className="mr-4 text-white bg-green-500 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Create New</button>
            </Link>
            
            <Avatar name="Anto"/>
        </div>
    </div>
}