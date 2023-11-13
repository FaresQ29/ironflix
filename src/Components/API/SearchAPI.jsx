
import axios from "axios"


export default async function apiSearch(str){

    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${str}`, {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NWUyYjhjNmE5N2NhODY1OWVhOGE3ZDFjYmY3MzllZSIsInN1YiI6IjY1NGI4MTU1NTMyYWNiNTMzNjFjYjZmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GjXjJ2tEpix3BfSUdVjext-pwcOGDvoPyan92t4IMbM'
        }
      })
      return response.data

}