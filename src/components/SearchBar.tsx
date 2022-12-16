import axios from "axios";
import _ from "lodash";
import React, {useCallback, useMemo, useState} from "react"

interface SearchBarProps {
    search: string;
    endpoint: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>
    setPage: React.Dispatch<React.SetStateAction<number>>
    setHasNextPage: React.Dispatch<React.SetStateAction<boolean>>
    setData: React.Dispatch<React.SetStateAction<any>>

}
const SearchBar = ({search, endpoint, setSearch, setPage, setHasNextPage, setData}: SearchBarProps): JSX.Element => {
    const fetchSearch = async (searchParam: string): Promise<void> => {
        try {
            let response;
            let data;
            if (searchParam.length > 0) {
                response = await axios.get(`${endpoint}?page=1&search=${searchParam}`);
            } else {
                response = await axios.get(`${endpoint}?page=1`);
            }

            data = response.data
            setData(data)
            setPage(1)
            setHasNextPage(true)

        } catch (error) {
            console.log("error calling fetchSearch():", error)
        }
    }

    const onChangeHandlerSearch = (event: React.ChangeEvent<EventTarget>) => {const target = event.target as HTMLTextAreaElement; 
        setSearch(target.value)
        debouncedHandlerSearch(target.value)
    };
    const handleDebounce = (search: string) => {
        fetchSearch(search)
    }
    const debouncedHandlerSearch = useCallback(_.debounce(handleDebounce, 500), [search]);

    return (
        <>
            <form action={""} name="search" className="flex flex-row space-x-5"> 
                <div>
                    <input minLength={0} maxLength={10} type="text" placeholder="Search..." onChange={onChangeHandlerSearch} value={search} className="animated-input border-2 border-black px-2 py-2 text-black text-md relative bg-white focus:outline-none w-full"></input>
                </div>
                <div>
                </div>
            </form>
        </>
    )
}

export default SearchBar;