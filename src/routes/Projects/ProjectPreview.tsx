
import { useEffect, useState } from "react";
import axios from "axios";

import ProjectPreviewCard from "../../components/Project/ProjectPreviewCard";
import { BACKEND_PROJECT_API_URL } from "../../constants";
type Project = {
    preview_img: string,
    title: string
    created_on: string,
    description: string,
    slug: string
}

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
            <div className="w-full bg-[#7b68ee]">
                <div className="marquee bg-purple-500 border border-black border-2 p-2 mt-5">
                    <ul className="marquee-content font-bold text-4xl text-white">
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
                    </ul>
                    <ul aria-hidden="true" className="marquee-content font-bold text-4xl text-white">
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
                    </ul>
                </div>
                <div className="grid grid grid-cols-3 gap-4 mx-10">
                    {renderProjectPreviews()}
                </div>
            </div>
        </>
    )
}
export default ProjectPreview;