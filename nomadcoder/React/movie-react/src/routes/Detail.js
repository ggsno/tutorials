import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Detail() {
  const { id } = useParams();
  const [movieInfo, setMovieInfo] = useState(null);
  useEffect(() => {
    (async () => {
      const json = await (
        await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      ).json();
      setMovieInfo(json.data.movie);
    })();
  }, []);
  return <h1>{movieInfo ? movieInfo.title : "Loading ..."}</h1>;
}
