import { useState } from "react";
import apiSearch from "../API/SearchAPI";

export default function Searchbar(){
    const [results, setResults] = useState("")
    const [fetching, setFetching] = useState(true)
    async function handleInput(e){
        const res = await apiSearch(e.target.value);
        setResults(res.results)
        setFetching(false)

    }
    return(
        <div className="search-container">
            <input type="text" placeholder="Search movies" id="main-searchbar" onChange={handleInput}/>
           
            <div className="search-results-div">
                {!fetching && (
                    results.map((res, i)=>{
                        return (
                            <div className="search-result-container" key={i}>
                              <p>{res.original_title}</p>
                            </div>
                        )

                    })
                )}
            </div>
        </div>
    
    )
}