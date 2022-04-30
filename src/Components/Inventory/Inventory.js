import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./Inventory.css"

const Inventory = () => {
    const [car, setCar] = useState({})
    const [quantity, setQuantity]=useState(0)
    const [error, setError]=useState('')
    const [numberError, setNumberError]=useState('')
    const { id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:5000/cars/${id}`)
            .then(response => {
                setCar(response.data);
                setQuantity(response.data.quantity)
             
            })
            .catch(error => {
                console.log(error);
            })
    }, [id ])

    const updateQuantity=e=>{
        e.preventDefault();
        setError('')
        setNumberError('')
        
        if(quantity==0 ){
            setError("No car remaining")
            return;
        }

        
        const number=parseInt(quantity)-1;
        axios.put(`http://localhost:5000/cars/${id}`, 
       {
           quantity: number
       }
        )
        .then(response => {
            setQuantity(parseInt(quantity)-1)
        })
        .catch(error => {
            console.log(error);
        })
    }
    const increaseQuantity=e=>{
        e.preventDefault();
        setError("")
        setNumberError('')
        const newQuantity=e.target.carQuantity.value;
        console.log(newQuantity);
        if(newQuantity >=0){
            
        axios.put(`http://localhost:5000/cars/${id}`, 
       {
           quantity: newQuantity
       }
        )
        .then(response => {
            setQuantity(newQuantity)
        })
        .catch(error => {
            console.log(error);
        })
        } 
        else{
            setNumberError("Please give a valid number")
        } 

        
        
    }
  
    return (
        <div>

            <div>
                <h5>Name : {car.name} </h5>
                <img src={car.image} alt="" />
                <h5>Price : {car.price}$ </h5>
                <h5>Quantity : {quantity} </h5>
                <h5>Supplier Name : {car.supplierName} </h5>
                <h5>Description : {car.shortDesc} </h5>
                <p>{error} </p>
                <button onClick={updateQuantity}>update</button> 
            </div>
            <div>
                <form onSubmit={increaseQuantity} action="">
                    <input type="number" name="carQuantity" id="" /><br />
                    <p>{numberError} </p>
                    <button>submit</button>
                </form>
            </div>


        </div>
    );
};

export default Inventory;