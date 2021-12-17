import React from "react";
import { gql, useQuery } from "@apollo/client"
import Movie from "../components/Movie";

const GET_MOVIES = gql`
  {
    getMovies{
      id
      medium_cover_image
    }
  }
`;
const Home = () => {
  const { loading, error, data } = useQuery(GET_MOVIES);
  if (loading) return "Loading ...";
  if (data?.getMovies) {
    return (
      data.getMovies.map(movie => <Movie key={movie.id} id={movie.id}/>)
      );
    }
};


export default Home;