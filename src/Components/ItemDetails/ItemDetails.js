import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./ItemDetails.css"

const ItemDetails = () => {
    const [cars, setCars]=useState([]);
    const [page, setPage]=useState(0)
    const [count, setCount]=useState(0)
    const [number, setNumber]=useState(5)
    const navigate=useNavigate()
    useEffect( ()=>{
        axios.get(`http://localhost:5000/cars?page=${page}&number=${number}`)
        .then(response=>{
            setCars(response.data.data)
            setCount(response.data.count)
        })
        .then(error=>{
            // console.log(error);
        })
    },[page, number])

    const handleDelete= id=>{
        // event.preventDefault();
        
        console.log(id); 
        axios.delete(`http://localhost:5000/cars/${id}`)
        .then(res=>{
            // console.log(res);
            setCars(cars.filter(car=>car._id!== id))
        })
        .then(error=>{
            console.log(error);
        })
    }
    console.log(cars);
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
             {
                 [...Array(Math.ceil(count/number)).keys()].map(pageNumber=><button onClick={()=>setPage(pageNumber)} className={page===pageNumber?"selected": ""} >{pageNumber +1} </button>)
             }
             <select name="" id="" onChange={e=>setNumber(e.target.value)}>
                 <option value="5">5</option>
                 <option value="10">10</option>
                 <option value="15">15</option>
             </select>
             <div>
                 <button onClick={()=>navigate('/add-item')}>Add New Item</button>
             </div>
            
        </div>
    );
};

export default ItemDetails;