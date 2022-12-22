import { Helmet } from 'react-helmet';
import ReactMarkdown from 'react-markdown'
import { NavLink } from "react-router-dom";

interface Project {
    title: string;
    created_on: string;
    description: string;
    slug: string;    
    content:string;
    preview_img: string;
}

interface ProjectPageProps {
    project: Project | undefined
}
const ProjectPage = ({project}: ProjectPageProps): JSX.Element | null => {
    if (project !== undefined) {
        return (
            <>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{`Matthew Chan - ${project.title}`}</title>
                    <meta name="description" content={`Matthew Chan - ${project.description}`}/>
                </Helmet>
                <div className="container mx-4 md:mx-14 lg:mx-5 my-5 bg-[#E5E0F4]">
                <div className="h-full border-2 border-black rounded-xl p-10 bg-[#F9F5FE] shadow-custom drop-shadow-lg shadow-black">
                        <div className="flex flex-row-reverse">
                        <NavLink to="/project" className="flex justify-center">
                            <button className="animated-image py-2 px-4">
                                <p className="text-black font-bold">X</p>                                                    
                            </button>
                        </NavLink>    
                        </div>                    
                        <div className='mt-2 mb-10'>
                            <h2 className="text-3xl text-center font-bold">{project.title}</h2>                        
                        </div>                        
                    <div className='mt-5 md:mx-32 lg:mx-40'>
                        <ReactMarkdown className="text-lg" children={project.content}/>
                    </div>
                </div>            
            </div>
            </>
        )   
    } 

    return null;
}

export default ProjectPage;