import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import userImage from '../assets/user-icon.png'
import { IoSearchOutline } from 'react-icons/io5'
import { navigation } from '../constant/navigation'

function Header(): React.ReactElement {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState<string>("");

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('query') || ""
        setSearchInput(query)
    }, [location.search])

    useEffect(() => {
        if(searchInput){
            navigate(`/search?query=${searchInput}`);
        }
    }, [searchInput]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        navigate(`/search?query=${searchInput}`);
    }

    return (
        <header className='fixed top-0 w-full h-16 bg-black opacity-75 z-50'>
            <div className='container mx-auto px-2] flex items-center h-full'>
                <Link to="/" className='ml-5'>
                    <img src={logo} alt="Logo" />
                </Link>

                <nav className='hidden lg:flex items-center ml-10'>
                    {
                        navigation.map((nav, index) => (
                            <div key={index}>
                                <NavLink to={nav.href} className={({ isActive }) => isActive ? "px-2 text-neutral-100" : "px-2 hover:text-neutral-100"}>
                                    {nav.label}
                                </NavLink>
                            </div>
                        ))
                    }
                </nav>

                <div className='ml-auto flex items-center gap-4 mr-5'>
                    <form className='flex items-center gap-2' onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder='search here......'
                            className='bg-transparent px-4 py-1 outline-none border-none hidden lg:block'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
                            value={searchInput}
                        />
                        <button className='text-2xl text-white'>
                            <IoSearchOutline size={24} className="text-neutral-100 cursor-pointer hover:scale-110 transition-all" />
                        </button>
                    </form>
                    <div className='cursor-pointer active:scale-50 transition-all'>
                        <img src={userImage} alt="User Profile" className="w-10 rounded-full h-full" />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header