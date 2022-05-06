import React from 'react';
import "./NotFound.css"
import logo from "../../images/notFound.png"
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate=useNavigate()
    const notFound=e=>{
        e.preventDefault();
        navigate('/')
       
    }
    return (
        <div>
            <div className='mt-28'>
                <p> <span className='oops text-2xl font-bold'>Oops!</span> You are looking for something <br /> that doesn't actually exists</p>
                <img className='text-center mx-auto' src={logo} alt="" />
                <button onClick={notFound} className='notFoundBtn'>Go back to home</button>
            </div>
            
        </div>
    );
};

export default NotFound;