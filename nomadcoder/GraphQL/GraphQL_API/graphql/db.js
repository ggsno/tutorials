import fetch from "node-fetch";

const API_URL_GETMOVIES = "https://yts.mx/api/v2/list_movies.json";
const API_URL_GETBYID = "https://yts.mx/api/v2/movie_details.json?movie_id=";
export const getMovies = async () => {
  return fetch(API_URL_GETMOVIES)
    .then(res => res.json())
    .then(json => json.data.movies);
}

export const getById = async (id) => {
  return fetch(API_URL_GETBYID + id)
    .then(res => res.json())
    .then(json => json.data.movie);
}