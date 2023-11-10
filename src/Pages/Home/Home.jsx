import '/src/Pages/Home/Home.css'
import callAPI from "../../Components/API/CallAPI";
import MovieSquare from '../../Components/MovieSquare/MovieSquare';
import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
export default function Home(){
    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(true);
    const [movieArr, setMovieArr] = useState([]);
    const movieDiv = useRef(null);

    function makeMovieCall(){
        async function apiCall(){
            try{
                const movieRes = await callAPI(currentPage)
                setMovieArr(prevArr =>{
                    if(movieArr.length===0) return movieRes.results
                    else{
                        return [...prevArr].concat(movieRes.results)
                    }
                })
                setCurrentPage(prev=>prev+1);
                setFetching(false)
            }
            catch(error){console.log(error)}
        }
        apiCall()
    }
    useEffect(()=>{ 
        makeMovieCall()
    }, [])
    function loadMore(){
        makeMovieCall()

    }


    return (

            <div id="home-main" ref={movieDiv}>
                {fetching && <div className='loading-cont'>Loading...</div>}
                {!fetching && (
                    movieArr.map(movie=><Link key={movie.id} to={`/${movie.id}`}><MovieSquare movie = {movie}/></Link>)
                )}
                {!fetching && <button id="load-more-btn-home" onClick={()=>{loadMore()}}>Load more movies</button>}
                
            </div>



    )
}

