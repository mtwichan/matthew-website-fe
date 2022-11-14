import { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = (): JSX.Element => {
    const activeItemCSS: string = "block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-500 md:p-0";
    const itemCSS: string = "block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0";
    const [hideMenu, setHideMenu] = useState(true)

    const onClickHandler = (event: React.ChangeEvent<EventTarget>) => {
        event.preventDefault();
        setHideMenu(!hideMenu);
    }
    
    return (
        <>
            <nav className="bg-gray-900 border-gray-200 px-2 sm:px-4 py-2.5 z-10">
                <div className="container pt-3 w-4/5 md:w-3/5 flex flex-row flex-wrap justify-end md:justify-center items-center mx-auto text-lg">
                    <button onClick={onClickHandler}type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    </button>
                    <div className={hideMenu ? "hidden w-full md:block md:w-auto" : "w-full md:block md:w-auto"}>
                        <ul className="flex flex-col mt-4 sm:w-full md:justify-evenly md:flex-row md:space-x-8 md:mt-0 md:text-md md:font-medium">
                            <li>
                                <NavLink to="" className={({ isActive }) => isActive ? activeItemCSS : itemCSS}>Home 🏠</NavLink>
                            </li>
                            <li>
                                <NavLink to="/project" className={({ isActive }) => isActive ? activeItemCSS : itemCSS}>Projects 🚀</NavLink>
                            </li>
                            <li>
                                <NavLink to="/blog" className={({ isActive }) => isActive ? activeItemCSS : itemCSS}>Blog 📖</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" className={({ isActive }) => isActive ? activeItemCSS : itemCSS}>Contact Me ✨</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                
            </nav>
        </>
    )
}

export default Header;