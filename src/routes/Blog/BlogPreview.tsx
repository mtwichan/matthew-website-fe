import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import BlogPreviewRow from "../../components/Blog/BlogPreviewRow";
import SearchBar from "../../components/SearchBar";
import { BACKEND_BLOG_API_URL } from "../../constants";

interface Post {
    preview_img: string;
    title: string;
    created_on: string;
    description: string;
    slug: string;
}

const BLOG_MARQUEE = (
    <>
        <li>✦</li>
        <li>BLOG</li>
        <li>✦</li>
        <li>BLOG</li>
        <li>✦</li>
        <li>BLOG</li>
        <li>✦</li>
        <li>BLOG</li>
        <li>✦</li>
        <li>BLOG</li>
        <li>✦</li>
        <li>BLOG</li>
        <li>✦</li>
        <li>BLOG</li>
        <li>✦</li>
        <li>BLOG</li>
        <li>✦</li>
        <li>BLOG</li>
        <li>✦</li>
        <li>BLOG</li>
        <li>✦</li>
        <li>BLOG</li>
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
    return { data, hasNextPage, setHasNextPage, setData }
}

const BlogPreview = (): JSX.Element => {
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState("");
    const { data, hasNextPage, setHasNextPage, setData } = useFetchPaginated(BACKEND_BLOG_API_URL, page, search);
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

        if (loaderRef.current) { observer.observe(loaderRef.current) }
    }, [])
    const renderBlogPreviews = (): Array<JSX.Element> => {
        return data.map((post: Post, idx: number) => {
            return <BlogPreviewRow key={idx} previewImg={post.preview_img} title={post.title} date={post.created_on} description={post.description} slug={post.slug} />
        })
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Matthew Chan - Blog Page</title>
                <meta name="description" content="Matthew Chan - Blog page" />
            </Helmet>
            <div className="w-full bg-[#F4ECE0]">
                <div className="marquee bg-[#FFAB48] p-2">
                    <ul className="marquee-content font-bold text-4xl text-white">
                        {BLOG_MARQUEE}
                    </ul>
                    <ul aria-hidden="true" className="marquee-content font-bold text-4xl text-white">
                        {BLOG_MARQUEE}
                    </ul>
                </div>
                <div className="mx-4 md:mx-16 lg:mx-64 my-6">
                    <SearchBar endpoint={BACKEND_BLOG_API_URL} search={search} setHasNextPage={setHasNextPage} setPage={setPage} setSearch={setSearch} setData={setData} />
                    {renderBlogPreviews()}
                </div>
                <div ref={loaderRef} />
            </div>
        </>
    )
}
export default BlogPreview;