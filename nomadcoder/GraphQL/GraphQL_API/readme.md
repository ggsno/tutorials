# 시작

```jsx
// terminal

yarn add graphql-yoga
yarn add nodemon
yarn add @babel/cli @babel/core @babel/node @babel/preset-env
```

```jsx
// package.json

"scripts": {
	"start": "nodemon --exec babel-node index.js"
}
```

```jsx
// .babelrc

{
	"presets": ["@babel/preset-env"]
}
```

# GraphQL로 해결할 수 있는 것들

## over-fetching

- 사용할 정보보다 더 많은 정보를 받아 필요 없는 정보를 요청해야 하는 경우

## under-fetching

- 사용할 정보보다 더 적은 정보를 받아 여러 번 요청해야 하는 경우

## 하나의 엔드포인트

- URL이 없고 하나의 엔드포인트에서 요청 받고 응답 보냄

# 서버 만들기

```jsx
// index.js

import { GraphQLServer } from "graphql-yoga";

const server = new GraphQLServer({

})

server.start(() => console.log("Graphql Server Running"));
```

# Schema

- 사용자에게 보내거나 사용자로부터 받을 data에 대한 설명

```jsx
// graphql/schema.graphql

type Query {
  name: String!
}
```

## Query, Mutation, Resolver

### Query

- 서버로부터 데이터를 요청

### Mutation

- 서버의 데이터를 변경

### Resolver

- 쿼리나 뮤테이션을 처리하는 코드
- view나 URL 없이 query와 resolver로 프로그래밍

```jsx
// graphql/schema.graphql

type Movie {
  id: Int!
  title: String!
  score: Int!
}

type Query {
  movies: [Movie]!
  movie(id: Int!): Movie
}

type Mutation {
  addMovie(title: String!, score: Int!): String!
  deleteMovie(id: Int!): String!
}
```

```jsx
// graphql/resolver.js

import { movies, getById, addMovie, deleteMovie } from "./db";

const resolvers = {
  Query: {
    movies: () => movies,
    movie: (_, { id }) => getById(id),
  },
  Mutation: {
    addMovie: (_, { title, score }) => addMovie(title, score),
    deleteMovie: (_, { id }) => deleteMovie(id) ? "success" : "fail"
  }
};

export default resolvers;
```

- db, index 코드
    
    ```jsx
    
    // graphql/db.js
    
    const movies = [
      {
        "id": 0,
        "title": "dlwlrma",
        "score": 29,
      },
      {
        "id": 1,
        "title": "ppap",
        "score": 43,
      },
      {
        "id": 2,
        "title": "sujin",
        "score": 20,
      }
    ]
    
    const getById = (id) => {
      const index = movies.findIndex((movie) => movie.id === id);
      return index !== -1 ? movies[index] : null;
    }
    
    const addMovie = (title, score) => {
      const id = movies[movies.length - 1].id + 1;
      return movies.push({id, title, score});
    }
    
    const deleteMovie = (id) => {
      const index = movies.findIndex((movie) => movie.id === id);
      if (index !== -1) {
        movies.splice(index, 1);
        return true;
      } else {
        return false;
      }
    }
    
    export { movies, getById, addMovie, deleteMovie };
    ```
    
    ```jsx
    // index.js
    
    import { GraphQLServer } from "graphql-yoga";
    import resolvers from "./resolver";
    
    const server = new GraphQLServer({
      typeDefs: "graphql/schema.graphql",
      resolvers
    })
    
    server.start(() => console.log("Graphql Server Running"));
    ```
    

# playground

- graphql-yoga에 따라오는 테스트 페이지(포스트맨 같은거)

# +) error handling

- node-fetch 설치 후 require() of ES modules is not supported 오류시
    - package.json에 "type": "module" 추가
    - import된 모든 파일에 확장자 명을 표기
        - 변경 전 import getMovie from "./db"
        - 변경 후 import getMovie from "./db.js"
