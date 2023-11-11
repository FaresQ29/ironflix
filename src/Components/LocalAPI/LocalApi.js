const APIurl = "http://localhost:5005/users";
import axios from "axios";
export async function readLocal(){
    const res = await axios.get(APIurl);
    return res.data
}

export async function writeLocal(obj){
    const res = await axios.post(APIurl, obj);
    console.log(res.data);
    // console.log(obj);
    // await axios.post(APIurl, obj);
    
}