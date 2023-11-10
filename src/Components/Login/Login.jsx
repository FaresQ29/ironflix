import { useState, useEffect } from "react";

export default function Login(){
    const [logStatus, setLogStatus] = useState(false)
    const [showModal, setShowModal] = useState(false)
    function displayModal(bool){
        setShowModal(bool);
    }
    return(
        <>
            {showModal && (
                <LogInModal displayModal = {displayModal} />
            )}
            {!logStatus && (
                <button onClick={()=>displayModal(true)}>Login/register</button>
            )}
        </>

    )
}

function LogInModal({displayModal}){
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    function handleInput(e){
        const {name, value} = e.target;
        setFormData(prevObj=>{
            return {...prevObj, [name] : value}
        })
    }

    return (
        <div id="login-modal" onClick={e=>e.target.id==="login-modal" && displayModal(false)}>
            <div id="login-square">
                <span onClick={()=>displayModal(false)}>X</span>
                <form>
                    <div className="form-input-div">
                        <label htmlFor="username-input">Username</label>
                        <input type="text" id="username-input" name= "username" value={formData.username} onChange={handleInput}/>
                    </div>
                    <div className="form-input-div">
                        <label htmlFor="username-password">Password</label>
                        <input type="password" id="username-password" name= "password" value={formData.password} onChange={handleInput}/>
                    </div>
                    <div className="form-btn-div">
                        <button>Login</button>
                        <button>Register</button>
                    </div>

                </form>
            </div>
        </div>
    )
}