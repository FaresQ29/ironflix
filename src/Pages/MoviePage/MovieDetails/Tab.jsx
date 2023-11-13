import { useState, useEffect } from "react";
import noImg from '/src/assets/no-img.png'
import Comments from "./CommentBox";
export default function Tab({movie, credits, loggedUser}){
    const [currentTab, setCurrentTab] = useState(1);
    function handleTab(val){
        setCurrentTab(val)
    }

    return(
        <div className="movie-tab-container">
            <div className="movie-tab">
                <BtnFact val={1} handleTab={handleTab} currentTab={currentTab}/>
                <BtnFact val={2} handleTab={handleTab} currentTab={currentTab}/>
                <BtnFact val={3} handleTab={handleTab} currentTab={currentTab}/>
                <BtnFact val={4} handleTab={handleTab} currentTab={currentTab}/>
            </div>
            <div className="tab-display">
                {currentTab===1 && <CastInfo credits = {credits}/>}
                {currentTab===2 && <CrewInfo credits = {credits}/>}
                {currentTab===3 && <Details movie = {movie}/>}
                {currentTab===4 && <Comments movieId = {movie.id} loggedUser={loggedUser}/>}
            </div>
        </div>
    )
}






function Details({movie}){
    const {release_date, runtime, genres, production_countries, production_companies, spoken_languages, budget, revenue, imdb_id, homepage} = movie
    const hours = (Math.floor(runtime / 60))
    const hourText = hours===1 ? "hour" : "hours";
    const minuteText = runtime % 60===1 ? "minute" : "minutes";
    const releaseDate = new Date(release_date).toString().split(" ").slice(0, 4).join(" ")
    const genreMap = genres.map((genre, i)=><div key={i} className="genre-icon">{genre.name}</div>)
    const languagesElem = spoken_languages.map((lang, i)=>{
        return <div key={i}>{`${lang.english_name}${i===spoken_languages.length-2 ? " and" : ""}${i<spoken_languages.length-2 ? ",": ""}`} </div>
    })

    return (
        <>
            <div className="detail-box">
                <p>Runtime</p>
                <span>{`${hours} ${hourText} ${runtime % 60} ${minuteText}`}</span>
            </div>
            <div className="detail-box">
                <p>Release date</p>
                <span>{releaseDate}</span>
            </div>
            <div className="detail-box">
                <p>Genres</p>
                <div className="genre-div">
                    {genreMap}
                </div>
            </div>
            <div className="detail-box">
                <p>Production Country</p>
                <span>{production_countries[0].name}</span>
            </div>
            <div className="detail-box">
                <p>Production Companies</p>
                <p>{production_companies[0].name} {production_companies.length >1 && (<span> and {production_companies.length-1} more</span>)}</p>
            </div>
            <div className="detail-box">
                <p>Spoken languages</p>
                <div className="lang-div">{languagesElem}</div>
            </div>
            <div className="detail-box">
                <p>Budget</p>
                <div className="lang-div">{formatCurrency(budget)}</div>
            </div>
            <div className="detail-box">
                <p>Revenue</p>
                <div className="lang-div">{formatCurrency(revenue)}</div>
            </div>
            <div className="detail-box">
                <p>Links</p>
                <div className="links-div">
                    <a href={`https://www.imdb.com/title/${imdb_id}`}>IMDB</a>
                    <a href={homepage}>WWW</a>

                </div>
            </div>
        </>
    )
}






function CrewInfo({credits}){
    const sortProd= credits.crew.sort((a,b)=>a.department==="Production" ?-1:1)
    const sortDir= credits.crew.sort((a,b)=>a.department==="Directing" ?-1:1)
    const mapped = sortDir.map((elem, i)=>{
        return (
            <div className="crew-square" key={i}>
                <p>{elem.name}</p>
                <span>{elem.department}</span>
            </div>
        )
    })
    return( <>{mapped}</>)
}
function CastInfo({credits}){
    const arr = credits.cast;
    const mappedCharacters = arr.map((obj, i)=>{
        return (
            <div className="actor-square" key={i}>
                {obj.profile_path!==null ? <img src={"https://image.tmdb.org/t/p/w500" + obj.profile_path} /> : <img src={noImg} />}
                <div>
                    <h2>{obj.name}</h2>
                    <span>as</span>
                    <p>{obj.character}</p>
                </div>
            </div>
        )
    })
    return (<>{mappedCharacters}</>)
}


function BtnFact({val, handleTab, currentTab}){
    let text = "";
    switch(val){
        case 1: text="CAST"; break;
        case 2: text="CREW"; break;
        case 3: text="DETAILS"; break;
        case 4: text="COMMENTS"; break;
    }
    return <button onClick={()=>handleTab(val)} className={val===currentTab ? "selected-tab" : ""}>{text}</button>
}

function formatCurrency(num){
    const dol = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return dol.format(num)
}