import React, { useEffect, useState } from 'react';
import "./Home.css"
import banner from "../../images/audi.png"
import icon1 from "../../images/Icons/7 (1).png"
import icon2 from "../../images/Icons/5 (2).png"
import icon3 from "../../images/Icons/4 (2).png"
import icon4 from "../../images/Icons/3 (2).png"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CountUp from 'react-countup';


const Home = () => {

    // aos usage 
    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);


    const [cars, setCars] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/someCars?limit=6')
            .then(response => {
                setCars(response.data)
            })
    }, [])
    const navigate = useNavigate();
    const handleUpdate = id => {
        navigate(`/inventory/${id}`);
    }
    return (
        <div>
            <div className='banner-section flex justify-center items-center'>
                <div data-aos="fade-right"
                    data-aos-offset="300"
                    data-aos-easing="ease-in-sine"
                    data-aos-duration="1500">
                    <h1 className='heading mb-2 text-white text-4xl'>WELCOME TO THE CARSTORAGE</h1>
                    <p className='text-2xl bold subHeading'>Find The Best Cars </p>
                </div>
                <div>
                    <img className='bannerImage md:ml-26 lg:ml-50' src={banner} alt="" data-aos="fade-left"
                        data-aos-anchor="#example-anchor"
                        data-aos-offset="500"
                        data-aos-duration="1500" />

                </div>

            </div>

            <main className='container w-10/12 m-auto'>

            <div className='text-2xl font-extrabold mt-12 mb-2  text-left ml-3.5'><h2 className='featureHeading'>LATEST <span className='featured'>FEATURED</span> CARS</h2></div>
          

            <div className='cars'>
                {
                    cars.map(car => {
                        return (
                            <div data-aos="zoom-in"
                                data-aos-duration="1000"
                                data-aos-anchor-easing='ease-in-out'className='card text-left'>
                                
                                <div className='imageSection'>
                                <img src={car.image} alt="" />
                                <p className='price font-bold text-white'>{car.price}$ </p>
                                </div>
                                <div className='ml-3'>
                                <h4 className="font-bold text-lg block mt-2 mb-2">{car.name} </h4>
                                
                                <div className='font-semibold'>
                                <p>Quantity : {car.quantity} </p>
                                <h5>Supplier Name : <span className='font-bold'> {car.supplierName}</span> </h5>
                                <p className='mb-16'>Description : {car.shortDesc} </p>
                                </div>
                                </div>
                                <button onClick={() => handleUpdate(car._id)} className="  font-bold updateButton">update</button>
                            </div>
                        )
                    })
                }

            </div>
            </main>

            <div className='mb-24'>
                <button onClick={() => navigate('/item-details')} className='manageButton'>Manage Inventory</button>
            </div>

           <div className='flex justify-evenly  text-white countSection'>
               <div>
               <img src={icon1} alt="" />
               <CountUp className='font-semibold text-4xl'  end={9500}/><span className='font-medium text-4xl'>+</span>
               <p className='font-medium text-xl mt-2'>Total <span className='countCar'>Cars</span></p>
               </div>
               <div>
               <img src={icon2} alt="" />
               <CountUp className='font-semibold text-4xl' end={9500}/><span className='font-medium text-4xl'>+</span>
               <p className='font-medium text-xl mt-2'>Varified <span className='countCar'>Users</span></p>
               </div>
               <div>
               <img src={icon3} alt="" />
               <CountUp className='font-semibold text-4xl' end={9500}/><span className='font-medium text-4xl'>+</span>
               <p className='font-medium text-xl mt-2'>Active <span className='countCar'>Users</span></p>
               </div>
               <div>
               <img src={icon4} alt="" />
               <CountUp className='font-semibold text-4xl' end={9500}/><span className='font-medium text-4xl'>+</span>
               <p className='font-medium text-xl mt-2'>Featured <span className='countCar'>Cars</span></p>
               </div>
           </div>


            <div className='mt-28 mb-28'>

            </div>
        </div>
    );
};

export default Home;