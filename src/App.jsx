import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Mylists from '/src/Pages/Mylist/Mylists.jsx';
import Watchlist from "./Pages/Watchlist/Watchlist";
import MoviePage from "./Pages/MoviePage/MoviePage";
import Header from "./Components/Header/Header";
import { useState } from "react";


function App() {
  const [loggedUser, setLoggedUser] = useState(null);
  const [comments, setComments] = useState(null)
  function setUser(val){setLoggedUser(val)}
  function setAllComments(val){setComments(val)}
  return (
    <>
    <Header loggedUser={loggedUser} setUser={setUser} comments={comments}/>
    <Navbar />
    <div id="main-container">
    <Routes>
      <Route path="/" element={<Home loggedUser={loggedUser}/>}/>
      <Route path="/watchlist" element={<Watchlist  loggedUser={loggedUser}/>}/>
      <Route path="/mylists" element={<Mylists  loggedUser={loggedUser}/>}/>
      <Route path="/:movieId" element={<MoviePage loggedUser={loggedUser} setAllComments={setAllComments} comments={comments}/>}/>
    </Routes>
    </div>

    </>
  )
}

export default App
