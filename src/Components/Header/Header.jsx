import '/src/Components/Header/Header.css';
import Searchbar from '../Searchbar/Searchbar';
import Login from '../Login/Login';


export default function Header(userFunctions){
    return (
        <div id="header">
            <Searchbar />
            <Login userFunctions={userFunctions}/>
        </div>
    )
}