import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../Firebase.init';
import "./Navber.css"

const Navber = () => {
    const [user] = useAuthState(auth);
    const navigate=useNavigate();

    const signOut=e=>{
        e.preventDefault();
        if(user){
            if (window.confirm('You will be signed out. Are you sure?')) {
                auth.signOut();
                navigate('/login');
            }
          
        }
        else{
           navigate("/login") ;
        }
    }
    console.log(user);
    return (
        <div>
            <nav className='navbar-section'>
               <div> <Link to="/" className='navSiteName'>CAR<span>STORAGE</span></Link></div>
             <div> 
                <Link to="/item">{user? "My Item": ""} </Link>
                <Link to="/blogs">blogs</Link>
                
                <Link to="/add-item">{user?"add item": ""}</Link>
                <Link to="/item-details">{user? "Manage Item": ""} </Link>
                <button className={user? "bg-lime-600 text-white userButton": "loginButton"} onClick={signOut} >{user?`${user.displayName?user.displayName.slice(0, 4): "user"}` : "Login"} </button>
                </div>
            </nav>
           
        </div>
    ); 
};

export default Navber;