import React from "react";
import Navbar from "../components/Navbar";


// Basic layout implemented to reduce code in other files
function MainLayout({children}) {

    return (
        <div>
            <Navbar></Navbar>
            <div>{children}</div>
        </div>
    );
}

export default MainLayout;