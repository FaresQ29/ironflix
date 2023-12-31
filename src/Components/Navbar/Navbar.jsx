/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom"
import ironFlixLogo from '/src/assets/ironflix-logo.png';
import { useState, useEffect, useRef } from "react";

import '/src/Components/Navbar/Navbar.css'
export default function Navbar(){
    const navRef = useRef(null)
    return (
        <nav ref={navRef}>
            <div id="inner-nav">
                <div id="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/mylists">My Lists</Link>
                    <Link to="/watchlist">Watchlist</Link>
                </div>
            
            <Navhandle navElem = {navRef} />
            </div>
        </nav>
    )
}


function Navhandle({navElem}){
    const storageVal = localStorage.getItem("nav-shown");
    const [navShown, setNavShown] = useState(true)

    useEffect(()=>{
        const nav = navElem.current;
        if(storageVal===null){
            setNavShown(true)
        }
        else if(storageVal==="false"){
            nav.classList.add("hidden-nav")
            setNavShown(false)
        }
        else{
            nav.classList.remove("hidden-nav")
            setNavShown(true)
        }
    }, [])

    function handleFunc(e){
        const nav = e.target.parentElement.parentElement

        if(!navShown){
            nav.classList.remove("hidden-nav")
            localStorage.setItem("nav-shown", true)
        }
        else{
            nav.classList.add("hidden-nav")
            localStorage.setItem("nav-shown", false)

        }
        setNavShown(prev => !prev)
    }
    return (
        <div id="nav-handle" onClick={handleFunc}></div>
    )
}