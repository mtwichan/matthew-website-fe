import { useEffect, useState } from "react";
import axios from "axios";
import BlogPreviewRow from "../../components/Blog/BlogPreviewRow";
import SearchBar from "../../components/SearchBar";
import { BACKEND_BLOG_API_URL } from "../../constants";

interface Post {
    preview_img: string;
    title: string;
    created_on: string;
    description: string;
    slug: string;
}

const BLOG_MARQUEE = (
    <> 
        <li>✦</li>
        <li>BLOG</li>
        <li>✦</li>
        <li>BLOG</li>
        <li>✦</li>
        <li>BLOG</li>
        <li>✦</li>
        <li>BLOG</li>
        <li>✦</li>
        <li>BLOG</li>
        <li>✦</li>
        <li>BLOG</li>
        <li>✦</li>
        <li>BLOG</li>
        <li>✦</li>
        <li>BLOG</li>
        <li>✦</li>
        <li>BLOG</li>
        <li>✦</li>
        <li>BLOG</li>
        <li>✦</li>
        <li>BLOG</li>
    </>
)

const BlogPreview = (): JSX.Element => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const response = await axios.get(BACKEND_BLOG_API_URL);
                const postsData = response.data;
                await setPosts(postsData)
            } catch (error) {
                console.log("error calling fetchAllPosts(): ", error)
            }
        }
        fetchAllPosts();
    }, [])

    const renderBlogPreviews = (): Array<JSX.Element> => {
        return posts.map((post: Post, idx: number) => {
            return <BlogPreviewRow key={idx} previewImg={post.preview_img} title={post.title} date={post.created_on} description={post.description} slug={post.slug} />
        })
    }

    return (
        <>
            <div className="w-full bg-[#F4ECE0]">
                <div className="marquee bg-[#FFAB48] p-2">
                    <ul className="marquee-content font-bold text-4xl text-white">
                        {BLOG_MARQUEE}
                    </ul>
                    <ul aria-hidden="true" className="marquee-content font-bold text-4xl text-white">
                        {BLOG_MARQUEE}
                    </ul>
                </div>                
                <div className="mx-4 md:mx-16 lg:mx-64 my-6">
                    <SearchBar endpoint={BACKEND_BLOG_API_URL} setFrontEnd={setPosts}/>
                    {renderBlogPreviews()}
                </div>
            </div>
        </>
    )
}
export default BlogPreview;