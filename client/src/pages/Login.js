import { useState, useEffect } from "react";
import axios from "axios";
import MainLayout from "../layout/MainLayout";
import "../style/Auth.css"


// the front end allowing users to login
function Login() {

    // intitialises important variables
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(true);

    // api call to check if user is aleady logged in
    useEffect(() => {
      axios.get("http://localhost:3001/authenticate/auth-check").then((response) => {

        // user is already logged in
        if (response.data.loggedIn == true) {
          window.location.href = "http://localhost:3000/";
          alert("ALREADY LOGGED IN!");
        
        // user is not logged in
        } else {
          setLoggedIn(false);
        }
      })
  }, [])

    // api call to run backend logic for logging a user in
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
          <h1>Login to your account:</h1>
          <hr></hr>
          {loggedIn == false &&
            <div class="auth">
              <input type="text" placeholder="Username.." 
                onChange={(event) => setUsername(event.target.value)}></input>
              <input type="password" placeholder="Password.." 
                onChange={(event) => setPassword(event.target.value)}></input>
              <button onClick={() => login()}>Login</button>
            </div>
          }
          
        </MainLayout>
    );
}

export default Login;