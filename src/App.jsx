import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Mylists from '/src/Pages/Mylist/Mylists.jsx';
import Watchlist from "./Pages/Watchlist/Watchlist";
import Favorites from '/src/Pages/Favorites/Favorites.jsx';
import MoviePage from "./Pages/MoviePage/MoviePage";
import Popular from '/src/Pages/Popular/Popular.jsx';
import Random from "./Pages/Random/Random";
import Header from "./Components/Header/Header";
import { useState } from "react";


function App() {
  const [loggedUser, setLoggedUser] = useState(null);
  
  function setUser(val){setLoggedUser(val)}
  return (
    <>
    <Header loggedUser={loggedUser} setUser={setUser}/>
    <Navbar />
    <div id="main-container">
    <Routes>
      <Route path="/" element={<Home loggedUser={loggedUser}/>}/>
      <Route path="/watchlist" element={<Watchlist />}/>
      <Route path="/mylists" element={<Mylists />}/>
      <Route path="/favorites" element={<Favorites />}/>
      <Route path="/popular" element={<Popular />}/>
      <Route path="/random" element={<Random/>}/>
      <Route path="/:movieId" element={<MoviePage loggedUser={loggedUser} />}/>
    </Routes>
    </div>

    </>
  )
}

export default App
