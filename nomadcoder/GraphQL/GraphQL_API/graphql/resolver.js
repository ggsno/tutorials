import { getById, getMovies } from "./db.js";

const resolvers = {
  Query: {
    getMovies: () => getMovies(),
    getById: (_, { id }) => getById(id),
  },
  
};


export default resolvers;

