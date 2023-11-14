import { useEffect, useState } from "react";
import apiSearch from "../API/SearchAPI";
import noImg from '/src/assets/no-img.png'
import { Link, useNavigate } from "react-router-dom";

export default function Searchbar(){
    const [results, setResults] = useState("")
    const [fetching, setFetching] = useState(true)
    const [inputVal, setInputVal] = useState("")
    const navigate = useNavigate()
 

    async function handleInput(e){
        setFetching(true)
        setInputVal(e.target.value)
        const res = await apiSearch(inputVal);
        setResults(res.results)
        setFetching(false)
    }

    function handleClick(id){
        setInputVal("");
        navigate(`/${id}`)

    }
    return(
        <div className="search-container">
            <input type="text" placeholder="Search movies" name="inputVal" id="main-searchbar" onChange={handleInput} value={inputVal}/>
           {inputVal.length>0 && (
            <div className="search-results-div">
            {fetching && <div>Getting results</div>}
            {!fetching && (
                results.map((res, i)=>{
                    let imgPath = res.poster_path !== null ?"https://image.tmdb.org/t/p/w500" + res.poster_path : noImg;
                    return (
                            <div className="search-result-container" key={i}  onClick={()=>handleClick(res.id)}>
                                <img src={imgPath} alt="" />
                                <p>{res.original_title}</p>
                            </div>

                    )

                })
            )}
        </div>
           ) }

        </div>
    
    )
}