import { Helmet } from 'react-helmet';
import ReactMarkdown from 'react-markdown'
import { NavLink } from "react-router-dom";

interface Post {
    title: string;
    created_on: string;
    description: string;
    slug: string;
    content: string;
    preview_img: string;
}

interface BlogPageProps {
    post: Post | undefined
}

const BlogPage = ({ post }: BlogPageProps): JSX.Element | null => {
    if (post !== undefined) {
        const formatedDate = new Date(post.created_on).toLocaleDateString("en-us", { year: 'numeric', month: 'long', day: 'numeric' });
        return (
            <>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{`Matthew Chan - ${post.title}`}</title>
                    <meta name="description" content={`Matthew Chan - ${post.description}`}/>
                </Helmet>
                <div className="container mx-4 md:mx-14 lg:mx-5 my-5 bg-[#FEFBF5]">
                    <div className="h-full border-2 border-black rounded-xl p-10 bg-[#FEFBF5] shadow-custom drop-shadow-lg shadow-black">
                        <div className="flex flex-row-reverse">
                            <NavLink to="/blog" className="flex justify-center">
                                <button className="animated-image py-2 px-4">
                                    <p className="text-black font-bold">X</p>
                                </button>
                            </NavLink>
                        </div>
                        <div className='mt-2 mb-10'>
                            <h2 className="text-3xl text-center font-bold">{post.title}</h2>
                        </div>
                        <div className='mt-5 md:mx-32 lg:mx-40'>
                            <h5 className="text-xl text-left font-bold mb-3">{formatedDate}</h5>
                            <ReactMarkdown className="text-lg" children={post.content} />
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return null;
}

export default BlogPage;