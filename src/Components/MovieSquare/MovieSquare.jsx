import '/src/Components/MovieSquare/MovieSquare.css';
import { useState } from 'react';
import favIcon from '/src/assets/fav-icon.png';
import listIcon from '/src/assets/list-icon.png';
import watchedIcon from '/src/assets/watched-icon.png';
export default function MovieSquare({movie}){
    const [optionsVis, setOptionsVis] = useState(false)
    const imgPath = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
    let style = {}
    optionsVis? style={opacity: "0.5"} : style={opacity: "1"}

    return (
        <div className='movie-square' onMouseOver={()=>setOptionsVis(true)} onMouseLeave={()=>setOptionsVis(false)} >
            <img src={imgPath} style = {style}alt={`${movie.title} poster`} />
            {optionsVis && (
                <div className="movie-square-main-div">
                    <p>{movie.title}</p>
                    <div className="movie-square-inner-div">
                        <img src={favIcon}/>
                        <img src={listIcon}/>
                        <img src={watchedIcon}/>
                    </div>
                </div>

            )}

        </div>
    )
}