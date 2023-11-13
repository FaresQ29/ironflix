import '/src/Pages/MoviePage/MoviePage.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import findAPI from '../../Components/API/FindAPI';
import creditAPI from '../../Components/API/CreditAPI';
import Tab from './MovieDetails/Tab';
const imgPath = "https://image.tmdb.org/t/p/w500"
export default function MoviePage({loggedUser}){
    const [movie, setMovie] = useState(null)
    const [credits, setCredits] = useState(null)
    const [fetching, setFetching] = useState(true)
    const {movieId} = useParams();
    useEffect(()=>{
        async function findMovie(){
            try{
                const response = await findAPI(movieId)
                const creditsRes = await creditAPI(movieId)
                setMovie(response)
                setCredits(creditsRes)
                setFetching(false)
            }
            catch(error){console.log(error);}
        }
        findMovie()
    }, [])

    return(
        <div id="movie-page-container">
            {fetching && <div>Loading movie...</div>}
            {!fetching && (
                <>
                    <img src={imgPath + movie.backdrop_path} alt="movie poster" id="movie-poster" />
                    <MovieTitle title = {movie.original_title} releaseYear = {movie.release_date}/>
                    <PosterSummary summary={movie.overview} posterUrl={movie.poster_path}/>
                    <Tab movie={movie} credits = {credits} loggedUser={loggedUser}/>
                </>

            )}
        </div>
    )
}

function PosterSummary({summary, posterUrl}){
    return(
        <div className="poster-summary">
            <img src={imgPath + posterUrl} alt="poster image" />
            <p>{summary}</p>
        </div>
    )
}

function MovieTitle({title, releaseYear}){
    return (
        <div className="movie-title-cont">
            <p>{title}</p>
            <span>({releaseYear.split("-")[0]})</span>
        </div>
    )
}