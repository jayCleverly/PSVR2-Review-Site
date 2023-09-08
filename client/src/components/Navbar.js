import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";



// make something that checks whether user is logged in before displaying itmes


// a reusable navigation system with links to important parts of the site
function Navbar() {

    return (
        <div className="navbar">
            <div className="navbar-logo">
                PSVR2 Game Review
            </div>

            <ul className="navbar-menu">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/authenticate/login">Login</Link></li>
                <li><Link to="/authenticate/sign-up">Sign Up</Link></li>
                <li><Link to="/profile/view/64eb790f3d43d41914ccef3e">Profile</Link></li>
            </ul>
        </div>
    )
}

export default Navbar;