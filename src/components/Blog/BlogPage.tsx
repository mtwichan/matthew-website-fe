import ReactMarkdown from 'react-markdown'
import WrongPage from "../Error/WrongPage"

interface Post {
    title: string;
    created_on: string;
    description: string;
    slug: string;
    content:string;
    preview_img: string;
}

interface BlogPageProps {
    post: Post | undefined
}

const BlogPage = ({post}: BlogPageProps): JSX.Element => {
    if (post !== undefined) {
        return (
            <div className="container mt-10 mb-10 bg-white">
                <div className="border-2 border-black p-16 bg-white shadow-custom drop-shadow-lg shadow-black h-full">
                    <div className="flex flex-col">
                        <div className='mt-2'>
                            <h2 className="text-3xl font-bold">{post.title}</h2>                        
                        </div>
                        <div className='mt-1'>
                            <h4 className="text-2xl">{post.description}</h4>
                        </div>
                        <div className='mt-1 h-1/2 w-100 max-h-1/3'>
                            <img className="object-scale-down max-h-96 h-auto w-100" src={post.preview_img} alt={`Describing ${post.description}`}></img>
                        </div>
                        
                    </div>
                    <hr className='mt-5 border-black'/>
                    <div className='mt-5'>
                        <ReactMarkdown className="text-lg" children={post.content}/>
                    </div>
                </div>            
            </div>
        )
    }

    return (
        <WrongPage/>
    )
}

export default BlogPage;