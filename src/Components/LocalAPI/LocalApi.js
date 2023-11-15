const APIurl = "https://ironflix-mock-database.onrender.com/users";
import axios from "axios";
export async function readLocal(){
    const res = await axios.get(APIurl);
    return res.data
}

export async function writeLocal(obj){

    const res = await axios.post(APIurl, obj);
    console.log(res.data);
    
}

export async function updateStatus(user){

    const res = await axios.put(`${APIurl}/${user.id}`, user);

}