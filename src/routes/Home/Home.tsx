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
            <a href={`/project/${slug}`} className="flex">
                <div className={`flex flex-col p-4 animated-image border border-solid border-black w-full ${className}`}>
                    <div className="flex">
                        <h2 className="flex w-4/5 text-4xl text-white m-2">{title}</h2>
                        <div className="flex w-1/5 items-center justify-end">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                        </div>
                    </div>
                    <h3 className="text-2xl text-white m-2">{description}</h3>
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
                return <div className="flex p-2 w-1/2">
                    <ProjectCard title={projectPost.title} slug={projectPost.slug} description={projectPost.description} imgSrc={projectPost.preview_img} className={`bg-purple-500 max-h-[500px]`} />
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
            <div className="w-full md:block">
                <ul className="flex flex-col mt-4 w-full md:justify-evenly md:text-md md:font-medium">
                    {
                        blogItems.map((blogPost, idx) => {
                            return (<li className={listCSS}>
                                <NavLink to={`${blogURI}/${blogPost.slug}`} className={itemCSS}>{blogPost.title}</NavLink>
                            </li>)
                        })
                    }
                </ul>
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
            <div className="flex flex-col flex-wrap md:flex-nowrap lg:flex-nowrap">
                <div className="flex flex-wrap md:flex-nowrap lg:flex-nowrap w-full">
                    <div className="m-5 w-full md:w-[50%] lg:w-[50%] p-2 md:p-8 lg:p-8 border border-solid border-black rounded-3xl shadow-custom drop-shadow-lg shadow-black bg-[#f5fffa]">
                        <div className="container mx-auto flex flex-wrap flex-col items-center md:flex-row">
                            <div className="flex flex-col w-full justify-center items-start text-center md:text-left">
                                <h1 className="my-4 text-3xl lg:text-4xl font-bold leading-tight border-0">Product Designer creating thoughtful, intuitive interfaces.</h1>
                            </div>
                        </div>
                        <div className="container">
                            <div className="text-xl w-full">
                                I’m Dale-Anthony, a UK based product designer with over ten years of experience. I specialise in interface design for mobile and web-based applications with a focus on simplicity & usability.
                                I’m currently working at WP Engine on some of the worlds best WordPress products. Before that, I worked at BaseKit where I helped shape the future of website builders and tools to help small businesses thrive online. I also build tools like Design Vault and Does.Design.
                            </div>
                            <div className="flex align-center mt-16 mb-4 flex-wrap">
                                <button className="animated-image bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-4 rounded-3xl">Download Resume</button>
                                <a href="https://github.com/mtwichan" target="_blank" rel="noreferrer">
                                    <button className="animated-image bg-gray-700 hover:bg-gray-900 p-3 font-semibold text-white inline-flex items-center space-x-2 rounded-3xl mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="w-7" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                            <g fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" fill="currentColor" /></g>
                                        </svg>
                                    </button>
                                </a>
                                <a href="https://www.linkedin.com/in/matthewichan/" target="_blank" rel="noreferrer">
                                    <button className="animated-image bg-blue-600 hover:bg-blue-800 p-3 font-semibold text-white inline-flex items-center space-x-2 rounded-3xl">
                                        <svg className="w-7 h-7 fill-current" role="img" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                                            <g><path d="M218.123122,218.127392 L180.191928,218.127392 L180.191928,158.724263 C180.191928,144.559023 179.939053,126.323993 160.463756,126.323993 C140.707926,126.323993 137.685284,141.757585 137.685284,157.692986 L137.685284,218.123441 L99.7540894,218.123441 L99.7540894,95.9665207 L136.168036,95.9665207 L136.168036,112.660562 L136.677736,112.660562 C144.102746,99.9650027 157.908637,92.3824528 172.605689,92.9280076 C211.050535,92.9280076 218.138927,118.216023 218.138927,151.114151 L218.123122,218.127392 Z M56.9550587,79.2685282 C44.7981969,79.2707099 34.9413443,69.4171797 34.9391618,57.260052 C34.93698,45.1029244 44.7902948,35.2458562 56.9471566,35.2436736 C69.1040185,35.2414916 78.9608713,45.0950217 78.963054,57.2521493 C78.9641017,63.090208 76.6459976,68.6895714 72.5186979,72.8184433 C68.3913982,76.9473153 62.7929898,79.26748 56.9550587,79.2685282 M75.9206558,218.127392 L37.94995,218.127392 L37.94995,95.9665207 L75.9206558,95.9665207 L75.9206558,218.127392 Z M237.033403,0.0182577091 L18.8895249,0.0182577091 C8.57959469,-0.0980923971 0.124827038,8.16056231 -0.001,18.4706066 L-0.001,237.524091 C0.120519052,247.839103 8.57460631,256.105934 18.8895249,255.9977 L237.033403,255.9977 C247.368728,256.125818 255.855922,247.859464 255.999,237.524091 L255.999,18.4548016 C255.851624,8.12438979 247.363742,-0.133792868 237.033403,0.000790807055"></path></g>
                                        </svg>
                                    </button>
                                </a>
                            </div>
                        </div>


                    </div>        
                    <div className="m-5 w-full md:w-[25%] lg:w-[25%] border border-solid border-black rounded-3xl shadow-custom drop-shadow-lg shadow-black bg-[#f5fffa]">
                        <img src="/me.jpeg" alt="NFT mint QR code" className="w-full h-full rounded-3xl" />
                    </div>



                    {/* <div className="m-5 w-full md:w-2/5 lg:w-2/5 p-2 border border-solid border-black rounded-md shadow-custom drop-shadow-lg shadow-black bg-[#f5fffa]">
                    <div className="container flex flex-wrap flex-col justify-center items-center md:flex-row">
                        <div className="flex flex-col w-full">
                            <div className="flex flex-col w-full justify-center align-center text-center mx-auto">
                                <h1 className="my-4 text-6xl text-white font-bold leading-tight border-0" style={{"textShadow":"4px 4px 0 #221f20, 1px -1px 0 #221f20, -1px -1px 0 #221f20, -1px 1px 0 #221f20"}}>MINT AN NFT!</h1>                            
                            </div>
                            <a href="http://matthewchan.io" target="_blank" rel="noreferrer">
                                    <img src="/qr_code.png" alt="NFT mint QR code" className="animated-image border border-solid border-black mx-auto w-3/4"/>
                            </a>
                            <div className="flex flex-col w-full justify-center align-center text-center mx-auto">
                                <h1 className="my-4 text-4xl text-white font-bold leading-tight border-0" style={{"textShadow":"4px 4px 0 #221f20, 1px -1px 0 #221f20, -1px -1px 0 #221f20, -1px 1px 0 #221f20"}}> 🔥 CLICK OR SCAN 🔥</h1>                            
                            </div>                            
                        </div>
                    </div>
                </div> */}
                </div>
                <div className="flex flex-wrap">
                    <div className="flex flex-wrap md:flex-nowrap lg:flex-nowrap w-full md:w-[70%] lg:w-[70%]">
                        <div className="m-5 w-full p-2 md:p-8 lg:p-8 border border-solid border-black rounded-3xl shadow-custom drop-shadow-lg shadow-black bg-[#f5fffa]">
                            <div className="flex flex-wrap flex-col items-center md:flex-row">
                                <div className="flex flex-col w-full justify-center items-start text-center md:text-left">
                                    <h1 className="my-4 text-3xl lg:text-4xl font-bold leading-tight border-0">Recent Projects</h1>
                                </div>
                                <ProjectCardContainer projectItems={projects} />
                            </div>
                            <div className="mt-2 w-full">
                                <NavLink to="/project">
                                    <button className="animated-image text-clip border border-solid border-black bg-purple-500 hover:bg-purple-600 p-5 font-bold text-3xl text-white inline-flex justify-center items-center space-x-2 rounded-3xl w-full">
                                        MORE PROJECTS
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                                            <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </NavLink>
                            </div>

                        </div>
                    </div>

                    <div className="flex flex-wrap md:flex-nowrap lg:flex-nowrap w-full md:w-[30%] lg:w-[30%]">
                        <div className="flex flex-col">
                            <div className="flex m-5  p-3 md:p-8 lg:p-8 border border-solid border-black rounded-3xl shadow-custom drop-shadow-lg shadow-black bg-[#f5fffa]">
                                <div className="container mx-auto flex flex-wrap flex-col items-center md:flex-row">
                                    <div className="flex flex-col w-full justify-center items-start text-center md:text-left">
                                        <h1 className="my-4 text-3xl lg:text-4xl font-bold leading-tight border-0">Recent Blog Posts</h1>
                                    </div>
                                    <BlogPostList blogItems={blogs} />
                                    <div className="mt-5 w-full">
                                        <NavLink to="/blog">
                                            <button className="animated-image text-clip border border-solid border-black bg-orange-400 hover:bg-orange-500 p-5 font-bold text-3xl text-white inline-flex justify-center items-center space-x-2 rounded-3xl w-full">
                                                MORE POSTS
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                                                    <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>


                            <div className="flex flex-1 flex-wrap md:flex-nowrap lg:flex-nowrap w-full">
                                <div className="m-5 w-full p-3 md:p-8 lg:p-8 border border-solid border-black rounded-3xl shadow-custom drop-shadow-lg shadow-black bg-[#f5fffa]">
                                    <div className="flex flex-col w-full h-full text-left">
                                        <h1 className="flex my-4 text-3xl lg:text-4xl font-bold leading-tight">Want to work together?</h1>
                                        <div className="text-2xl">
                                            {/* <h3 className="text-2xl"><b>Status 🟢:</b> Looking for work</h3> */}
                                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

                                        </div>
                                        <div className="flex w-full h-full flex-col-reverse	">
                                            <NavLink to="/contact" className="w-full">
                                                <button className="animated-image text-clip border border-solid border-black bg-green-500 hover:bg-green-600 p-5 font-bold text-3xl text-white inline-flex justify-center items-center space-x-2 rounded-3xl w-full">
                                                    CONTACT ME!
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