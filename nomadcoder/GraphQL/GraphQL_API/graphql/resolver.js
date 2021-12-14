import { getMovies } from "./db.js";

const resolvers = {
  Query: {
    movies: () => getMovies()
  },
  
};


export default resolvers;