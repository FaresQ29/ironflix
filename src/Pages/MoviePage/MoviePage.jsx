import '/src/Pages/MoviePage/MoviePage.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import findAPI from '../../Components/API/FindAPI';
import creditAPI from '../../Components/API/CreditAPI';
import Tab from './MovieDetails/Tab';
const imgPath = "https://image.tmdb.org/t/p/w500";
import listIcon from '/src/assets/list-icon.png'
import watchedIcon from '/src/assets/watched-icon.png'
import CreateList from '/src/Components/Lists/CreateList.jsx'
import { readLocal, readLocalUser, updateStatus } from '../../Components/LocalAPI/LocalApi';
export default function MoviePage({loggedUser, setAllComments, comments}){
    const [isListMenu, setIsListMenu] = useState({bool: false, currentMovie: null})
    const [movie, setMovie] = useState(null)
    const [credits, setCredits] = useState(null)
    const [fetching, setFetching] = useState(true)
    const {movieId} = useParams();

    function renderListMenu(bool){
        setIsListMenu({bool: bool, currentMovie: movie})
    }
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
        renderListMenu({bool:false, currentMovie: movie})
    }, [movieId])

    return(
        <div id="movie-page-container">
            {fetching && <div>Loading movie...</div>}
            {!fetching && (
                <>
                {(isListMenu.bool===true && loggedUser) && (
                    <CreateList clickedFilm={movie} user={loggedUser} renderListMenu={renderListMenu}/>
                )}
                    <img src={imgPath + movie.backdrop_path} alt="movie poster" id="movie-poster" />
                    <MovieTitle movie={movie} user={loggedUser} renderListMenu={renderListMenu}/>
                    <PosterSummary summary={movie.overview} posterUrl={movie.poster_path}/>
                    <Tab movie={movie} credits = {credits} loggedUser={loggedUser} setAllComments={setAllComments} comments={comments}/>
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

function MovieTitle(props){
    console.log(props);
    const {original_title, release_date} = props.movie
    return (
        <div className="movie-title-cont">
            {props.user && (
                <AddOptionsMovie renderListMenu={props.renderListMenu} user={props.user} movie = {props.movie}/>
            )}
            <p>{original_title}</p>
            <span>({release_date.split("-")[0]})</span>
        </div>
    )
}

function AddOptionsMovie({renderListMenu, user, movie}){
    const [isCheck, setIsCheck] = useState(user.watchlists.includes(movie.id) ? true : false)

    function handleListClick(){
        renderListMenu(true)
    }
    async function handleWatchClick(){
       const getUser = await readLocalUser(user.id)
       if(getUser.watchlists.includes(movie.id)){
            user.watchlists.splice(user.watchlists.indexOf(movie.id), 1)
            updateStatus(user)
            setIsCheck(false)
       }
       else{
            user.watchlists.push(movie.id)
            updateStatus(user)
            setIsCheck(true)

       }
       
    }
    return (
        <div className='home-add-options'>

            <img onClick={handleListClick} src={listIcon}/>
            <div className="movie-card-icon">
                {isCheck && (
                     <span>✓</span>
                )}
                <img src={watchedIcon} onClick={handleWatchClick}/>
            </div>
        </div>
    )
}