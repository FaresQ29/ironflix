import axios from "axios";
import { useState, useEffect } from "react";

export default async function callAPI(page){
    const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
      params: {
        'include_adult': 'false',
        'include_video': 'false',
        'language': 'en-US',
        'page': `${page}`,
        'sort_by': 'popularity.desc'
      },
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NWUyYjhjNmE5N2NhODY1OWVhOGE3ZDFjYmY3MzllZSIsInN1YiI6IjY1NGI4MTU1NTMyYWNiNTMzNjFjYjZmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GjXjJ2tEpix3BfSUdVjext-pwcOGDvoPyan92t4IMbM',
        'accept': 'application/json'
      }
    });
    return response.data

}

/*
export default function callAPI(page){
  const [arr, setArr] = useState([]);
    useEffect(()=>{
        async function getApi(){
            const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
              params: {
                'include_adult': 'false',
                'include_video': 'false',
                'language': 'en-US',
                'page': `${page}`,
                'sort_by': 'popularity.desc'
              },
              headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NWUyYjhjNmE5N2NhODY1OWVhOGE3ZDFjYmY3MzllZSIsInN1YiI6IjY1NGI4MTU1NTMyYWNiNTMzNjFjYjZmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GjXjJ2tEpix3BfSUdVjext-pwcOGDvoPyan92t4IMbM',
                'accept': 'application/json'
              }
            });
            setArr(response.data)
          } 
          getApi()
    }, [])

}
*/