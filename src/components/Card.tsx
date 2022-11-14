interface CardProps {
    children: JSX.Element
}
const Card = ({children}: CardProps): JSX.Element => {
    return (
        <div className="m-5 sm:w-full md:w-2/3 lg:w-3/4 p-3 md:p-8 lg:p-8 border border-solid border-black rounded-3xl shadow-custom drop-shadow-lg shadow-black z-100 bg-[#f5fffa]"> 
            {children}
        </div>
    )
}
export default Card;