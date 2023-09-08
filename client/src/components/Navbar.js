import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";



// make something that checks whether user is logged in before displaying itmes
// also only display logout when on profile page



// a reusable navigation system with links to important parts of the site
function Navbar() {

    const logout = () => {
        axios.post("http://localhost:3001/profile/logout").then((response) => {
          alert(response.data.message);

          // user has been logged out successfully
          if (response.data.message == "SUCCESSFULLY LOGGED OUT!") {
            window.location.href = "http://localhost:3000/";
          }
        })
    }

    return (
        <div className="navbar">
            <div className="navbar-logo">
                PSVR2 Game Review
            </div>

            <ul className="navbar-menu">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/authenticate/login">Login</Link></li>
                <li><Link to="/authenticate/sign-up">Sign Up</Link></li>
                <li onClick={logout}>
                    <a href="/#" onClick={logout}>Logout</a>
                </li>
                <li><Link to="/profile/view/64eb790f3d43d41914ccef3e">Profile</Link></li>
            </ul>
        </div>
    )
}

export default Navbar;