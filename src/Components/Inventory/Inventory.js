import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./Inventory.css"

const Inventory = () => {
    const [car, setCar] = useState([])
    const [quantity, setQuantity] = useState(0)
    const [error, setError] = useState('')
    const [numberError, setNumberError] = useState('')
    const { id } = useParams();
    const [loading, setLoading]=useState("Loading data...")
    useEffect(() => {
        axios.get(`https://fast-temple-34743.herokuapp.com/cars/${id}`)
            .then(response => {
                setCar(response.data);
                setQuantity(response.data.quantity)
                setLoading("")

            })
            .catch(err => {
                setError(err);
                setLoading("")
            })
    }, [id, setCar])

    const updateQuantity = e => {
        e.preventDefault();
        setError('')
        setNumberError('')

        if (quantity == 0) {
            setError("No car remaining")
            return;
        }

        const number = parseInt(quantity) - 1;
        axios.put(`https://fast-temple-34743.herokuapp.com/cars/${id}`,
            {
                quantity: number
            }
        )
            .then(response => {
                setQuantity(parseInt(quantity) - 1)
            })
            .catch(err2 => {
                setError(err2);
            })
    }
    const increaseQuantity = e => {
        e.preventDefault();
        setError("")
        setNumberError('')
        const newQuantity = e.target.carQuantity.value;
        if (newQuantity >= 0) {

            axios.put(`https://fast-temple-34743.herokuapp.com/cars/${id}`,
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
        else {
            setNumberError("Please give a valid number")
        }





    }

    return (
        <div>
              <p className='mt-8 mb-8 text-xl font-bold text-blue-600'>{loading} </p>

            <div className='w-2/4 mx-auto mb-32'>
                <img className='inventoryImage w-100 mt-32 mx-auto' src={car.image} alt="" />
                <h2 className='text-2xl mt-8 mb-4 text-left font-bold'>Name : {car.name} </h2>
                <p className='text-left font-semibold text-lg'>Price : {car.price}$ </p>
                <p className='text-left font-semibold text-lg'>Quantity : {quantity} </p>
                <p className='text-left font-semibold text-lg'>Supplier Name : {car.supplierName} </p>
                <p className='text-left font-semibold text-lg'>Description : {car.shortDesc} </p>
                <p className='text-left font-semibold text-xs'>{error} </p>
                <button onClick={updateQuantity} className="updateBtn text-lg font-bold">update</button>

                <form className='w-100' onSubmit={increaseQuantity} action="">
                    <input className='increaseInput block w-100 p-2 mt-12' type="number" name="carQuantity" id="" placeholder='Enter quantity' /><br />
                    <p>{numberError} </p>
                    <button className='increaseBtn block text-lg font-bold'>submit</button>
                </form>
            </div>



        </div>
    );
};

export default Inventory;