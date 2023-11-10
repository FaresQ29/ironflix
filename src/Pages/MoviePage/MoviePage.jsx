import '/src/Pages/MoviePage/MoviePage.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import findAPI from '../../Components/API/FindAPI';
import creditAPI from '../../Components/API/CreditAPI';
export default function MoviePage(){
    const [movie, setMovie] = useState(null)
    const [fetching, setFetching] = useState(true)
    const {movieId} = useParams();
    useEffect(()=>{
        async function findMovie(){
            try{
                const response = await findAPI(movieId)
                const credits = await creditAPI(movieId)
                setMovie(response.data)
            }
            catch(error){console.log(error);}
        }
        findMovie()
    }, [])

    return(
        <>
   
        </>
    )
}