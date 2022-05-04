import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./ItemDetails.css"

const ItemDetails = () => {
    const [cars, setCars] = useState([]);
    const [page, setPage] = useState(0)
    const [count, setCount] = useState(0)
    const [number, setNumber] = useState(5)
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`http://localhost:5000/cars?page=${page}&number=${number}`)
            .then(response => {
                setCars(response.data.data)
                setCount(response.data.count)
            })
            .then(error => {
                // console.log(error);
            })
    }, [page, number])

    const handleDelete = id => {
        // event.preventDefault();

        console.log(id);
        axios.delete(`http://localhost:5000/cars/${id}`)
            .then(res => {
                // console.log(res);
                setCars(cars.filter(car => car._id !== id))
            })
            .then(error => {
                console.log(error);
            })
    }
    console.log(cars);
    return (
        <div>
            <h1 className='text-center font-bold text-2xl mt-6'>MANAGE ALL ITEMS</h1>
            <table className='table-auto mx-auto mt-8 w-11/12'>
                <thead>
                    <tr>
                        <th >Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Supplier Name</th>
                        <th>Description</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cars.map(car => {
                            return (
                                <tr>
                                    <td>                                <img className='tableImage' src={car.image} alt="" />
                                    </td>                                <td> {car.name} </td>
                                    <td className='pr-6'>{car.price}$ </td>
                                    <td>{car.quantity} </td>
                                    <td>{car.supplierName} </td>
                                    <td>{car.shortDesc} </td>
                                    <td><button onClick={() => handleDelete(car._id)} className="deleteBtn">delete</button></td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>

           <div className='text-right pagination'>
           {
                [...Array(Math.ceil(count / number)).keys()].map(pageNumber => <button onClick={() => setPage(pageNumber)} className={page === pageNumber ? "selected pageBtn" : " pageBtn"} >{pageNumber + 1} </button>)
            }
            <select className='font-normal ' name="" id="" onChange={e => setNumber(e.target.value)}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
            </select>
           </div>
            <div className='mt-7 mb-10'>
                <button className='ItemAddButton text-base' onClick={() => navigate('/add-item')}>Add New Item</button>
            </div>

        </div>
    );
};

export default ItemDetails;