import React, { useEffect, useState } from 'react';
import "./Home.css"
import banner from "../../images/audi.png"
import icon1 from "../../images/Icons/7 (1).png"
import icon2 from "../../images/Icons/5 (2).png"
import icon3 from "../../images/Icons/4 (2).png"
import icon4 from "../../images/Icons/3 (2).png"
import pic5 from "../../images/2.png"
import googleLogo from "../../images/googleplay.png"
import appleLogo from "../../images/appstore.png"
import facebook from "../../images/logos/facebook.png"
import twitter from "../../images/logos/twitter.png"
import linkedin from "../../images/logos/linkedin.png"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CountUp from 'react-countup';



const Home = () => {
    const [cars, setCars] = useState([]);

    // aos usage 
    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);

    useEffect(() => {
        axios.get('https://fast-temple-34743.herokuapp.com/someCars?limit=6')
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
            <div className='w-11/12 mx-auto banner-section flex justify-center items-center overflow-hidden'>
                <div data-aos="fade-right"
                    data-aos-offset="300"
                    data-aos-easing="ease-in-sine"
                    data-aos-duration="1500">
                    <h1 className='heading mb-2 text-white lg:text-4xl'>WELCOME TO THE CARSTORAGE</h1>
                    <p className='lg:text-2xl bold subHeading'>Find The Best Cars </p>
                </div>
                <div>
                    <img className='bannerImage ' src={banner} alt="" data-aos="fade-left"
                        data-aos-anchor="#example-anchor"
                        data-aos-offset="500"
                        data-aos-duration="1500" />

                </div>

            </div>

            <main className='container w-10/12 m-auto'>

                <div className='text-2xl font-extrabold mt-12 mb-2  text-left'><h2 className='featureHeading'>LATEST <span className='featured'>FEATURED</span> CARS</h2></div>


                <div className='cars'>
                    {
                        cars.map(car => {
                            return (
                                <div data-aos="zoom-in"
                                    data-aos-duration="1000"
                                    data-aos-anchor-easing='ease-in-out' className='card text-left'>

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

            <div className='mb-24 mt-16'>
                <button onClick={() => navigate('/item-details')} className='manageButton'>Manage Inventory</button>
            </div>


            <div className='w-100 mx-auto flex justify-evenly  text-white countSection'>
                <div>
                    <img src={icon1} alt="" />
                    <CountUp className='font-semibold lg:text-4xl' end={9500} /><span className='font-medium lg:text-4xl'>+</span>
                    <p className='font-medium lg:text-xl mt-2'>Total <span className='countCar'>Cars</span></p>
                </div>
                <div>
                    <img src={icon2} alt="" />
                    <CountUp className='font-semibold lg:text-4xl' end={8300} /><span className='font-medium lg:text-4xl'>+</span>
                    <p className='font-medium lg:text-xl mt-2'>Varified <span className='countCar'>Users</span></p>
                </div>
                <div>
                    <img src={icon3} alt="" />
                    <CountUp className='font-semibold lg:text-4xl' end={9400} /><span className='font-medium lg:text-4xl'>+</span>
                    <p className='font-medium lg:text-xl mt-2'>Active <span className='countCar'>Users</span></p>
                </div>
                <div>
                    <img src={icon4} alt="" />
                    <CountUp className='font-semibold lg:text-4xl' end={7800} /><span className='font-medium lg:text-4xl'>+</span>
                    <p className='font-medium lg:text-xl mt-2'>Featured <span className='countCar'>Cars</span></p>
                </div>
            </div>


            <div className='mt-20 w-11/12  mx-auto '>
                <h2 className='text-2xl font-bold '> Our <span className='carFeatureText'>Feature</span> Services</h2>
                <p className='font-semibold break-words'>We provide the best services .We keep the best technology's cars and best Quality parts</p>

                <div className='flex mt-16 text-left w-11/12 mx-auto services'>
                    <div data-aos="fade-top" className=''>
                        <div className='mb-12 pt-2 pb-6 pl-2 pr-2 featureDiv'>
                            <h3 className='font-semibold text-xl mb-2'>Car Inspection</h3>
                            <p className='break-words '>We inspect the cars regular time and solve the problems</p>
                        </div>
                        <div data-aos="fade-top" className='mb-8 pt-2 pb-6 pl-2 featureDiv break-words'>
                            <h3 className='font-semibold text-xl mb-2'>
                                Engine Upgrade
                            </h3>
                            <p className='break-words'>When enginge is less powered or upgarde available, we instantly upgrade this</p>
                        </div>
                    </div>
                    <div  className='imgServiceDiv'>
                        <img className='pl-4 pr-4' src={pic5} alt="" />
                    </div>
                    <div data-aos="fade-bottom" className='break-words'>
                        <div className='mb-12 pt-2 pb-6 pl-2 featureDiv'>
                            <h3 className='font-semibold text-xl mb-2'>Car Oil Change</h3>
                            <p className='break-words'>We change the car oil at the time when it needed</p>
                        </div>
                        <div data-aos="fade-bottom" className='mb-8 pt-2 pb-6 pl-2 featureDiv break-words'>
                            <h3 className='font-semibold text-xl mb-2'>Wheel Steering</h3>
                            <p className='break-words'>We keep the fresh wheel all time so that user don't get bored at its sevices</p>
                        </div>
                    </div>
                </div>

            </div>

            {/* footer  */}

            <footer className='mt-20  pt-12 pb-4 w-100 mx-auto bg-slate-400'>
                <div className='flex text-left footer'>
                   <div  className='subFooter '>
                   <div>
                        <h4 className='font-bold mb-2'> <span className='carText'>CAR</span>STORAGE</h4>
                        <p>We are careful about you. Be connected with us </p>
                        <div className='flex storeDiv mt-4'>
                            <Link to="/"className='mr-4'><img className='mr-2' src={googleLogo} alt="" /></Link>
                            <Link to="/"><img src={appleLogo} alt="" /></Link>
                        </div>
                    </div>
                    <div  className='socialIcons pl-6 pr-6'>
                        <h4 className='text-lg font-semibold mb-2'>Follow Us</h4>
                        <div className='flex'>
                            <img src={facebook} alt="" />
                            <Link to="/">Facebook</Link>
                        </div>
                        <div className='flex'>
                            <img src={twitter} alt="" />
                            <Link to="/">Twitter</Link>
                        </div>
                        <div className='flex'>
                            <img src={linkedin} alt="" />
                            <Link to="/">Linkedin</Link>
                        </div>

                    </div>
                   </div>
                  <div className='newletter mt-8 mb-6'>
                  <h4 className='font-bold mb-2'>SignUp for weekly newsletter</h4>
                     <p>We can send you information about update event etc.</p>
                    <div className=''>
                        <input className='mt-2 footerInput' type="email" name="" id="" placeholder='Email' />
                        <button className='footerSubmit font-bold'>Submit</button>

                    </div>
                  </div>
                </div>
                <p className='mt-2 mb-4 font-bold text-sm'>&copy; 2022 All right reserved.</p>
            </footer>
        </div>
    );
};

export default Home;