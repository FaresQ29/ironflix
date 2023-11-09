import { Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar/Navbar"
import Home from "./Pages/Home/Home"
import Watchlist from "./Pages/Watchlist/Watchlist"
function App() {


  return (
    <>
    <Navbar />
    <div id="main-container">
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/watchlist" element={<Watchlist />}/>
    </Routes>
    </div>

    </>
  )
}

export default App
