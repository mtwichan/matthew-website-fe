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
            <div className="flex mt-4 bg-orange-100 hover:bg-orange-200 border-black border-solid border-2 shadow-custom drop-shadow-lg shadow-black">
                <div className="pr-4 sm:h-[100px] md:h-[150px] lg:h-[175px]">
                    <img className="h-full w-full object-contain" src={`${previewImg}`} alt={`${title} preview`}></img></div>
                <div>
                    <div>
                        <h1 className="text-3xl font-bold">{title}</h1>
                    </div>
                    <div>
                        <h3 className="text-md font-italic">{formatedDate}</h3>
                    </div>
                    <div>
                        <p className="text-lg">{description}</p>
                    </div>
                </div>
            </div>
        </a>
    )
}

export default BlogPreviewRow;