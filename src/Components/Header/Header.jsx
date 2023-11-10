import '/src/Components/Header/Header.css';
import Searchbar from '../Searchbar/Searchbar';
import Login from '../Login/Login';


export default function Header(){
    return (
        <div id="header">
            <Searchbar />
            <Login />
        </div>
    )
}