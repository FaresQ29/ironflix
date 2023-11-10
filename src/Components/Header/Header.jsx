import '/src/Components/Header/Header.css';
import Searchbar from '../Searchbar/Searchbar';
import ironflixLogo from '/src/assets/ironflix-logo.png';



export default function Header(){
    return (
        <div>
            <Searchbar />
            <img src={ironflixLogo} alt="ironflix logo" id="main-logo"/>
        </div>
    )
}