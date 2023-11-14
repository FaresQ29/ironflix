import axios from "axios";

export async function readUserLists(id){
    const list = await axios.get("http://localhost:5005/users/" + id)
    return list.data.lists;
}

export async function writeUserList(userId, obj){
    await axios.put("http://localhost:5005/users/" + userId, obj)
}

