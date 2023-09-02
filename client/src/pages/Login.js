import React from "react";
import { useState } from "react";
import axios from "axios";
import MainLayout from "../layout/MainLayout";



// make something that doesnt allow users to come to this page if they are already logged in



// the front end allowing users to login
function Login() {

    // intitialises important variables
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // api call to run backend logic for loggin a user in
    const login = () => {
        axios.post("http://localhost:3001/authenticate/login", {username, password}).then((response) => {
          alert(response.data.message);

          // user has been logged in successfully
          if (response.data.message == "LOGGED IN!") {
            window.location.href = "http://localhost:3000/";
          }
        })
    }

    return (
        <MainLayout>
          <input type="text" placeholder="Username.." 
            onChange={(event) => setUsername(event.target.value)} required></input>
          <input type="text" placeholder="Password.." 
            onChange={(event) => setPassword(event.target.value)} required></input>
          <button onClick={login}>Login</button>
        </MainLayout>
    );
}

export default Login;