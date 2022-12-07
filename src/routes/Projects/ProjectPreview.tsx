
import { useEffect, useState } from "react";
import axios from "axios";

import ProjectPreviewCard from "../../components/Project/ProjectPreviewCard";
import SearchBar from "../../components/SearchBar";
import { BACKEND_PROJECT_API_URL } from "../../constants";

type Project = {
    preview_img: string,
    title: string
    created_on: string,
    description: string,
    slug: string
}

const MARQUEE_ELEMENTS = (      
    <>
        <li>✦</li>
        <li>PROJECTS</li>
        <li>✦</li>
        <li>PROJECTS</li>
        <li>✦</li>
        <li>PROJECTS</li>
        <li>✦</li>
        <li>PROJECTS</li>
        <li>✦</li>
        <li>PROJECTS</li>
        <li>✦</li>
        <li>PROJECTS</li>
        <li>✦</li>
        <li>PROJECTS</li>
    </>                  
)

const ProjectPreview = (): JSX.Element => {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        const fetchAllProjects = async (): Promise<void> => {
            try {
                const response = await axios.get(BACKEND_PROJECT_API_URL);
                const projectData = response.data;
                await setProjects(projectData)
            } catch (error) {
                console.log("error calling fetchAllProjects(): ", error)
            }
        }
        fetchAllProjects();
    }, [])

    const renderProjectPreviews = (): Array<JSX.Element> => {
        return projects.map((project: Project, idx: number) => {
            return <ProjectPreviewCard key={idx} previewImg={project.preview_img} title={project.title} date={project.created_on} description={project.description} slug={project.slug} />
        })
    }

    return (
        <>
            <div className="w-full bg-[#E5E0F4]">
                <div className="marquee bg-[#C070FF] p-1">
                    <ul className="marquee-content font-bold text-4xl text-white">
                        {MARQUEE_ELEMENTS}
                    </ul>
                    <ul aria-hidden="true" className="marquee-content font-bold text-4xl text-white">
                        {MARQUEE_ELEMENTS}
                    </ul>
                </div>
                <div className="mx-4 md:mx-16 lg:mx-22 mt-5 ">
                    <SearchBar endpoint={BACKEND_PROJECT_API_URL} setFrontEnd={setProjects}/>
                </div>
                <div className="md:grid lg:grid md:grid-cols-2 lg:grid-cols-2 gap-10 mx-4 md:mx-16 lg:mx-22 mt-4 mb-12">                    
                    {renderProjectPreviews()}
                </div>
            </div>
        </>
    )
}
export default ProjectPreview;