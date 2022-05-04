import axios from 'axios';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../Firebase.init';
import "./AddItem.css"

const AddItem = () => {
    const [success, setSuccess]=useState("");
    const [error, setError]=useState("")
    const [user]=useAuthState(auth)

    const addItem=e=>{
        e.preventDefault();
        setError('')
        setSuccess("")
        const data={
            name: e.target.name.value,
            price: e.target.price.value,
            quantity: e.target.quantity.value,
            supplierName: e.target.supplierName.value,
            image: e.target.imageLink.value,
            email: e.target.email.value,
            shortDesc: e.target.desc.value,
            uid: user.uid
        }
        axios.post('http://localhost:5000/newCars', data)
        .then(response=>
            setSuccess("successfully added"))
        .then(error=>setError(error?.message))

    }
    return (
        <div>
            <div className='addItemFormDiv'>
                <h1 className='font-bold text-2xl mt-6 mb-4'>ADD NEW ITEM</h1>
                <form onSubmit={addItem} action="">
                    <input className='inputField pl-1 bg-orange-50' type="text" name="name" id="" placeholder='name' required /><br />
                    <input className='inputField pl-1 bg-orange-50' type="number" name="price" id="" placeholder='price' required/><br />
                    <input className='inputField pl-1 bg-orange-50' type="number" name="quantity" id=""placeholder='quantity' required/><br />
                    <input className='inputField pl-1 bg-orange-50' type="text" name="supplierName" id="" placeholder='supplier name'required /><br />
                    <input className='inputField pl-1 bg-orange-50' type="url" name="imageLink" id="" placeholder='url' required/><br />
                    {/* for temporary  */}
                    <input className='inputField pl-1 bg-orange-50' type="email" name="email" id="" placeholder='email' required/><br />
                   
                    <textarea className='inputField pl-1 bg-orange-50' id="" name="desc" placeholder='description' required/>
                    <p>{success}  {error}</p> 
                    <button className='addButton mt-3 text-lg pt-1 pb-1'>Add item</button>
                </form>
            </div>
        </div>
    );
};

export default AddItem;