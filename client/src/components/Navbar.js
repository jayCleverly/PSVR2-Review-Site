import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


// a reusable navigation system with links to important parts of the site
function Navbar() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    

    // api call to check if user is logged in
    useEffect(() => {
        axios.get("http://localhost:3001/authenticate/auth-check").then((response) => {
  
          // user is logged in
          if (response.data.loggedIn) {
            setLoggedIn(true);
            setUser(response.data.user);
          }
        })
      }, [])


    // api call allowing a user to logout of their profile
    const logout = () => {
        axios.post("http://localhost:3001/profile/logout").then((response) => {
            alert(response.data.message);
        })
    }


    return (
        <div className="navbar">
            <div className="navbar-logo">
                PSVR2 Game Review
            </div>

            <ul className="navbar-menu">
                <li><Link to="/">Home</Link></li>

                {!loggedIn && // shows routes for user to login
                    <>
                    <li><Link to="/authenticate/login">Login</Link></li>
                    <li><Link to="/authenticate/sign-up">Sign Up</Link></li>
                    </>
                    
                }
                {loggedIn && // shows routes for user to view their profile
                    <>
                    <li><Link to={"/profile/view/" + user.id}>Profile</Link></li>
                    <li><a href="/" onClick={() => logout()}>Logout</a></li>
                    </>
                    
                }
            </ul>
        </div>
    )
}

export default Navbar;