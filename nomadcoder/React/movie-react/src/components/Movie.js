import PropTypes from "prop-types";
import { Link } from "react-router-dom";
export default function Movie({ id, title, coverImg, genres, summary }) {
  return (
    <div>
      <Link to={`/movie/${id}`}>
        <h2>{title}</h2>
      </Link>
      <img src={coverImg} alt="cover img" />
      <ul>
        {genres.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
      <p>{summary}</p>
    </div>
  );
}

Movie.propTypes = {
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.array.isRequired,
};
