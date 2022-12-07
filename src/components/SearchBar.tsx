import axios from "axios";
import React, { useState } from "react"

interface SearchBarProps {
    endpoint: string;
    setFrontEnd: React.Dispatch<React.SetStateAction<never[]>>
}
const SearchBar = ({endpoint, setFrontEnd}: SearchBarProps): JSX.Element => {
    const [search, setSearch] = useState("")

    const fetchSearch = async (searchParam: string): Promise<void> => {
        try {
            const response = await axios.get(`${endpoint}?search=${searchParam}`);
            const data = response.data;
            if (data.length !== 0) {
                await setFrontEnd(data)
            }            
        } catch (error) {
            console.log("error calling fetchSearch():", error)
        }
    }
    const onSubmitHandlerSearch = (event: React.ChangeEvent<EventTarget>) => {
        event.preventDefault();
        fetchSearch(search)
        setSearch("")
    }
    const onChangeHandlerSearch = (event: React.ChangeEvent<EventTarget>) => { const target = event.target as HTMLTextAreaElement; setSearch(target.value) };

    return (
        <>
            <form action={""} onSubmit={onSubmitHandlerSearch} name="search" className="flex flex-row space-x-5"> 
                <div>
                    <input minLength={0} maxLength={10} type="text" onChange={onChangeHandlerSearch} value={search} className="animated-input border-2 border-black px-2 py-2 text-black text-md relative bg-white focus:outline-none w-full"></input>
                </div>
                <div>
                <button className="animated-image bg-[#F3F4FF] font-bold py-2 px-5 rounded-2xl"><p className="text-black text-xl">Search</p></button>
                </div>
            </form>
        </>
    )
}

export default SearchBar;