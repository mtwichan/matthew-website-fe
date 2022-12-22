
import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";

import ProjectPreviewCard from "../../components/Project/ProjectPreviewCard";
import SearchBar from "../../components/SearchBar";
import { BACKEND_PROJECT_API_URL } from "../../constants";
import { Helmet } from "react-helmet";

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
const useFetchPaginated = (url: string, page: number, search: string) => {
    const [data, setData] = useState<Array<any>>([]);
    const [hasNextPage, setHasNextPage] = useState(true)
    const fetchPaginatedData = useCallback(async (url: string, page: number) => {
        if (page === 0) {
            return
        }
        try {
            const response = await axios.get(`${url}?page=${page}&search=${search}`)
            if (response.data.length === 0) {
                setHasNextPage(false)
            } else {
                setHasNextPage(true)
            }

            const newData = [...data, ...response.data]
            setData(newData)
        } catch (error: any) {
            console.log(`error fetching ${url}?page=${page}&search=${search}: `, error)
        }
    }, [page, setHasNextPage, hasNextPage]);

    useEffect(() => {
        fetchPaginatedData(url, page)
    }, [page])
    return { data, hasNextPage, setHasNextPage, setData}
}

const ProjectPreview = (): JSX.Element => {
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState("");
    const {data, hasNextPage, setHasNextPage, setData} = useFetchPaginated(BACKEND_PROJECT_API_URL, page, search);
    const loaderRef = useRef(null)
    const hasNextPageRef = useRef(false)
    
    hasNextPageRef.current = hasNextPage;

    const handleObserver = useCallback((entries: any) => {
        const target = entries[0]

        if (target.isIntersecting && hasNextPageRef.current) {
            setPage((newPage) => newPage + 1)
        }
    }, [page, search])

    useEffect(() => {
        
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        }
    
        const observer = new IntersectionObserver(
            handleObserver,
            options
        )

        if (loaderRef.current) { observer.observe(loaderRef.current)}
    }, [])

    const renderProjectPreviews = (): Array<JSX.Element> => {
        return data.map((project: Project, idx: number) => {
            return <ProjectPreviewCard key={idx} previewImg={project.preview_img} title={project.title} date={project.created_on} description={project.description} slug={project.slug} />
        })
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Matthew Chan - Project Page</title>
                <meta name="description" content="Matthew Chan - Project page" />
            </Helmet>
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
                    <SearchBar endpoint={BACKEND_PROJECT_API_URL} search={search} setHasNextPage={setHasNextPage} setPage={setPage} setSearch={setSearch} setData={setData} />
                </div>
                <div className="md:grid lg:grid md:grid-cols-2 lg:grid-cols-2 gap-10 mx-4 md:mx-16 lg:mx-22 mt-4 mb-12">
                    {renderProjectPreviews()}
                </div>
                <div ref={loaderRef} />
            </div>
        </>
    )
}
export default ProjectPreview;