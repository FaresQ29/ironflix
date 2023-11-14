import { useEffect } from 'react';
import { readLocal } from '../../Components/LocalAPI/LocalApi';
import findAPI from '/src/Components/API/FindAPI.jsx'
import '/src/Pages/Watchlist/Watchlist.css';
export default function Watchlist({loggedUser}){

    async function getArr(arr){

        
        arr.forEach(async elem=>{
            const mov = await findAPI(elem)
            console.log(mov);
        })
        async function getMovie(id){
            const mov = await findAPI(id);
            return mov
        }
    




    }
    useEffect(()=>{
        getArr(loggedUser.watchlists);

    }, [])

    return (
        <div id="watchlist-main">
            
        </div>
    )
}