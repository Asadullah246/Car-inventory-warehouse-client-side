import React, { useState } from 'react';
import "./Login.css"
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../Firebase.init';

const Login = () => {
    const [error, setError] =useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [signInWithGoogle, user2, loading, error2] = useSignInWithGoogle(auth);
  
    const googleSignIn=e=>{
        e.preventDefault();
        
        if(error2){
            setError(error2.message);
            return;
        }
        if(loading){
            setIsLoading(true);
            return;
        }
        signInWithGoogle();
    }
    
    return (
        <div>
            <div>
                
            </div>
            <p>error :{error} </p>
            <p>{isLoading? "loading": "not loading"} </p>
          <button onClick={googleSignIn}>sign in with google</button>
        </div>
    );
};

export default Login;