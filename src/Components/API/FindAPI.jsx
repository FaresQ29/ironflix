import axios from "axios";




export default async function findAPI(id){
  const url =  `https://api.themoviedb.org/3/movie/${id}?api_key=75e2b8c6a97ca8659ea8a7d1cbf739ee`;
    const response = await axios.get(url, {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NWUyYjhjNmE5N2NhODY1OWVhOGE3ZDFjYmY3MzllZSIsInN1YiI6IjY1NGI4MTU1NTMyYWNiNTMzNjFjYjZmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GjXjJ2tEpix3BfSUdVjext-pwcOGDvoPyan92t4IMbM'
      }
    })
      return response.data
      
}
