import { useState, useEffect } from "react";
import { readLocal, writeLocal } from "../LocalAPI/LocalApi";
export default function Login({userFunctions}){
    const {loggedUser, setUser } = userFunctions;
    const [logStatus, setLogStatus] = useState(false)
    const [showModal, setShowModal] = useState(false)

    function displayModal(bool){setShowModal(bool)}
    function logFunc(bool){
        setLogStatus(bool)
        if(!bool){setUser(null)}
    }

    return(
        <>
            {showModal && (
                <LogInModal displayModal={displayModal} logFunc={logFunc} setUser={setUser}/>
            )}
            {!logStatus && (
                <button onClick={()=>displayModal(true)}>Login/register</button>
            )}
            {logStatus && (
                <LoggedInDiv userName={loggedUser.username} logFunc={logFunc}/>
            )}
        </>
    )
}


function LoggedInDiv({userName, logFunc}){
    return (
        <div className="logged-in-div">
            <p id="logged-in-msg">Welcome {userName}</p>
            <button onClick={()=>logFunc(false)}>Log out</button>
        </div>
    )
}

function LogInModal({displayModal, logFunc, setUser}){
    const [showError, setShowError] = useState({msg: "", show: false})
    const [formData, setFormData] = useState({username: "", password: ""})

    function handleInput(e){
        const {name, value} = e.target;
        setFormData(prevObj=>{ return {...prevObj, [name] : value} })
    }

    function errorHandler(errorMsg){
        setShowError({msg: errorMsg, show: true})
        setTimeout(()=>{
            setShowError({msg: "", show: false})
        }, 3000)
    }
    async function checkUserAndPass(e){
        e.preventDefault()
        if(!checkIfUserExistsReg()) return
        const localUsers = await readLocal()
        const foundUser = localUsers.filter(user=>{
            return user.username === formData.username
        })
        if(foundUser.length===0){
            errorHandler("Username doesn't exist")
            return
        }
        else{
            if(formData.password === foundUser[0].password){
                logFunc(true)
                setUser(foundUser[0])
                displayModal(false)
            }
            else{
                errorHandler("Wrong password. Try again.")
                return
            }
        }
    }
    async function checkIfUserExistsReg(fromReg){
        if(formData.username.length===0){
            errorHandler("User name must not be empty")
            return false
        }
        if(formData.password.length===0){
            errorHandler("Password must not be empty")
            return false
        }
        const localUsers = await readLocal()
        
        const checkForUser = localUsers.every(user=>user.username !==formData.username)
        if(checkForUser===false && fromReg){
            errorHandler("Username already exists")
            return false
        }
        return checkForUser
    }

    async function register(e){
        e.preventDefault()
        if(await checkIfUserExistsReg(true) === false) return;
        const newObj = {...formData, "favorites": [], "lists": [], "watchlists": [], "id": crypto.randomUUID()}
        writeLocal(newObj)
        displayModal(false)
        logFunc(true)
        setUser(newObj)
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
                        {showError.show && <div className="error-message">{showError.msg}</div>}
                        <button onClick={checkUserAndPass}>Login</button>
                        <button onClick={register}>Register</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

