import React, { useEffect, useState } from 'react';
import "./Home.css"
import logo from '../../banner1.jpg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [cars, setCars]=useState([]);
    useEffect(()=>{
        axios.get('http://localhost:5000/cars')
        .then(response=>{
            setCars(response.data)
        })
    },[])
    const navigate=useNavigate();
    const handleUpdate=id=>{
        navigate(`/inventory/${id}`);
    }
    return (
        <div>
            <div className='banner-section'>
                
                <img src={logo} alt="" />
            </div>

            <div>this should contain some text about the inventory</div>
            <div className='cars'>
                {
                    cars.map(car=>{
                        return (
                            <div>
                                <h5>Name : {car.name} </h5>
                                <img src={car.image} alt="" />
                                <h5>Price : {car.price}$ </h5>
                                <h5>Quantity : {car.quantity} </h5>
                                <h5>Supplier Name : {car.supplierName} </h5>
                                <h5>Description : {car.shortDesc} </h5>
                                <button onClick={()=>handleUpdate(car._id)}>update</button>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    );
};

export default Home;