import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
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
                    <div className="max-h-[250px] overflow-auto">
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
    const itemCSS: string = "text-2xl w-full text-black block py-2 pr-4 pl-3 md:border-0 md:p-0 animated-link";
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
                                    <p style={{ wordBreak: "break-word" }}>{blogPost.description}</p>
                                </div>
                            </NavLink>
                        )
                    })
                }

            </div>
        </>
    )
}
const Home = (): JSX.Element => {
    const [blogs, setBlogs] = useState<Array<BlogListItemProps>>([])
    const [projects, setProjects] = useState<Array<ProjectListItemProps>>([])

    const LANDING_PAGE_HEADER = "Matthew Chan - Full Stack & Smart Contracts Developer";
    const LANDING_PAGE_CONTENT = `
    \nHi 👋! I’m a Canadian software developer with experience writing full stack applications, smart contracts and building companies. Formally I studied electrical engineering at the University of British Columbia.
    \nIn the past I built a **[software engineering consulting company](https://zyphr.ca/)** where my company built software for companies such as Google, Jane Street, Hyperloop, and Deloitte. Prior to that I worked at **[Plotly](https://plotly.com/)** full-time, and interned at **[Nuance Communications](https://www.nuance.com/index.html)**.
    \nRecently I completed an engineering fellowship in Solidity at **[0xmacro](https://0xmacro.com/engineering-fellowship)**. I’ve since completed projects at the **[ETH NYC](https://ethglobal.com/showcase/echooo-messaging-protocol-h7oms)** and **[ETH Lisbon](https://taikai.network/ethlisbon/hackathons/ethlisbon-2022/projects/cl9txxyff24467501z26p21tjg9/idea)** hackathons, where one of the projects led to a pre-seed round of over half a million dollars.
    &nbsp;  
    `;

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
            <div className="w-full block md:flex lg:flex md:flex-col lg:flex-col md:flex-nowrap lg:flex-nowrap my-6 mx-5 md:mx-30 lg:mx-30">
                <div className="flex flex-wrap lg:flex-nowrap">
                    <div className="flex flex-col w-full p-5 m-[20px] lg:w-[70%] p-2 md:p-8 lg:p-8 border border-solid border-black rounded-2xl shadow-custom bg-[#EAEFEB]">
                        <div className="flex flex-wrap flex-col items-center md:flex-row">
                            <div className="flex flex-col w-full justify-center items-start text-center md:text-left">
                                <h1 className="my-4 text-4xl lg:text-5xl font-bold leading-tight border-0">{LANDING_PAGE_HEADER}</h1>
                            </div>
                        </div>
                        <div className="flex flex-col h-full container">
                            <div style={{ "whiteSpace": "pre-line" }}>
                                <ReactMarkdown linkTarget="_blank" className="text-2xl w-full " children={LANDING_PAGE_CONTENT} />
                            </div>
                            <div className="flex sm:flex-col md:flex-row align-center mt-auto mb-4 flex-wrap space-y-4 md:space-y-0 lg:space-y-0 md:space-x-12 lg:space-x-12">
                                <Link to="/Matthew_Chan_Resume_Final.pdf" target="_blank" download>
                                    <button className="animated-image bg-[#F3F4FF] font-bold py-2 px-5 rounded-2xl h-[75px]"><p className="text-black text-2xl">Download Resume 🔽</p></button>
                                </Link>
                                <a href="https://www.linkedin.com/in/matthewichan/" target="_blank" rel="noreferrer">
                                    <button className="animated-image-box inline-flex items-center">
                                        <img className="w-full h-[75px]" src="/linkedin.svg" alt="LinkedIn Logo" />
                                    </button>
                                </a>
                                <a href="https://github.com/mtwichan" target="_blank" rel="noreferrer">
                                    <button className="animated-image-box inline-flex items-center">
                                        <img className="w-full rounded-xl h-[75px]" src="/github.svg" alt="GitHub Logo" />
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="w-full m-[20px] lg:w-[30%] border border-solid border-black rounded-2xl shadow-custom bg-[#EAEFEB]">
                        <img src="/me.jpeg" alt="Matthew Chan" className="w-full h-full rounded-2xl object-cover" />
                    </div>
                </div>

                {/* <div className="flex flex-wrap lg:flex-nowrap">
                    <div className="flex w-full m-[20px]">
                        <div className="flex flex-col h-full w-full p-2 md:p-8 lg:p-8 border border-solid border-black rounded-2xl shadow-custom bg-[#EAEFEB]">
                            <div className="flex flex-col w-full justify-center items-center md:items-start lg:items-start md:text-left">
                                <h1 className="my-4 text-5xl font-bold leading-tight border-0">Experience</h1>
                            </div>
                            
                        </div>
                    </div>
                </div> */}

                <div className="flex flex-wrap lg:flex-nowrap">
                    <div className="flex w-full m-[20px] lg:w-[70%]">
                        <div className="flex flex-col h-full w-full p-2 md:p-8 lg:p-8 border border-solid border-black rounded-2xl shadow-custom bg-[#EAEFEB]">
                            <div className="flex flex-wrap flex-col items-center md:flex-row">
                                <div className="flex flex-col w-full justify-center items-center md:items-start lg:items-start md:text-left">
                                    <h1 className="my-4 text-5xl font-bold leading-tight border-0">Recent Projects</h1>
                                </div>
                                <ProjectCardContainer projectItems={projects} />
                            </div>
                            <div className="flex justify-center mt-auto w-full">
                                <NavLink to="/project">
                                    <button className="animated-image text-clip border border-solid border-black bg-[#F3F4FF] p-5 font-bold text-3xl text-black inline-flex justify-center items-center space-x-2 rounded-2xl w-full">
                                        <p className="text-black">See More</p>
                                        <img width="25px" alt="Right arrow" src="/right-arrow.svg" />
                                    </button>
                                </NavLink>
                            </div>

                        </div>
                    </div>

                    <div className="flex flex-wrap md:flex-nowrap m-[20px] lg:flex-nowrap w-full lg:w-[30%]">
                        <div className="flex flex-col w-full">
                            <div className="flex p-3 md:grow-[2] lg:grow-[2] md:p-8 lg:p-8 border border-solid border-black rounded-2xl shadow-custom bg-[#EAEFEB]">
                                <div className="container mx-auto flex flex-wrap flex-col">
                                    <div className="flex flex-col w-full justify-center text-center">
                                        <h1 className="my-4 text-3xl lg:text-5xl font-bold leading-tight border-0">Recent Blog Posts</h1>
                                    </div>
                                    <div className="mb-5">
                                        <BlogPostList blogItems={blogs} />
                                    </div>
                                    <div className="flex justify-center mt-auto w-full">
                                        <NavLink to="/blog">
                                            <button className="animated-image text-clip border border-solid border-black bg-[#F3F4FF] p-5 font-bold text-3xl inline-flex justify-center items-center space-x-2 rounded-2xl">
                                                <p className="text-black">Read More</p>
                                                <img width="25px" alt="Right arrow" src="/right-arrow.svg" />
                                            </button>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>


                            <div className="flex flex-1 flex-wrap md:flex-nowrap lg:flex-nowrap w-full">
                                <div className="w-full mt-5 p-3 md:p-6 lg:p-6 border border-solid border-black rounded-2xl shadow-custom bg-[#EAEFEB]">
                                    <div className="flex flex-col w-full">
                                        <h1 className="flex justify-center text-3xl lg:text-4xl font-bold">Want to work together?</h1>
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