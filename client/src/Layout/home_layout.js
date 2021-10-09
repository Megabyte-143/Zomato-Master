import React from "react";
import Navbar from "../component/navbar/navbar";

const HomeLayout = (props) => {
    return <>
        <div className="container px-4 lg:px-20" >
            <Navbar></Navbar>
            {
                props.children
            }
        </div>
    </>
}

export default HomeLayout;