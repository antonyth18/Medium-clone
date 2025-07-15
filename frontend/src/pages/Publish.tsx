import { useRef, useState } from "react";
import { Appbar } from "../components/Appbar"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Publish = () => {

    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    async function sendRequest() {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });

            navigate(`/blog/${response.data.id}`)
        } catch(e){

        }
    }

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const resize = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.style.height = "auto"; // reset
        textarea.style.height = `${textarea.scrollHeight}px`; // adjust
    };
    return <div>
        <Appbar />
        <div className="flex justify-center p-10 px-20">
            <textarea onChange={(e) => {
                setTitle(e.target.value)
            }} placeholder="Title" className="h-25 pt-[2.5rem] border-b w- w-max-lg text-center items-center textarea textarea-lg text-5xl font-extrabold focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-400">

            </textarea>
        </div>

        <div className="p-10 flex justify-center">
            <textarea
            onChange={(e) => {
                setContent(e.target.value)
            }}
            ref={textareaRef}
            onInput={resize}
            rows={1}
            className="w-[60rem] text-lg text-slate-700 rounded-lg px-3.5 py-2.5 resize-none overflow-hidden focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-400"
            placeholder="Your blog..."
            /> 
        </div>

        <div className="flex justify-center p-3">
            <div className="">
                <button onClick={sendRequest} type="button" className="w-full focus:outline-none text-white bg-purple-900 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Publish Post</button>
            </div>
        </div>
    </div>
}