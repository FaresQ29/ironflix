import '/src/Components/MovieSquare/MovieSquare.css';
import { useEffect, useState } from 'react';
import favIcon from '/src/assets/fav-icon.png';
import listIcon from '/src/assets/list-icon.png';
import watchedIcon from '/src/assets/watched-icon.png';
import { updateStatus } from '../LocalAPI/LocalApi';
export default function MovieSquare({movie, loggedUser}){
    const [optionsVis, setOptionsVis] = useState(false);
    const [isChecked, setIsChecked] = useState({favorites: false, watchlists: false})
    const imgPath = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
    let style = {}
    optionsVis? style={opacity: "0.5"} : style={opacity: "1"}

    useEffect(()=>{
        if(!loggedUser) return
        handleCheckmark("favorites", true);
        handleCheckmark("watchlists", true);
    }, [loggedUser])

    function handleCheckmark(type, bool){
        if(loggedUser[type].includes(movie.id)){
            setIsChecked(prev=>{ return {...prev, [type]: bool} })
        }
    }

    function statusCheck(type){
        if(!loggedUser){
            userNotLogged()
            return;
        }
        else{
            let movieExists = false;
            loggedUser[type].forEach(elem=>{
                if(elem === movie.id){
                    movieExists=true;
                    return;
                }
            })
            if(!movieExists){
                setIsChecked(prev =>{
                    return {...prev, [type]: true}
                })
                loggedUser[type].push(movie.id);
                updateStatus(loggedUser)
                console.log(loggedUser);
                return;
            }
            else{
                handleCheckmark(type, false);
                const movieIndex = loggedUser[type].indexOf(movie.id);
                loggedUser[type].splice(movieIndex, 1)
                updateStatus(loggedUser)
            }
        }
    }
    function userNotLogged(){
        console.log("user not logged");
    }
    return (
        <div className='movie-square' onMouseOver={()=>setOptionsVis(true)} onMouseLeave={()=>setOptionsVis(false)} >
            <img src={imgPath} style = {style}alt={`${movie.title} poster`} />
            {optionsVis && (
                <div className="movie-square-main-div">
                    <p>{movie.title}</p>
                    <div className="movie-square-inner-div" onClick={e=>e.preventDefault()}>
                        <div className="card-icon-div" onClick={()=>statusCheck("favorites")}>
                            {isChecked.favorites && <span>✓</span>}
                            <img src={favIcon}/>
                        </div>
                        <div className="card-icon-div"> 
                            <img src={listIcon}/>
                        </div>
                        <div className="card-icon-div" onClick={()=>statusCheck("watchlists")}>
                            {isChecked.watchlists && <span>✓</span>}    
                            <img src={watchedIcon}/>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}