
import { useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import axios from "axios";

import ProjectPage from "../../components/Project/ProjectPage";
import { BACKEND_PROJECT_API_URL } from "../../constants";


interface ProjectProps {
    title: string;
    created_on: string;
    description: string;
    slug: string;
    content:string;
    preview_img: string
}

const Project = (): JSX.Element => {
    const {projectSlug} = useParams();
    // TODO: send empty object instead
    const [project, setProject] = useState<ProjectProps>()
    
    useEffect(() => {
        const fetchProject = async (): Promise<void> => {
            try {
                const response = await axios.get(BACKEND_PROJECT_API_URL + projectSlug);
                const projectData = await response.data;
                await setProject(projectData[0]);
            } catch (error) {
                console.log("error calling fetchProject(): ", error);
            }
        }
        fetchProject();
    }, [])

    return (
        <>
            <div className="flex w-full justify-center bg-[#9370db]">                
                <ProjectPage project={project}/>
            </div>
        </>
    )
}
export default Project;