
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
            <div className="lg:flex flex-wrap flex-row mt-4 bg-[#F9F5FE] border-black border-solid border-2 rounded-lg animated-image h-full lg:max-h-[350px]">
                <div className="flex w-full lg:w-1/2 p-5 md:h-[200px] lg:h-[400px] lg:max-h-[350px]">
                    <img className="h-full w-full object-fill border-black border-solid border rounded-lg" src={`${previewImg}`} alt={`${title} preview`}></img></div>
                <div className="p-5 w-full lg:w-1/2">
                    <div className="pb-3">
                        <h1 className="text-3xl font-bold text-black ">{title}</h1>
                    </div>
                    <div>
                    <h3 className="text-lg font-italic text-black ">{formatedDate}</h3>
                    </div>
                    <div>
                        <p className="text-lg text-black max-h-[250px]">{description}</p>
                    </div>
                </div>
            </div>
        </a>
    )
}
export default ProjectPreviewCard;