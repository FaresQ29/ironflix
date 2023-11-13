import { useEffect } from 'react';
import { readLocal } from '../../Components/LocalAPI/LocalApi';
import '/src/Pages/Watchlist/Watchlist.css';
export default function Watchlist({loggedUser}){
    console.log(loggedUser);
    async function getArr(){
        const usersArr = await readLocal()
        console.log(usersArr);
    }
    useEffect(()=>{
        getArr()

    }, [])

    return (
        <div id="watchlist-main">
            
        </div>
    )
}