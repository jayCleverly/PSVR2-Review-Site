import React from "react";
import { Link } from "react-router-dom";



// make something that checks whether user is logged in before displaying itmes
// also only display logout when on profile page



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
                <li><Link to="/profile/logout">Logout</Link></li>
                <li><Link to="/profile/view/Jay">Profile</Link></li>
            </ul>
        </div>
    )
}

export default Navbar;