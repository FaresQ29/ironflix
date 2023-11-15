import { useEffect, useState } from 'react';
import '/src/Pages/Mylist/Mylists.css';
import { readUserLists } from '../../Components/LocalAPI/ListsApi';
import findAPI from '../../Components/API/FindAPI';
import addIcon from '/src/assets/add-icon.png';
import editIcon from '/src/assets/edit-icon.png';
const imgPath = "https://image.tmdb.org/t/p/w500";

export default function Mylists({loggedUser}){
    const [fetching, setFetching] = useState(true)
    const [movList, setMovList] = useState([])
    useEffect(()=>{
        if(!loggedUser) return 
        async function getUserList(){
            const idList = await readUserLists(loggedUser.id)
            if(idList.length===0){
                setFetching(false)
                return
            }
                const movArr = [];
                await idList.forEach(async list=>{
                    const cardArr = [];
                    await list.movies.forEach(async card=>{
                        const res = await findAPI(card)
                        const obj = {...card, title: res.title, movImg: imgPath + res.poster_path}
                        console.log(obj);
                        cardArr.push(obj)
                    })
                movArr.push({...list, movies: cardArr})
            })
            setMovList(movArr);
            setFetching(false)
        }
        getUserList()
    }, [loggedUser])

    return (
        <div className="my-lists-main">
            {loggedUser===null && (<h1 className="log-in-msg">Log in to view and modify your lists...</h1>)}
            {(!fetching && loggedUser) && (
                <>
                    <AddToList />
                    <div className="user-list-div">
                        {console.log(movList)}
                        {movList.length===0 ? <h1 className="log-in-msg">No lists...</h1> : (
                            movList.map((list, i)=><ListCover key={i} list={list}/>)
                        )}  
                    </div>
            
                </>

                
            )}
        </div>
    )
}

function ListCover({list}){

    return (
            <div className='list-card-face'>
                <div className="list-title-div">
                    <p>{list.listName}</p>
                <div><img src={editIcon}/></div>
                </div>
            </div> 
    )
}

function ListCoverz({listInfo}){

    return(
        <div className='list-card-face'>
            <div className="list-title-div">
                <p>{listName}</p>
                <div> <img src={editIcon}/></div>
            </div>
            <>
            {movList!==null && (
                <>
                    {movies.length===0 && (<div className='list-card-empty'>Empty list...</div>)}
                </>
            )}
            </>
        </div>
    )
}




function AddToList(){
    return(
        <div className="add-new-list-div">
            <h2>Add a new list</h2>
            <img src={addIcon}/>
        </div>
    )
}