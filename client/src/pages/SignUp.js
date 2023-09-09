import { useState, useEffect } from "react";
import axios from "axios";
import MainLayout from "../layout/MainLayout";


// the front end allowing users to sign up
function SignUp() {

    // intialises hooks
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
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
          {!loggedIn &&
            <>
              <input type="text" placeholder="Username.." 
                onChange={(event) => setUsername(event.target.value)} required></input>
              <input type="text" placeholder="Email.." 
                onChange={(event) => setEmail(event.target.value)} required></input>
              <input type="text" placeholder="Password.." 
                onChange={(event) => setPassword(event.target.value)} required></input>
              <button onClick={() => signUp()}>Sign Up</button>
            </>
          }
          
        </MainLayout>
    );
}

export default SignUp;