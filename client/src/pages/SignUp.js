import React from "react";
import { useState } from "react";
import axios from "axios";
import MainLayout from "../layout/MainLayout";



// make something that doesnt allow users to come to this page if they are already logged in



// the front end allowing users to sign up
function SignUp() {

    // intialises hooks
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // api request to run backend logic to create an account
    const signUp = () => {
        axios.post("http://localhost:3001/authenticate/sign-up", {username, email, password}).then((response) => {
          alert(response.data.message);

          // account has been created successfully
          if (response.data.message == "ACCOUNT CREATED!") {
            window.location.href = "http://localhost:3000/";
          }
        })
    }

    return (
        <MainLayout>
          <input type="text" placeholder="Username.." 
            onChange={(event) => setUsername(event.target.value)} required></input>
          <input type="text" placeholder="Email.." 
            onChange={(event) => setEmail(event.target.value)} required></input>
          <input type="text" placeholder="Password.." 
            onChange={(event) => setPassword(event.target.value)} required></input>
          <button onClick={signUp}>Sign Up</button>
        </MainLayout>
    );
}

export default SignUp;