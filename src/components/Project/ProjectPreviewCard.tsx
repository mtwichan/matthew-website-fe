
interface ProjectPreviewCardProps {
    previewImg: string;
    title: string;
    date: string;
    description: string;
    slug: string;
}
const ProjectPreviewCard = ({previewImg, title, date, description, slug}: ProjectPreviewCardProps): JSX.Element => {
    const formatedDate = new Date(date).toLocaleDateString("en-us", { year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric"});
    return (
        <a href={`/project/${slug}`}>            
            <div className="flex mt-4 bg-purple-200 hover:bg-purple-300 border-black border-solid border-2 shadow-custom drop-shadow-lg shadow-black">
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
export default ProjectPreviewCard;