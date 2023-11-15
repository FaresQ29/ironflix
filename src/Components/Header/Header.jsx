import '/src/Components/Header/Header.css';
import Searchbar from '../Searchbar/Searchbar';
import ironFlixLogo from '/src/assets/ironflix-logo.png'
import Login from '../Login/Login';
import { Link } from 'react-router-dom';

export default function Header(userFunctions){
    function testing(){
        console.log(userFunctions.loggedUser)
    }
    
    return (
        <div id="header">
            <img src={ironFlixLogo} id="main-logo" onClick={testing}/>
            <Searchbar />
            <Login userFunctions={userFunctions}/>
        </div>
    )
}