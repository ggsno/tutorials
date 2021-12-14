import { useState, useEffect } from "react";
import Movie from "../components/Movie";

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    (async () => {
      const json = await (
        await fetch(
          "https://yts.mx/api/v2/list_movies.json?minimum_rating=3&sort_by=year"
        )
      ).json();
      setMovies(json.data.movies);
      setLoading(false);
    })();
  }, []);
  return (
    <div>
      <h1>Movie {movies.length > 0 ? ` : ${movies.length}` : ""}</h1>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {movies.map((movie) => (
            <Movie
              id={movie.id}
              key={movie.id}
              title={movie.title}
              coverImg={movie.medium_cover_image}
              genres={movie.genres}
              summary={movie.summary}
            />
          ))}
        </ul>
      )}
    </div>
  );
}