import '/src/Components/Lists/list.css';
import { readUserLists, writeUserList} from '../LocalAPI/ListsApi';
import { useState, useEffect } from 'react';
import findAPI from '/src/Components/API/FindAPI.jsx'
import checkmark from '/src/assets/checkmark.png'
export default function CreateList({clickedFilm, user, renderListMenu}){
    const [currentList, setCurrentList] = useState(null)
    const [dropChoice, setDropChoice] = useState(null)
    const [choiceId, setChoiceId] = useState(null)
    const [fetching, setFetching] = useState(true)
    const [isOpen, setIsOpen] = useState(false);
    const btnClass = choiceId===null ? "disable-btn" : "";
    const {title} = clickedFilm
    function setChoice(obj, text){
        setDropChoice(text)
        setChoiceId(obj.listId)
        setIsOpen(false)
    }
    function handleDrop(){setIsOpen(prev =>!prev)}
    useEffect(()=>{
        async function getList(){
            const list = await readUserLists(user.id)
            setCurrentList(list)
            setFetching(false)
        }
        getList()
    }, [])
    function addToList(obj){
        setCurrentList(prev=>{
            return [...prev, obj]
        })
    }
    function closeDrop(e){
        if(e.target.closest(".list-window-dropdown")===null){setIsOpen(false)}
    }
    function closeModal(e){
        if(!e.target.closest(".list-window")){
            renderListMenu(false, null)
        }
    }
    function addMovieToList(){
        if(choiceId===null) return
        const addedList = currentList.map(list=>{
            if(list.listId===choiceId){
                list.movies.push(clickedFilm.id)
                return list
            }
            return list
        })
        user.lists = addedList
        writeUserList(user.id, user)
        renderListMenu(false, null)
    }
    return (
        <div className="bg-list" onClick={closeModal}>
            <span id="bg-list-close">X</span>
            <div className="list-window" onClick={e=>closeDrop(e)}>
                <h2>Add '<span>{title}</span>' to a list</h2>
                {fetching && <h3>Getting data...</h3>}
                {!fetching && (
                    <>
                        <ListDropdown movList = {currentList} setChoice={setChoice} isOpen={isOpen} handleDrop={handleDrop} dropChoice={dropChoice}  movieId={clickedFilm.id}/>
                        {dropChoice && (<p className="chosen-drop">Chosen list: <span>{dropChoice}</span></p>)}
                        <div className="create-list-separator"><div></div><span>OR</span><div></div></div>
                        <CreateNewList user={user} addToList={addToList}/>
                        <div className="create-list-separator"><div></div><div></div></div>
                        <button className={`drop-final-button ${btnClass}`} onClick={addMovieToList}>
                            {choiceId===null ? "Pick a list" :`Save to "${dropChoice}"`}
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}



function CreateNewList({user, addToList, text}){
    const [inputVal, setInputVal] = useState("")
    async function saveList(e){
        e.preventDefault()
        if(inputVal.length===0) return
        const wlArr = user.lists
        const listObj = {listName: inputVal, listId: crypto.randomUUID(), movies: []}
        wlArr.push(listObj)
        await writeUserList(user.id, user)
        addToList(listObj)
        setInputVal("")
    }
    return (
        <form className="add-new-list-form">
            <label htmlFor="create-new-list">Create a new list</label>
            <input type="text" id="create-new-list" placeholder="Enter list name" value={inputVal} onChange={(e)=>{setInputVal(e.target.value)}}/>
            <button onClick={saveList}>Save List</button>
        </form>
    )
}

function ListDropdown({movList, setChoice, isOpen, handleDrop, movieId}){
    const listText = movList.length===0 ? "No lists yet" : `Choose list (${movList.length} items)`
    const dropClass = isOpen ? "drop-container-open" : "";

    return (
        <>
            <div className='list-window-dropdown'>
                    <div className="drop-title" onClick={handleDrop}>{listText}</div>
                        <div className={`drop-container ${dropClass}`}>
                            {movList.map((mov, i)=>{
                                const isMovieInList = mov.movies.includes(movieId);
                                return <ListOption key={i} setChoice={setChoice} mov={mov} isMovieInList={isMovieInList}/>
                            })}
                        </div>
            </div>

        </>
    )
}


function ListOption({mov, setChoic, isMovieInList, setChoice}){
    const [isPreview, setIsPreview] = useState(false);
    const [prevItems, setPrevItems] = useState("");
    const movList = mov.movies;

    useEffect(()=>{
        async function getPrevItems(){
            const movTitlesArr=[]
             mov.movies.forEach(async (movId)=>{
                const movObj = await findAPI(movId)

                movTitlesArr.push(movObj.title)
            })
            setPrevItems(movTitlesArr)
        }
        getPrevItems()
    }, [])
    return (
        <div className="list-item-outer">
            <div className="list-item" 
                onMouseEnter={()=>setIsPreview(true)}  
                onMouseLeave={()=>setIsPreview(false)}
                onClick={(e)=>setChoice(mov, e.target.textContent)}>
                <p>{mov.listName}</p>    
                {isMovieInList && (<img src={checkmark} />)}
            </div> 

            {isPreview && (
                <div className="list-preview">
                    {movList.length===0 && ("List is empty")}
                    {prevItems.length>0 && (
                        <>
                        <p>Movies in list:</p>
                        {prevItems.map((mov, i)=>{
                            return <div key={i} className="movie-preview-list">{mov}</div>     
                        })}
                        </>
                    )}
                </div>
            )}
        </div>

    )
}