import CallAPI from "../../Components/CallAPI";
import { useState, useEffect } from "react";
export default function Home(){
    const [currentPage, setCurrentPage] = useState(1)
    return (
        <div id="home-main">
            {CallAPI(currentPage)}
        </div>
    )
}