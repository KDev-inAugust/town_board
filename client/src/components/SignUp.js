import React from "react";
import { useState } from "react";


function SignUp({onLogin}){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");



function handleSubmit(e){
    e.preventDefault();
    
}



return(

    <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username </label>
        <input
        type="text"
        id="username"
        value={username}
        onChange={(e)=> setUsername(e.target.value)}
        />
        <br></br>
        <label htmlFor="password">Password </label>
        <input
        type="password"
        id="password"
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
        />
        <br></br>
        <label htmlFor="password_confirmation">Confirm Password </label>
        <input
        type="password"
        id="password_confirmation"
        value={passwordConfirmation}
        onChange={(e)=> {setPasswordConfirmation(e.target.value)}}
        />
        <button type="submit">submit</button>
    </form>
    );
}

export default SignUp;