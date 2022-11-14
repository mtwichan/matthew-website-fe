import { useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import axios from "axios";

import BlogPage from "../../components/Blog/BlogPage";
import { BACKEND_BLOG_API_URL } from "../../constants";


interface Post {
    title: string;
    created_on: string;
    description: string;
    slug: string;
    content:string;
    preview_img: string;
}

const Blog = (): JSX.Element => {
    const {blogSlug} = useParams();
    console.log(blogSlug)
    const [post, setPost] = useState<Post>()
    
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(BACKEND_BLOG_API_URL + blogSlug);
                const postData = await response.data;
                await setPost(postData[0]);
            } catch (error) {
                console.log("error calling fetchPost(): ", error);
            }
        }
        fetchPost();
    }, [])

    return (
        <>
            <div className="flex w-full justify-center bg-[#ffa500]">                
                <BlogPage post={post}/>
            </div>
        </>
    )
}
export default Blog;