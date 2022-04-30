import axios from 'axios';
import React from 'react';
import "./AddItem.css"

const AddItem = () => {

    const addItem=e=>{
        e.preventDefault();
        const data={
            name: e.target.name.value,
            price: e.target.price.value,
            quantity: e.target.quantity.value,
            supplierName: e.target.supplierName.value,
            image: e.target.imageLink.value,
            email: e.target.name.value
        }
        axios.post()

    }
    return (
        <div>
            <div>
                <form onSubmit={addItem} action="">
                    <input type="text" name="name" id="" /><br />
                    <input type="text" name="price" id="" /><br />
                    <input type="number" name="quantity" id="" /><br />
                    <input type="text" name="supplierName" id="" /><br />
                    <input type="url" name="imageLink" id="" /><br />
                    <p></p>
                    <button>Add item</button>
                </form>
            </div>
        </div>
    );
};

export default AddItem;