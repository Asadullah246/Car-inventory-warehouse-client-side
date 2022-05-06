import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../Firebase.init';
import Loading from '../Loading';
import "./MyItem.css"

const MyItem = () => {
    const [user, loading] = useAuthState(auth)
    const [mycars, setMycars] = useState([])
    const [error, setError] = useState("")
    const[deleteError, setDeleteError]=useState("")
    const navigate=useNavigate()
    const [loading2, setLoading2]=useState("Loading data...")


    useEffect(() => {
        if (loading) {
            <Loading></Loading>
        }
    }, [loading])
    let userToken = localStorage.getItem("accessToken")
    useEffect(() => {
        // /${user.uid}

        axios.get(`https://fast-temple-34743.herokuapp.com/mycars`,
            {
                headers: {
                    email: user.email,
                    token: userToken
                }
            })
            .then(response => {
                if (response.data.success) {
                    setError(" ERROR 403 : No data found")
                    setLoading2("")
                }
                else if (response.data.error) {
                    setError(" ERROR 401: Unauthorized access")
                    setLoading2("")
                    auth.signOut()
                    navigate("/login")
                    window.alert("You are not authorized to access this page")
                }
                else {
                    setMycars(response.data)
                    setError("")
                    setLoading2("")
                }

            })
            .catch(err => {
                setError(err);
                setLoading2("")
            })

    }, [user.uid, user.email, userToken, navigate])

    const handleDelete = id => {
        if(window.confirm("Are you sure you want to delete this item?")){
            axios.delete(`https://fast-temple-34743.herokuapp.com/cars/${id}`)
            .then(res => {

                setMycars(mycars.filter(car => car._id !== id))
            })
            .then(err2 => {
                setDeleteError(err2);
            })
        }
      
    }
    const addItemButtonClick=()=>{
        navigate("/add-item")
    }

    return (
        <div>
            <div className=' mt-24 mb-20'>
                <h2 className='font-bold text-3xl'>ALL MY ITEMS</h2>
            </div>
            <p className='mt-8 mb-8 text-xl font-bold text-blue-600'>{loading2} </p>
            <p className='font-bold text-3xl text-red-500 mt-30 mb-20'>{error} </p>
            <p className='font-bold text-3xl text-red-500 mt-30 mb-20'>{deleteError} </p>

            <div>
                <table className='table-auto mx-auto mt-8 w-11/12'>
                    {
                        error ? null : <>
                            <thead>
                                <tr>
                                    <th className='break-all' >Image</th>
                                    <th className='break-all'>Name</th>
                                    <th className='break-all'>Price</th>
                                    <th className='break-all'>Quantity</th>
                                    <th className='break-all'>Supplier Name</th>
                                    <th className='break-all desc'>Description</th>
                                    <th className='break-all'>Delete</th>
                                </tr>
                            </thead>
                        </>
                    }

                    <tbody>

                        {
                            mycars.map(car => {
                                return (
                                    <tr>
                                        <td className='break-all'><img className='tableImage' src={car.image} alt="" /> </td>
                                        <td className='break-all'> {car.name}</td>
                                        <td className='break-all pr-6 itemPrice'>{car.price}$ </td>
                                        <td className='break-all'>{car.quantity} </td>
                                        <td className='break-all'>{car.supplierName} </td>
                                        <td className='break-all desc'>{car.shortDesc} </td>
                                        <td className='break-all'><button onClick={() => handleDelete(car._id)} className="deleteBtn">delete</button></td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>

            </div>
            <button onClick={addItemButtonClick} className="font-bold addItemButton">Add Item</button>
        </div>

    );
};

export default MyItem;
