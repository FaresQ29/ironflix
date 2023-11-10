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
function App() {


  return (
    <>
    <Header />
    <Navbar />
    <div id="main-container">
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/watchlist" element={<Watchlist />}/>
      <Route path="/mylists" element={<Mylists />}/>
      <Route path="/favorites" element={<Favorites />}/>
      <Route path="/popular" element={<Popular />}/>
      <Route path="/random" element={<Random />}/>
      <Route path="/:movieId" element={<MoviePage />}/>
    </Routes>
    </div>

    </>
  )
}

export default App
