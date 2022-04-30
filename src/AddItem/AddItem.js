import axios from 'axios';
import React, { useState } from 'react';
import "./AddItem.css"

const AddItem = () => {
    const [success, setSuccess]=useState("");
    const [error, setError]=useState("")

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
            shortDesc: e.target.desc.value
        }
        axios.post('http://localhost:5000/newCars', data)
        .then(response=>
            setSuccess("successfully added"))
        .then(error=>setError(error?.message))

    }
    return (
        <div>
            <div>
                <form onSubmit={addItem} action="">
                    <input type="text" name="name" id="" placeholder='name' /><br />
                    <input type="number" name="price" id="" placeholder='price' /><br />
                    <input type="number" name="quantity" id=""placeholder='quantity' /><br />
                    <input type="text" name="supplierName" id="" placeholder='supplier name' /><br />
                    <input type="url" name="imageLink" id="" placeholder='url' /><br />
                    {/* for temporary  */}
                    <input type="email" name="email" id="" placeholder='email' /><br />
                   
                    <textarea id="" name="desc" placeholder='description'/>
                    <p>{success}  {error}</p> 
                    <button>Add item</button>
                </form>
            </div>
        </div>
    );
};

export default AddItem;