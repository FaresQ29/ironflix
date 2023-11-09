/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";

import '/src/Components/Navbar/Navbar.css'
export default function Navbar(){

    return (
        <nav>
            <div id="inner-nav">
            <Link to="/">Home</Link>
            <Link to="/watchlist">WatchList</Link>
            <Navhandle />
            </div>

        </nav>
    )
}

function Navhandle(){
    const [navShown, setNavShown] = useState(true)

    function handleFunc(e){
        const nav = e.target.parentElement.parentElement;
        setNavShown(prev => !prev)
        if(navShown){
            nav.classList.remove("hidden-nav")
        }
        else{
            nav.classList.add("hidden-nav")
        }
    }
    return (
        <div id="nav-handle" onClick={handleFunc}></div>
    )
}