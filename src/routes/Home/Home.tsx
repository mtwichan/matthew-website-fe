import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import { BACKEND_BLOG_API_URL, BACKEND_PROJECT_API_URL } from "../../constants";

interface ProjectCardProps {
    title: string;
    slug: string;
    description: string;
    className: string;
    imgSrc: string
}

interface BlogListItemProps {
    title: string;
    slug: string;
    description: string;
}

interface BlogListProps {
    blogItems: Array<BlogListItemProps>
}

interface ProjectListItemProps {
    title: string;
    slug: string;
    description: string;
    preview_img: string;
}

interface ProjectListProps {
    projectItems: Array<ProjectListItemProps>
}

const ProjectCard = ({ title, description, slug, imgSrc, className }: ProjectCardProps): JSX.Element => {
    return (
        <>
            <a href={`/project/${slug}`} className="flex w-full">
                <div className={`flex flex-col p-4 animated-image border border-solid border-black w-full ${className}`}>
                    <div className="flex">
                        <h2 className="flex w-4/5 text-4xl text-black m-2">{title}</h2>
                        <div className="flex w-1/5 items-center justify-end">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                        </div>
                    </div>
                    <h3 className="text-2xl text-black m-2">{description}</h3>
                    <div className="max-h-[250px]">
                        <img src={imgSrc} alt={`${title}`} className="max-h-full max-w-full h-full w-full object-contain" />
                    </div>
                </div>
            </a>
        </>
    )
}

const ProjectCardContainer = ({ projectItems }: ProjectListProps): JSX.Element => {
    if (projectItems.length === 0) {
        return (
            <></>
        )
    }

    return (
        <div className="flex flex-wrap flex-row">
            {projectItems.map((projectPost, idx) => {
                return <div className="flex p-2 w-full md:w-1/2 lg:w-1/2">
                    <ProjectCard title={projectPost.title} slug={projectPost.slug} description={projectPost.description} imgSrc={projectPost.preview_img} className={`bg-[#F8F8FF] max-h-[500px]`} />
                </div>
            })}
        </div>
    )
}
const BlogPostList = ({ blogItems }: BlogListProps): JSX.Element => {
    const itemCSS: string = "text-2xl w-full text-black block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0";
    const listCSS: string = "border-b-2 border-black"
    const blogURI: string = "/blog"

    if (blogItems.length === 0) {
        return (
            <></>
        )
    }

    return (
        <>
            <div className="w-full space-y-4 md:block ">
                
                    {
                        blogItems.map((blogPost, idx) => {
                            return (
                                <NavLink to={`${blogURI}/${blogPost.slug}`} className={itemCSS}>
                                    <div className="p-5 border border-black rounded-lg">
                                        <h5>{blogPost.title}</h5>
                                        <p>{blogPost.description}</p>
                                    </div>                                                                        
                                </NavLink>
                        )})
                    }
                        
            </div>
        </>
    )
}
const Home = (): JSX.Element => {
    const [blogs, setBlogs] = useState<Array<BlogListItemProps>>([])
    const [projects, setProjects] = useState<Array<ProjectListItemProps>>([])

    useEffect(() => {
        const fetchBlogs = async (): Promise<void> => {
            try {
                const response = await axios.get(BACKEND_BLOG_API_URL);
                const blogsData = await response.data;
                await setBlogs(blogsData);
            } catch (error) {
                console.log("error calling fetchBlogs(): ", error);
            }
        }

        const fetchProjects = async (): Promise<void> => {
            try {
                const params = "amount=4";
                const response = await axios.get(`${BACKEND_PROJECT_API_URL}?${params}`);
                const projectsData = await response.data;
                await setProjects(projectsData);
            } catch (error) {
                console.log("error calling fetchProjects(): ", error);
            }
        }
        fetchBlogs();
        fetchProjects();
    }, [])

    return (
        <>
            <div className="flex flex-col flex-wrap md:flex-nowrap lg:flex-nowrap my-10 mx-44">
                <div className="flex flex-wrap md:flex-nowrap lg:flex-nowrap">
                    <div className="w-full p-5 m-[20px] md:w-[70%] lg:w-[70%] p-2 md:p-8 lg:p-8 border border-solid border-black rounded-2xl shadow-custom drop-shadow-lg shadow-black bg-[#EAEFEB]">
                        <div className="flex flex-wrap flex-col items-center md:flex-row">
                            <div className="flex flex-col w-full justify-center items-start text-center md:text-left">
                                <h1 className="my-4 text-4xl lg:text-5xl font-bold leading-tight border-0">Product Designer creating thoughtful, intuitive interfaces.</h1>
                            </div>
                        </div>
                        <div className="container">
                            <div className="text-xl w-full">
                                I’m Dale-Anthony, a UK based product designer with over ten years of experience. I specialise in interface design for mobile and web-based applications with a focus on simplicity & usability.
                                I’m currently working at WP Engine on some of the worlds best WordPress products. Before that, I worked at BaseKit where I helped shape the future of website builders and tools to help small businesses thrive online. I also build tools like Design Vault and Does.Design.
                            </div>
                            <div className="flex sm:flex-col md:flex-row align-center mt-16 mb-4 flex-wrap sm:space-y-4 md:space-x-12 lg:space-x-12">
                                <button className="animated-image bg-[#F3F4FF] font-bold py-2 px-5 rounded-2xl"><p className="text-black text-2xl">Download Resume 🔽</p></button>
                                <a href="https://www.linkedin.com/in/matthewichan/" target="_blank" rel="noreferrer">
                                    <button className="animated-image-box text-white inline-flex items-center">
                                        <img className="w-full" src="/linkedin.svg" alt="LinkedIn Logo"/>
                                    </button>
                                </a>
                                <a href="https://github.com/mtwichan" target="_blank" rel="noreferrer">
                                    <button className="animated-image-box inline-flex items-center">
                                        <img className="object-fit" src="/github.svg" alt="GitHub Logo"/>
                                    </button>
                                </a>
                            </div>
                        </div>


                    </div>        
                    <div className="w-full m-[20px] md:w-[30%] lg:w-[30%] border border-solid border-black rounded-2xl shadow-custom drop-shadow-lg shadow-black bg-[#EAEFEB]">
                        <img src="/me.jpeg" alt="Picture of Matthew Chan" className="w-full h-full rounded-2xl" />
                    </div>

                </div>
                <div className="flex flex-wrap md:flex-nowrap lg:flex-nowrap">
                    <div className="flex w-full m-[20px] md:w-[70%] lg:w-[70%]">
                        <div className="w-full p-2 md:p-8 lg:p-8 border border-solid border-black rounded-2xl shadow-custom drop-shadow-lg shadow-black bg-[#EAEFEB]">
                            <div className="flex flex-wrap flex-col items-center md:flex-row">
                                <div className="flex flex-col w-full justify-center items-center md:items-start lg:items-start md:text-left">
                                    <h1 className="my-4 text-5xl font-bold leading-tight border-0">Recent Projects</h1>
                                </div>
                                <ProjectCardContainer projectItems={projects} />
                            </div>
                            <div className="flex justify-center mt-10 w-full">
                                <NavLink to="/project">
                                    <button className="animated-image text-clip border border-solid border-black bg-[#F3F4FF] p-5 font-bold text-3xl text-black inline-flex justify-center items-center space-x-2 rounded-2xl w-full">
                                        <p className="text-black">See More</p>
                                        <img width="25px" src="/right-arrow.svg"/>
                                    </button>
                                </NavLink>
                            </div>

                        </div>
                    </div>

                    <div className="flex flex-wrap md:flex-nowrap m-[20px] lg:flex-nowrap w-full md:w-[30%] lg:w-[30%]">
                        <div className="flex flex-col w-full">
                            <div className="flex p-3 md:grow-[2] lg:grow-[2] md:p-8 lg:p-8 border border-solid border-black rounded-2xl shadow-custom drop-shadow-lg shadow-black bg-[#EAEFEB]">
                                <div className="container mx-auto flex flex-wrap flex-col">
                                    <div className="flex flex-col w-full justify-center text-center">
                                        <h1 className="my-4 text-3xl lg:text-5xl font-bold leading-tight border-0">Recent Blog Posts</h1>
                                    </div>
                                    <BlogPostList blogItems={blogs} />
                                    <div className="flex justify-center mt-auto w-full">
                                        <NavLink to="/blog">
                                        <button className="animated-image text-clip border border-solid border-black bg-[#F3F4FF] p-5 font-bold text-3xl inline-flex justify-center items-center space-x-2 rounded-2xl">
                                                <p className="text-black">Read More</p>
                                                <img width="25px" src="/right-arrow.svg"/>
                                            </button>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>


                            <div className="flex flex-1 flex-wrap md:flex-nowrap lg:flex-nowrap w-full">
                                <div className="w-full mt-5 p-3 md:p-6 lg:p-6 border border-solid border-black rounded-2xl shadow-custom drop-shadow-lg shadow-black bg-[#EAEFEB]">
                                    <div className="flex flex-col w-full">
                                        <h1 className="flex text-center text-3xl lg:text-4xl font-bold">Want to work together?</h1>
                                        <div className="flex w-full flex-col align-center justify-center item-center">
                                            <NavLink to="/contact" className="flex justify-center">
                                                <button className="animated-image text-clip border border-solid border-black bg-[#F3F4FF] mt-5 p-5 font-bold text-3xl inline-flex justify-center items-center space-x-2 rounded-2xl">
                                                    <p className="text-black font-bold">Contact Me 👋</p>                                                    
                                                </button>
                                            </NavLink>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}
export default Home;