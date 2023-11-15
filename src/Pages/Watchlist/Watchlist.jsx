import { useEffect, useState,useRef } from 'react';
import findAPI from '../../Components/API/FindAPI';
import '/src/Pages/Watchlist/Watchlist.css';
import MovieSquare from '../../Components/MovieSquare/MovieSquare';
import { Link } from 'react-router-dom';
export default function Watchlist({ loggedUser }) {
  const [movies, setMovies] = useState([]);
  
  const watchlist = loggedUser.watchlists;
  const movieDiv = useRef(null);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviePromises = watchlist.map(async (movie) => {
          const response = await findAPI(movie);
          return response;
        });
        // Wait for all promises to resolve
        const movieResults = await Promise.all(moviePromises);
        // Set the state with the array of movie results
        setMovies(movieResults);
      } catch (error) {
        console.log(error);
      }
    };
    // Call the function to fetch movies when the component mounts
    fetchMovies();
  }, [watchlist]); // Add watchlist as a dependency to re-run the effect when it changes
  console.log(movies);
  return (
    <>
        {!loggedUser && (<h1 className="log-in-msg">Log in to view and modify your lists...</h1>)}
        {loggedUser!==null && (
            <div id="watchlist-main" ref={movieDiv}>
            {/* Display movies or loading indicator */}
            {movies.length > 0 ? (
                movies.map((movie) => (
                    <Link key={movie.id} to={`/${movie.id}`}><MovieSquare movie={movie} loggedUser={loggedUser}/></Link>
                ))
            ) : (
                <p>Loading...</p>
            )}
            </div>
        )}

    </>

  );
}