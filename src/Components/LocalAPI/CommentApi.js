import axios from "axios";


const APIurl = "https://ironflix-mock-database.onrender.com/comments";


export async function getComments(){
    const res = await axios.get(APIurl);
    return res.data
}
export async function getCommentID(id){
        const res = await axios.get(APIurl + "/"+ id);
        return res.data
}

export async function delComment(commentId, movieId){
    const movieObj = await getCommentID(movieId)
    const removed= movieObj.userComments.filter(comment=>comment.commentId !== commentId)
    const newObj = {...movieObj, userComments : removed};
    await axios.put(APIurl + "/"+ movieId, newObj);
}
export async function editComment(movieId, obj){
    const movieObj = await getCommentID(movieId)
    await axios.put(APIurl + "/"+ movieId,obj);
}


export async function writeCommentsNew(obj){
    await axios.post(APIurl, obj);
}

export async function writeComments(obj,id){
    const res = await axios.put(APIurl + "/"+ id, obj);

}