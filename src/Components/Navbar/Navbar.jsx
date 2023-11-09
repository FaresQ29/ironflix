/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";

import '/src/Components/Navbar/Navbar.css'
export default function Navbar(){

    return (
        <nav>
            <div id="inner-nav">
                <div id="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/watchlist">Watchlist</Link>
                    <Link to="/mylists">My Lists</Link>
                    <Link to="/favorites">My Favorites</Link>
                    <Link to="/popular">Most Popular</Link>
                    <Link to="/random">Random</Link>
                </div>
            
            <Navhandle />
            <ThemePicker />
            </div>
        </nav>
    )
}

function ThemePicker(){
    const [theme, setTheme] = useState("Dark")

    function themeHandle(e){
        const switchElem = e.target.childNodes[0];
        theme === "Dark" ? switchElem.classList.add("theme-switch-light") : switchElem.classList.remove("theme-switch-light")
        setTheme(prev => prev==="Dark" ? "Light" : "Dark")

    }
    return (

        <div className="main-theme-switch" onClick={themeHandle}>
            <div className="theme-switch">{theme} theme</div>
        </div>
    )
}



function Navhandle(){
    const [navShown, setNavShown] = useState(true)

    function handleFunc(e){
        const nav = e.target.parentElement.parentElement;
        !navShown ? nav.classList.remove("hidden-nav") :  nav.classList.add("hidden-nav")
        setNavShown(prev => !prev)
    }
    return (
        <div id="nav-handle" onClick={handleFunc}></div>
    )
}