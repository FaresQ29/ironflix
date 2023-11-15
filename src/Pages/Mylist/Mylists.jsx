import { useEffect, useState } from 'react';
import '/src/Pages/Mylist/Mylists.css';
import { readUserLists, writeUserList } from '../../Components/LocalAPI/ListsApi';
import findAPI from '../../Components/API/FindAPI';
import addIcon from '/src/assets/add-icon.png';
import editIcon from '/src/assets/edit-icon.png';
import delIcon from '/src/assets/delete-icon.png'
const imgPath = "https://image.tmdb.org/t/p/w500";

export default function Mylists({loggedUser}){
    const [deleting, setDeleting] = useState(false)
    async function reRender(){
        setDeleting(true)
        await writeUserList(loggedUser.id, loggedUser)
        setDeleting(false)
    }
    return (
        <div className="my-lists-main">
            {loggedUser && (
                <>
                <AddToList />
                {console.log("render 1")}
                <div className="user-list-div">
                    {loggedUser.lists.map((list, i)=>{
                        return <ListCover key={i} list={list} reRender={reRender} user={loggedUser}/>
                    })}
                </div>

                </>
            )}
        </div>
    )
}


function ListCover({list, reRender, user}){
    const [editMode, setEditMode] = useState(false)
    function deleteList(){
        const removeList = user.lists.filter(elem=>{
            return elem.listId!== list.listId
        })
        user.lists = removeList
        reRender()
    }
    return (
            <div className='list-card-face'>
                <div className="list-title-div">
                    <p>{list.listName}</p>
                    <div className='edit-list-face'><img src={editIcon}/></div>
                    <div className='del-list-face' onClick={deleteList}><img src={delIcon}/></div>

                </div>
                <div className="list-card-face-info">
                    {list.movies.length===0 && ( <h1 className="list-card-empty">List is empty...</h1> )}
                    {list.movies.length > 0 && (
                        list.movies.map((mov, i)=>{
                            return <ListInfo movId={mov} list={list} key={i} reRender={reRender}/>
                        })
                    )}
                </div>
            </div> 
    )
}

function ListInfo({movId, list, reRender}){
    const [movData, setMovData] = useState(null);
    useEffect(()=>{
        async function getData(){
            const res = await findAPI(movId)
            setMovData({title: res.title, imgSrc: imgPath+res.poster_path})
        }
        getData()
    }, [])
    function deleteEntry(){
        const index = list.movies.indexOf(movId)
        list.movies.splice(index, 1)
        reRender()
    }

    return(
        <>
            {movData!==null && (
                <div className='list-card-square'>
                    <img src={movData.imgSrc} />
                     <p>{movData.title}</p>
                     <button onClick={deleteEntry}><img src={delIcon}/></button>
                </div>

            )}
        </>
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

