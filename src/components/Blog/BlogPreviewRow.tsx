interface BlogPreviewRowProps {
    previewImg: string;
    title: string;
    date: string;
    description: string;
    slug: string;
}
const BlogPreviewRow = ({previewImg, title, date, description, slug}: BlogPreviewRowProps) => {    
    const formatedDate = new Date(date).toLocaleDateString("en-us", { year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric"});
    return (
        <a href={`/blog/${slug}`}>
            <div className="md:flex lg:flex mt-4 bg-[#FEFBF5] border-black border-solid border-2 animated-image rounded-lg">
                {/* <div className="p-6 md:w-1/2 lg:w-1/4 sm:h-[150px] md:h-[200px] lg:h-[225px]">
                    <img className="h-full w-full object-fill border-black border-solid border rounded-lg" src={`${previewImg}`} alt={`${title} preview`}></img></div> */}
                <div>
                <div className="p-6"> 
                        <div className="pb-3">
                                <h1 className="text-3xl font-bold text-black">{title}</h1>
                        </div>
                        <div>
                            <h3 className="text-lg font-italic text-black">{formatedDate}</h3>
                        </div>
                        <div>
                            <p className="text-lg text-black">{description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    )
}

export default BlogPreviewRow;