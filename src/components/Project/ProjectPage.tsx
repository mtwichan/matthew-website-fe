import ReactMarkdown from 'react-markdown'
import WrongPage from "../Error/WrongPage"

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
const ProjectPage = ({project}: ProjectPageProps): JSX.Element => {
    if (project !== undefined) {
        return (
            <div className="container mt-5 mb-5">
                <div className="border-2 border-black p-16 bg-white shadow-custom drop-shadow-lg shadow-black">
                    <div className="flex flex-col">
                        <div className='mt-2'>
                            <h2 className="text-3xl font-bold">{project.title}</h2>                        
                        </div>
                        <div className='mt-1'>
                            <h4 className="text-2xl">{project.description}</h4>
                        </div>
                        <div className='mt-3 h-1/2 w-100 max-h-1/3'>
                            <img className="object-scale-down max-h-96 h-auto w-100" src={project.preview_img} alt={`Describing ${project.description}`}></img>
                        </div>
                        
                    </div>
                    <hr className='mt-5 border-black'/>
                    <div className='mt-5'>
                        <ReactMarkdown className="text-lg" children={project.content}/>
                    </div>
                </div>            
            </div>
        )   
    } 

    return (
        <WrongPage/>
    )
}

export default ProjectPage;