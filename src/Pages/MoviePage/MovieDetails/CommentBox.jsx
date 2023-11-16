import axios from "axios";
import { useState, useEffect } from "react";
import { getComments, writeCommentsNew, writeComments, getCommentID, delComment, editComment } from "../../../Components/LocalAPI/CommentApi";
import editIcon from '/src/assets/edit-icon.png';
import delIcon from '/src/assets/delete-icon.png'
export default function Comments({movieId, loggedUser}){
    return (
        <>
            {loggedUser && (
                <>
                    <CommentForm movieId={movieId} loggedUser={loggedUser} />
                </>
            )}
            {!loggedUser && (<div className="comment-must-login">You must login or register to access comments...</div>)}
        </>
    )
}




function CommentForm({movieId, loggedUser}){
    const [formData, setFormData] = useState({cName:"", cComment:""});
    const [fetching, setFetching] = useState(false)
    const [getCom, setGetCom] = useState(null)
    function changeFetch(val){setFetching(val)}
    function handleForm(e){
        const {name, value} = e.target;
        setFormData(prevVal=>{return {...prevVal, [name]:value}})
    }
    useEffect(()=>{
       changeFetch(false)
    }, [getCom])
    async function handleSubmit(e){
        e.preventDefault()
        setFetching(true)
        if(formData.cName.length > 0 && formData.cComment.length > 0){
                const commentArr = await getComments()
                if(commentArr.length===0){
                    const commentObj = createCommentObj(movieId, formData.cName, formData.cComment, loggedUser.id)
                    await writeCommentsNew(commentObj)
                    setGetCom([commentObj])
                }
                else{
                   const isMovie = commentArr.find(com=>com.id === movieId)
                   if(!isMovie){
                        const commentObj = createCommentObj(movieId, formData.cName, formData.cComment, loggedUser.id)
                        await writeCommentsNew(commentObj)
                        setGetCom(prev=>{
                           const val = prev===null ? [] : prev;
                            return [...val, {commentObj}]
                        })
                    }
                    else{
                        const commentObj = await getCommentID(movieId);
                        const userComments = commentObj.userComments
                        userComments.push(createCommentObj(false, formData.cName, formData.cComment, loggedUser.id))
                        await writeComments(commentObj, movieId)
                        setGetCom(prev=>{
                           const val = prev===null ? [] : prev;
                            return [...val, {commentObj}]
                        })
                    }
                }
                
            setFormData({cName:"", cComment:""})
            setFetching(false)
        }
    }

    return(
        <>
        <form>
            <div className="form-div">
                <label htmlFor="c-form-name">Name</label>
                <input type="text" id="c-form-name" name="cName" value={formData.cName} onChange={handleForm}/>
            </div>
            <div className="form-div">
                <label htmlFor="c-form-comment">Comment</label>
                <textarea type="text" id="c-form-comment" name="cComment" value={formData.cComment} onChange={handleForm}/>
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </form>
        {!fetching && (
            <CommentHistory  movieId={movieId} loggedUser={loggedUser} changeFetch= {changeFetch}/>
        )}
            
        </>

    )
}

function CommentHistory({movieId, loggedUser, changeFetch}){
    const [movieComments, setMovieComments] = useState([]);
    const [editMode, setEditMode] = useState("")
    const [editForm, setEditForm] = useState({eName:"", eComment: ""});

    useEffect(()=>{

        async function getComments(){
            try{
                const movieCommentArr = await getCommentID(movieId);
                setMovieComments(movieCommentArr.userComments)
            }
            catch{}
        }
        getComments()
    }, [])
    function handleForm(e){
        const {name, value} = e.target;
        setEditForm(prev=>{return {...prev, [name]:value}})
    }
    function handleEdit(comment){
        setEditForm({eName: comment.name, eComment: comment.comment})
        setEditMode(comment.commentId)
    }
    async function submitEdit(e, id){
        e.preventDefault()
        changeFetch(true)
        if(editForm.eName.length<1 && editForm.eComment.length<1) return
        const commentsArr = await getCommentID(movieId);
        commentsArr.userComments.map(elem=>{ 
            if(elem.commentId===id){
                elem.name = editForm.eName
                elem.comment = editForm.eComment
                elem.edited = getStringDate()
                return elem
            }
            return elem
        })
        setEditMode("")
        await editComment(movieId, commentsArr)
        changeFetch(false)
    }
    async function del(comId){
        changeFetch(true)
        await delComment(comId, movieId)
        changeFetch(false)

        
    }
    return(
        <div className="comment-history-div">
            {movieComments.length===0 && <div className ="empty-comments-div">No comments...</div>}
            {movieComments.length>0 && (
                movieComments.map((comment, i)=>{
                    return (
                        <div className="comment-box" key={i}>
                            {editMode !== comment.commentId && (
                                <>
                            <h3>{comment.name} <span>{comment.date}</span></h3>
                            <p>{comment.comment}</p>  
                            {comment.userId === loggedUser.id && (
                                <div className="comment-btns">
                                    <button onClick={()=>handleEdit(comment)}><img src={editIcon}/></button>
                                    <button onClick={()=>del(comment.commentId)}><img src={delIcon}/></button>
                                </div>
                            )}
                                </>
                            )}
                            {editMode === comment.commentId && (
                                <>
                                {editMode && (
                                <form className="edit-box">
                                    <input type="text"  name="eName" value={editForm.eName} onChange={handleForm}/>
                                    <textarea type="text" name="eComment" value={editForm.eComment} onChange={handleForm}/>
                                    <div>
                                        <button onClick={(e)=>submitEdit(e, comment.commentId)}>Edit</button>
                                        <button onClick={()=>setEditMode("")} >Cancel</button>
                                    </div>

                                </form>
                            )}
                                </>
                            )}
                        </div>
                    )
                }).reverse()
            )}
        </div>
    )
}




function createCommentObj(movieId, name, comment, userId){


    const obj = {
        "id": movieId,
        "userComments": [{
            "name": name,
            "comment": comment,
            "userId": userId,
            "date": getStringDate(),
            "commentId": crypto.randomUUID()
        }]
    }
    if(movieId){
        return obj
    }
    else{
        return obj.userComments[0];
    }
}

function getStringDate(){
    const date = new Date();
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
}