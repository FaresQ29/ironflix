import axios from "axios";
import { useState, useEffect } from "react";
import { getComments, writeCommentsNew, writeComments, getCommentID, delComment } from "../../../Components/LocalAPI/CommentApi";
import editIcon from '/src/assets/edit-icon.png';
import delIcon from '/src/assets/delete-icon.png'
export default function Comments({movieId, loggedUser}){
    return (
        <>
            {loggedUser && (
                <>
                    <CommentForm movieId={movieId} loggedUser={loggedUser}/>
                    <CommentHistory  movieId={movieId} loggedUser={loggedUser}/>
                </>
            )}
            {!loggedUser && (
                <div className="comment-must-login">
                    You must login or register to access comments...
                </div>
            )}
        </>
    )
}



function CommentHistory({movieId, loggedUser}){
    const [movieComments, setMovieComments] = useState([]);
    const [editMode, setEditMode] = useState("")

    useEffect(()=>{
        async function getComments(){
            try{
                const commentsArr = await getCommentID(movieId);
                setMovieComments(commentsArr.userComments)
            }
            catch{}
        }
        getComments()
    }, [])
    function handleEdit(commentId){
        setEditMode(commentId)

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
                                    <button onClick={()=>handleEdit(comment.commentId)}><img src={editIcon}/></button>
                                    <button onClick={()=>delComment(comment.commentId, movieId)}><img src={delIcon}/></button>
                                </div>
                            )}
                                </>
                            )}
                            {editMode === comment.commentId && (
                                <>
                                {editMode && (
                                <div className="edit-box">
                                    <input type="text" placeholder={comment.name}/>
                                    <textarea type="text" placeholder={comment.comment}/>
                                    <div>
                                        <button>Edit</button>
                                        <button onClick={()=>setEditMode("")} >Cancel</button>
                                    </div>

                                </div>
                            )}
                                </>
                            )}

                        </div>
                    )
                })
            )}
        </div>
    )
}




function CommentForm({movieId, loggedUser}){
    const [formData, setFormData] = useState({cName:"", cComment:""});

    function handleForm(e){
        const {name, value} = e.target;
        setFormData(prevVal=>{return {...prevVal, [name]:value}})
    }

    async function handleSubmit(e){
        e.preventDefault()
        if(formData.cName.length > 0 && formData.cComment.length > 0){
            const commentArr = await getComments()
            if(commentArr.length===0){
                const commentObj = createCommentObj(movieId, formData.cName, formData.cComment, loggedUser.id)
                await writeCommentsNew(commentObj)
            }
            else{
                const isMovie = commentArr.find(com=>com.id === movieId)
               if(!isMovie){
                    const commentObj = createCommentObj(movieId, formData.cName, formData.cComment, loggedUser.id)
                    await writeCommentsNew(commentObj)
                }
                else{
                    const commentObj = await getCommentID(movieId);
                    const date = new Date();
                    const userComments = commentObj.userComments
                    userComments.push(createCommentObj(false, formData.cName, formData.cComment, loggedUser.id))
                    await writeComments(commentObj, movieId)
                }
            }
            setFormData({cName:"", cComment:""})
        }
    }

    return(
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
    )
}

function createCommentObj(movieId, name, comment, userId){
    const date = new Date();

    const obj = {
        "id": movieId,
        "userComments": [{
            "name": name,
            "comment": comment,
            "userId": userId,
            "date": `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
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