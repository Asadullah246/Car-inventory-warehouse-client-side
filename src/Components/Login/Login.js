import React, { useState } from 'react';
import "./Login.css"
import { useAuthState, useCreateUserWithEmailAndPassword, useSendEmailVerification, useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { async } from '@firebase/util';
import auth from '../../Firebase.init';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorr, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [openRegi, setOpenRegi] = useState(false);
    
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

    // handle google sign in 

    
    const googleSignIn = e => {
        e.preventDefault();
        if (googleError) {
           console.log(googleError.message);
            return;
        }
        if (googleLoading) {
            console.log("loading");
        }
        signInWithGoogle();
    }

       // email sign in 

    if (signInError) {
        console.log("sign err", signInError.message);
        return;
    }
    if (signInUser) {
        console.log(signInUser);
    }
    if (signInLoading) {
        console.log("loading");
    }

    const handleLogin = e => {
        e.preventDefault();
        const userEmail = e.target.email.value;
        const password = e.target.password.value;
        signInWithEmailAndPassword(userEmail, password);
    }

    // Register  

    if(createError){
        console.log("create err", createError.message);
        return;
    }
    if(createUser){
        console.log(createUser);
    }
    if(updateError){
        console.log("update err", updateError.message);
    }
    if(varifyError){
        console.log("varify err", varifyError.message);
    }

    const register =async (e)=> {
        e.preventDefault()
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
  
    return (
        <div>
            
            <div className={openRegi ? "regiTrue" : "regiFalse"}>
                <form onSubmit={handleLogin} action="">
                    <input onBlur={emailBlur} type="email" name="email" id="" placeholder='email' /><br />
                    <input type="password" name="password" id="" placeholder='password' /><br />
                    <button type='submit'>login</button>
                </form>
                <p>forget password? <button onClick={resetPassword}>Reset password</button></p> 

                 <p>error : </p>
                <p>{isLoading ? "loading" : "not loading"} </p>
                <button onClick={googleSignIn}>signIn with google</button>
                <p>Don't have an account? <button onClick={handleRegister}>Register</button></p> 


            </div>
            <div className={openRegi ? "regiFalse" : "regiTrue"}>
                <h2>Registration</h2>
                <form onSubmit={register} action="">
                    <input type="text" name="name" id="" placeholder='name' required/><br />
                    <input type="email" name="email" id="" placeholder='email' required /><br />
                    <input type="password" name="password" id="" placeholder='password' required /><br />
                    <input type="password" name="confirmPassword" id="" placeholder='confirm password' required /><br />
                    <p> </p>
                    <button value='register'>Register</button>
                </form>
                <p>Already have an account ? <button onClick={() => setOpenRegi(false)}>Login</button></p>
            </div>

        </div>
    );
};


export default Login;
