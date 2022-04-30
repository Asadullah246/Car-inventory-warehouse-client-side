import React from 'react';
import { Link } from 'react-router-dom';
import "./Navber.css"

const Navber = () => {
    return (
        <div>
            <nav className='navbar-section'>
               <div> <Link to="/">Home</Link></div>
             <div> 
                   <Link to="/login">login</Link>
                <Link to="/item">My Item</Link>
                <Link to="/blogs">blogs</Link>
                <Link to="/signOut">sign out</Link>
                <Link to="/add-item">add item</Link>
               
                </div>
            </nav>
           
        </div>
    );
};

export default Navber;