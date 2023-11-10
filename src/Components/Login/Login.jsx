import { useState, useEffect } from "react";

export default function Login(){
    const [formData, setFormData] = useState({
        userName: "",
        password: ""
    })
    return(
        <div id="login-div">
            <label htmlFor="username-input">Username</label>
            <input type="text" />
        </div>
    )
}