const WrongPage = (): JSX.Element => {
    return (
        <div className="w-full bg-red-400">
            <div className='flex justify-center items-center'>
                <div className='flex flex-col p-5 w-3/4 md:w-1/2 lg:w-1/2 border border-black border-solid border-8 rounded-2xl bg-red-200 my-16'>
                    <h1 className='text-center text-2xl md:text-4xl lg:text-4xl font-bold'>🚨 <u>404</u> 🚨</h1>
                    <h2 className='text-center text-2xl mt-5 mb-2'>This page does not exist ... </h2>
                    <a href="/" className="text-blue-500 underline text-center text-2xl mt-2 mb-5">Come back home fren!</a>
                    <div className="flex justify-center">
                        <img src='/404.jpeg' alt="404 dog" className="w-full max-h-[400px] max-w-[400px]"></img>
                    </div>                    
                </div>
            </div>
        </div>
    )
}

export default WrongPage;