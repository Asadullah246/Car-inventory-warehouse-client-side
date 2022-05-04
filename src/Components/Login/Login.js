import React, { useEffect, useState } from 'react';
import "./Login.css"
import { useAuthState, useCreateUserWithEmailAndPassword, useSendEmailVerification, useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGithub, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { async } from '@firebase/util';
import auth from '../../Firebase.init';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [openRegi, setOpenRegi] = useState(false);
    const [checked, setChecked]=useState(true)
    
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

    const [user] = useAuthState(auth);

    const [sendEmailVerification, verifyLoading, varifyError] = useSendEmailVerification(auth);
    const [updateProfile, updateLoading, updateError] = useUpdateProfile(auth);

    const [signInWithGithub, gitUser, gitLoading, gitError] = useSignInWithGithub(auth);

    // handle google sign in 

    
    const googleSignIn = e => {
        e.preventDefault();
        if (googleError) {
            setError(googleError.message);
            return;
        }
        // if (googleLoading) {
        //     console.log("loading");
        // }
        signInWithGoogle();
    }

       // email sign in 
       useEffect( ()=>{
        if (signInError) {
            setError(signInError.message);
            return;
        }
       },[signInError])

    
    
    // if (signInLoading) {
    //     console.log("loading");
    // }

    const handleLogin = e => {
        e.preventDefault();
        setError("")
        setSuccess("")
        const userEmail = e.target.email.value;
        const password = e.target.password.value;
        signInWithEmailAndPassword(userEmail, password);
        setSuccess("You have successfully logged in");
    }

    // Register  
    useEffect( ()=>{
        if(createError){
            setError(createError.message);
            return;
        }

    },[createError])

    
    // if(createUser){
    //     console.log(createUser);
    // }
    // if(updateError){
    //     console.log("update err", updateError.message);
    // }
    useEffect( ()=>{
        if(varifyError){
            setError(varifyError.message);
        }
    }, [varifyError])
    

    const register =async (e)=> {
        e.preventDefault()
        setError("")
        setSuccess("")
        const name = e.target.name.value;
        const email = e.target.email.value;
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
        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName: name });
        await sendEmailVerification();
        setSuccess("You have successfully registered");
        e.target.reset();
    }
    const emailBlur=e=>{
        setEmail(e.target.value);
    }
    const resetPassword=()=>{
        sendPasswordResetEmail(email);
       

    }

    const handleRegister = () => {
        setOpenRegi(true);
    }
   
    useEffect( ()=>{
        if (gitError) {
            setError(gitError.message);
             return;
         }
    }, [gitError])
    //  if (gitLoading) {
    //      console.log("loading");
    //  }
    
     const githubLogin = e => {
         e.preventDefault();
         signInWithGithub()
     }
    //  console.log(user?.uid); 
  
    return (
        <div className='loginSection'>
            
            <div className={ openRegi ? "regiTrue " : "regiFalse"}>
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
                    <input className='inputField pl-1 bg-orange-50' type="password" name="password" id="" placeholder='password' required/>
                    <input type="checkbox" name='checkbox' onChange={()=>setChecked(!checked)}/>
                    <label > Remember me</label>
                    <p className='mt-2 mb-2'>{error} {success} </p>
                    <button disabled={checked}  className="block loginBtn" type='submit'>login</button>
                </form>
                <p className='mt-4 m2-4 text-left'>forget password? <button className='font-bold text-blue-500' onClick={resetPassword}>Reset password</button></p> 

                <p className='text-left'> Don't have an account? <button className='font-bold text-blue-500' onClick={handleRegister}>Register</button></p> 


            </div>
            <div className={openRegi ? "regiFalse" : "regiTrue"}>
                <h2 className='font-bold text-2xl pt-8 mb-6'>Registration</h2>
                <form onSubmit={register} action="">
                    <input className='inputField pl-1 bg-orange-50' type="text" name="name" id="" placeholder='name' required/><br />
                    <input className='inputField pl-1 bg-orange-50' type="email" name="email" id="" placeholder='email' required /><br />
                    <input className='inputField pl-1 bg-orange-50' type="password" name="password" id="" placeholder='password' required /><br />
                    <input className='inputField pl-1 bg-orange-50' type="password" name="confirmPassword" id="" placeholder='confirm password' required /><br />
                    <p className='mt-2 mb-2'>{error} {success} </p>
                    <button className="block loginBtn mt-4 mb-4"  value='register'>Register</button>
                </form>
                <p className='text-left'>Already have an account ? <button className='font-bold text-blue-500' onClick={() => setOpenRegi(false)}>Login</button></p>
            </div>

        </div>
    );
};


export default Login;
