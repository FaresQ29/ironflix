import '/src/Pages/Home/Home.css'
import callAPI from "../../Components/CallAPI";
import { useState, useEffect } from "react";
export default function Home(){
    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(true);
    const [movieArr, setMovieArr] = useState([]);
    useEffect(()=>{
        async function apiCall(){
            try{
                const movieRes = await callAPI(currentPage)
                setMovieArr(movieRes)
                setFetching(false)
            }
            catch(error){
                console.log(error);
            }
        }
        apiCall()
    }, [])
    return (
        <div id="home-main">
            {fetching && <div className='loading-cont'>Loading...</div>}
            {!fetching && "movies"}
        </div>
    )
}

function MovieSquare(){
    return (
        <></>
    )
}