import { useEffect, useState } from "react";
import axios from "axios";
import BlogPreviewRow from "../../components/Blog/BlogPreviewRow";
import { BACKEND_BLOG_API_URL } from "../../constants";

interface Post {
    preview_img: string;
    title: string;
    created_on: string;
    description: string;
    slug: string;
}

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
            <div className="w-full bg-[#FFA500]">
                <div className="marquee bg-orange-500 border border-black border-2 p-2 mt-5">
                    <ul className="marquee-content font-bold text-4xl text-white">
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
                    </ul>
                    <ul aria-hidden="true" className="marquee-content font-bold text-4xl text-white">
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
                    </ul>
                </div>
                <div className="mx-10">
                    {renderBlogPreviews()}
                </div>
            </div>
        </>
    )
}
export default BlogPreview;