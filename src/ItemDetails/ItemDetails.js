import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./ItemDetails.css"

const ItemDetails = () => {
    const [cars, setCars]=useState([]);
    const navigate=useNavigate()
    useEffect( ()=>{
        axios.get('http://localhost:5000/cars')
        .then(response=>setCars(response.data))
        .then(error=>{
            console.log(error);
        })
    },[])

    const handleDelete= id=>{
        // event.preventDefault();
        
        console.log(id); 
        axios.delete(`http://localhost:5000/cars/${id}`)
        .then(res=>{
            console.log(res);
            setCars(cars.filter(car=>car._id!== id))
        })
        .then(error=>{
            console.log(error);
        })
    }
    return (
        <div>
             <div>
             {
                  cars.map(car=>{
                        return (
                            <div className='singleCar'>
                                <img src={car.image} alt="" />
                                <h5>Name : {car.name} </h5>
                                <h5>Price : {car.price}$ </h5>
                                <h5>Quantity : {car.quantity} </h5>
                                <h5>Supplier Name : {car.supplierName} </h5>
                                <h5>Description : {car.shortDesc} </h5>
                                <button onClick={()=>handleDelete(car._id)}>delete</button>
                            </div>
                        )
                    })
                }
             </div>
             <div>
                 <button onClick={()=>navigate('/add-item')}>Add New Item</button>
             </div>
            
        </div>
    );
};

export default ItemDetails;