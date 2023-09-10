import Navbar from "../components/Navbar";
import "../style/MainLayout.css"


// Basic layout implemented to reduce code in other files
function MainLayout({children}) {

    return (
        <>
            <div><Navbar></Navbar></div>
            <div class="main-layout">
                <div>{children}</div>
            </div>
        </>
    );
}

export default MainLayout;