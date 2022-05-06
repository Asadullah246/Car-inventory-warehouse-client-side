import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./ItemDetails.css"

const ItemDetails = () => {
    const [cars, setCars] = useState([]);
    const [page, setPage] = useState(0)
    const [count, setCount] = useState(0)
    const [number, setNumber] = useState(5)
    const [error, setError]=useState("")
    const navigate = useNavigate()
    const [loading, setLoading]=useState("Loading data...")
    useEffect(() => {
        axios.get(`https://fast-temple-34743.herokuapp.com/cars?page=${page}&number=${number}`)
            .then(response => {
                setCars(response.data.data)
                setCount(response.data.count)
                setLoading("")
            })
            .then(err => {
               setError(err) 
               setLoading("")
            })
    }, [page, number])

    const handleDelete = id => {
        axios.delete(`https://fast-temple-34743.herokuapp.com/cars/${id}`)
            .then(res => {

                setCars(cars.filter(car => car._id !== id))
            })
            .then(err2 => {
                setError(err2)
            })
    }

    return (
        <div>
            <h1 className='text-center font-bold text-2xl mt-6'>MANAGE ALL ITEMS</h1>

            <p className='mt-8 mb-8 text-xl font-bold text-blue-600'>{loading} </p>


            <p className='mt-12 mb-12'>{error} </p>
            <table className='table-auto mx-auto mt-8 w-11/12'>
                <thead>
                    <tr>
                        <th className='break-all' >Image</th>
                        <th className='break-all'>Name</th>
                        <th className='break-all'>Price</th>
                        <th className='break-all'>Quantity</th>
                        <th className='break-all'>Supplier Name</th>
                        <th className='desc'>Description</th>
                        <th className='break-all'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cars.map(car => {
                            return (
                                <tr>
                                    <td className='break-all'><img className='tableImage' src={car.image} alt="" /></td>
                                    <td className='break-all'> {car.name} </td>
                                    <td className='pr-6 itemPrice break-all'>{car.price}$ </td>
                                    <td className='break-all'>{car.quantity} </td>
                                    <td className='break-all'>{car.supplierName} </td>
                                    <td className='desc'>{car.shortDesc} </td>
                                    <td className='break-all'><button onClick={() => handleDelete(car._id)} className="deleteBtn">delete</button></td>
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