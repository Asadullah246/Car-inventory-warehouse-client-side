import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../Firebase.init';
import "./Navber.css"

const Navber = () => {
    const [navbarOpen, setNavbarOpen] = React.useState(false);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const signOut = e => {
        e.preventDefault();
        if (user) {
            if (window.confirm('You will be signed out. Are you sure?')) {
                auth.signOut();
                navigate('/login');
            }

        }
        else {
            navigate("/login");
        }
    }

    return (
        <div>
        
            <nav className="relative flex flex-wrap items-center justify-between px-2  bg-pink-500 ">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <Link to="/" className=' navSiteName text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white'>CAR<span>STORAGE</span></Link>

                        <button
                            className="text-white cursor-pointer text-xl leading-none px-1 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                            type="button"
                            onClick={() => setNavbarOpen(!navbarOpen)}
                        >MENU</button>
                    </div>
                    <div
                        className={
                            "lg:flex flex-grow items-center" +
                            (navbarOpen ? " flex" : " hidden")
                        }
                        id="example-navbar-danger"
                    >
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                           
                            <li className="nav-item">
                                <Link to="/myitem" className='px-3 py-2 flex items-center text-base uppercase font-bold leading-snug text-white hover:opacity-75'>{user ? "My Item" : ""} </Link>

                            </li>
                            <li className="nav-item">
                                <Link to="/add-item" className='px-3 py-2 flex items-center text-base uppercase font-bold leading-snug text-white hover:opacity-75'>{user ? "add item" : ""}</Link>

                            </li>
                            <li className="nav-item">
                                <Link to="/item-details" className="px-3 py-2 flex items-center text-base uppercase font-bold leading-snug text-white hover:opacity-75">{user ? "Manage Item" : ""} </Link>

                            </li>
                            <li className="nav-item">
                                <Link to="/blogs" className='px-3 py-2 flex items-center text-base uppercase font-bold leading-snug text-white hover:opacity-75 '>blogs</Link>

                            </li>
                            <li className="nav-item">
                                <button className=" userButton px-3 py-2 ml-2 flex items-center text-base uppercase font-bold leading-snug text-white hover:opacity-75"  onClick={signOut} >{user ? `${user.displayName ? user.displayName.slice(0, 4) : "user"}` : "Login"} </button>

                            </li>
                         
                        </ul>
                    </div>
                </div>
            </nav>

        </div>



    );
};

export default Navber;