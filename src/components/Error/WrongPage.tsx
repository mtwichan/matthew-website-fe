const WrongPage = (): JSX.Element => {
    return (
        <div className='flex container justify-center mt-5 mb-5'>
            <div className='flex flex-col p-5 w-4/12 border border-black border-solid border-2'>
                <h1 className='text-center text-4xl underline font-bold'>404</h1>
                <h2 className='text-center text-2xl mt-5 mb-5'>This page does not exist ...</h2>
                <img src='/404.jpeg' alt="404 dog"></img>
            </div>
        </div>
    )
}

export default WrongPage;