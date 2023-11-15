import axios from "axios";

export async function readUserLists(id){
    const list = await axios.get("https://ironflix-mock-database.onrender.com/users/" + id)
    return list.data.lists;
}

export async function writeUserList(userId, obj){
    await axios.put("https://ironflix-mock-database.onrender.com/users/" + userId, obj)
}

