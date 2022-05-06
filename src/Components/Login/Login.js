import React, { useEffect, useState } from 'react';
import "./Login.css"
import { useAuthState, useCreateUserWithEmailAndPassword, useSendEmailVerification, useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGithub, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { async } from '@firebase/util';
import auth from '../../Firebase.init';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import Loading from '../Loading';


const Login = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [tokenError, setTokenError] = useState('');
    const [success, setSuccess] = useState('');
    // const [isLoading, setIsLoading] = useState(false);
    const [openRegi, setOpenRegi] = useState(false);
    const [checked, setChecked] = useState(true)
    const location = useLocation()
    const navigate = useNavigate()
    const [user] = useAuthState(auth);

    const [signInWithGoogle, googlUseer, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [sendPasswordResetEmail, resetSending, resetError] = useSendPasswordResetEmail(auth);

    const [
        createUserWithEmailAndPassword,
        createUser,
        createLoading,
        createError,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

    const [
        signInWithEmailAndPassword,
        signInUser,
        signInLoading,
        signInError,
    ] = useSignInWithEmailAndPassword(auth);



    const [sendEmailVerification, verifyLoading, varifyError] = useSendEmailVerification(auth);
    const [updateProfile, updateLoading, updateError] = useUpdateProfile(auth);

    const [signInWithGithub, gitUser, gitLoading, gitError] = useSignInWithGithub(auth);

    let from = location.state?.from?.pathname || "/";

    useEffect( ()=>{
        if (user) { 
            axios.post('https://fast-temple-34743.herokuapp.com/login', {
                email: user.email  
            })
                .then(function (response) {
                    const token = response.data.token;
                    localStorage.setItem("accessToken", token);
                    navigate(from, { replace: true });
                })
              .catch(function (err) {
                setTokenError(err.message)
              });   
        }
    },[from, navigate,user])

    // handle google sign in 


    const googleSignIn = e => {
        e.preventDefault();
        if (googleError) {
            setError(googleError.message);
            return;
        }
        signInWithGoogle();
    }

    // email sign in 

    useEffect(() => {
        if (signInError) {
            setError(signInError.message);
            return;
        }
    }, [signInError])

   useEffect(()=>{
    if (signInLoading) {
       <Loading></Loading>;
    }

   },[signInLoading])
    const handleLogin = e => {
        e.preventDefault();
        setError("")
        setSuccess("")
        const userEmail = e.target.email.value;
        const password = e.target.password.value;
        signInWithEmailAndPassword(userEmail, password);
        setSuccess("You have successfully logged in");
        e.target.reset();
    }

    // Register  

    useEffect(() => {
        if (createError) {
            setError(createError.message);
            return;
        }

    }, [createError])

    useEffect(() => {
        if (varifyError) {
            setError(varifyError.message);
            return;
        }
    }, [varifyError])


    const register = async (e) => {
        e.preventDefault()
        setError("")
        setSuccess("")
        const name = e.target.name.value;
        const userEmail = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        if (password !== confirmPassword) {
            setError("Password does not match");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }
        await createUserWithEmailAndPassword(userEmail, password);
        await updateProfile({ displayName: name });
        await sendEmailVerification();
        setSuccess("You have successfully registered");
        e.target.reset();
    }
    const emailBlur = e => {
        setEmail(e.target.value);
    }
    const resetPassword = e=> {
        e.preventDefault()
        sendPasswordResetEmail(email);
        toast("Password reset email sent");
    }

    const handleRegister = () => {
        setOpenRegi(true);
    }

    useEffect(() => {
        if (gitError) {
            setError(gitError.message);
            return;
        }
    }, [gitError])
   
    useEffect(()=>{
        if (gitLoading) {
            <Loading></Loading>;
        }
    
       },[gitLoading])

    const githubLogin = e => {
        e.preventDefault();
        signInWithGithub()
        setSuccess("You have successfully logged in");
    }

    return (
        <div className='loginSection'>

            <div className={openRegi ? "regiTrue " : "regiFalse"}>
                <h1 className='font-bold text-2xl pt-8 mb-6'>Sign in to your account</h1>
                <button className='block githubButton text-bold text-white text-sm mb-4' onClick={githubLogin}>SIGN IN WITH GITHUB</button>
                <button onClick={googleSignIn} className='block googleButton text-bold text-white text-sm mb-4'>SIGN IN WITH GOOGLE</button>
                <div className='flex justify-between items-center'>
                    <div className='border'></div>
                    <div> OR </div>
                    <div className='border'></div>
                </div>
                <form onSubmit={handleLogin} action="" className='w-100'>
                    <input className='inputField pl-1 bg-orange-50' onBlur={emailBlur} type="email" name="email" id="" placeholder='email' required />
                    <input className='inputField pl-1 bg-orange-50' type="password" name="password" id="" placeholder='password' required />
                    <input type="checkbox" name='checkbox' onChange={() => setChecked(!checked)} />
                    <label > Remember me</label>
                    <p className='mt-2 mb-2'>{error? error: success} </p>
                    <p>{tokenError} </p>
                    <button disabled={checked} className="block loginBtn" type='submit'>login</button>
                </form>
                <p className='mt-4 m2-4 text-left'>forget password? <button className='font-bold text-blue-500' onClick={resetPassword}>Reset password</button></p>

                <p className='text-left'> Don't have an account? <button className='font-bold text-blue-500' onClick={handleRegister}>Register</button></p>


            </div>
            <div className={openRegi ? "regiFalse" : "regiTrue"}>
                <h2 className='font-bold text-2xl pt-8 mb-6'>Registration</h2>
                <form onSubmit={register} action="">
                    <input className='inputField pl-1 bg-orange-50' type="text" name="name" id="" placeholder='name' required /><br />
                    <input className='inputField pl-1 bg-orange-50' type="email" name="email" id="" placeholder='email' required /><br />
                    <input className='inputField pl-1 bg-orange-50' type="password" name="password" id="" placeholder='password' required /><br />
                    <input className='inputField pl-1 bg-orange-50' type="password" name="confirmPassword" id="" placeholder='confirm password' required /><br />
                    <p className='mt-2 mb-2'>{error} {success} </p>
                    <button className="block loginBtn mt-4 mb-4" value='register'>Register</button>
                </form>
                <p className='text-left'>Already have an account ? <button className='font-bold text-blue-500' onClick={() => setOpenRegi(false)}>Login</button></p>
            </div>
            <ToastContainer />

        </div>
    );
};


export default Login;
