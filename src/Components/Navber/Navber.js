import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../Firebase.init';
import "./Navber.css"

const Navber = () => {
    const [user] = useAuthState(auth);

    const signOut=e=>{
        e.preventDefault();
        if(user){
            auth.signOut()
        }
    }
    console.log(user);
    return (
        <div>
            <nav className='navbar-section'>
               <div> <Link to="/">Home</Link></div>
             <div> 
                   <Link to="/login">login</Link>
                <Link to="/item">My Item</Link>
                <Link to="/blogs">blogs</Link>
                <button className='signOut-btn' onClick={signOut} >{user? "signout": "logged in"} </button>
                <Link to="/add-item">add item</Link>
                <Link to="/item-details">Details</Link>
               
                </div>
            </nav>
           
        </div>
    );
};

export default Navber;