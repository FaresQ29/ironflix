import '/src/Pages/Home/Home.css'
import callAPI from "../../Components/API/CallAPI";
import MovieSquare from '../../Components/MovieSquare/MovieSquare';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
export default function Home(){
    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(true);
    const [movieArr, setMovieArr] = useState([]);
    useEffect(()=>{
        async function apiCall(){
            try{
                const movieRes = await callAPI(currentPage)
                setMovieArr(movieRes.results)
                setFetching(false)
            }
            catch(error){console.log(error)}
        }
        apiCall()
    }, [])
    return (
        <div id="home-main">
            {fetching && <div className='loading-cont'>Loading...</div>}
            {!fetching && (
                movieArr.map(movie=><Link key={movie.id} to={`/${movie.id}`}><MovieSquare movie = {movie}/></Link>)
            )}
        </div>
    )
}

