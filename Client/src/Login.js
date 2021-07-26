
import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import "./Login.css";
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';


function Login()
{
    const [input, setInput]=useState("");
    const [{}, dispatch]= useStateValue();
    const signIn = () => {
        dispatch({
            type: actionTypes.SET_USER,
            user: input,
        })

    }
    return (
    <div className="login">
        <div className="login__container">
            <div className="login__text">
                <h1>Sign in to Group Chat</h1>

            </div>
            <form className="login__credentials">
                <input value={input} onChange={
                        (e)=> setInput(e.target.value)
                    } type="text" placeholder="Username"></input>
                    
                <input type="password" placeholder="Password"></input>
            </form>
            <Button onClick={signIn}>
                Sign In/Log In
            </Button>
        </div>

    </div>
    );
}

export default Login;
