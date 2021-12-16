# set up

```jsx
// terminal
yarn add styled-components react-router-dom apollo-boost @apollo/react-hooks graphql
```

# apollo-boost

- GraphQL Yoga와 같이 설정이 미리 되어있는 package
- GraphQL Yoga : 바로 쓸 수 있게 준비해둔 server
- apollo-boost : 바로 쓸 수 있게 준비해둔 client
- 서버가 하나의 엔드포인트를 가지고 있기 때문에 apollo client에는 하나의 URL만 들어감

# apollo client

- 렌더링 하는 컴포넌트를 apollo provider를 이용해 감싸서 client를 연결

```jsx
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
```

# query

- query는 컴포넌트 바깥에 둠

```jsx
// Home.js 컴포넌트
import React from "react";
import { gql, useQuery } from "@apollo/client"

const GET_MOVIES = gql`
  {
    movies{
      id,
      medium_cover_image
    }
  }
`;

export default () => {
  const { loading, error, data } = useQuery(GET_MOVIES);
  if (loading) return "Loading ...";
  if (data && data.movies) return data.movies.map(movie => <h1>{movie.id}</h1>);
};

```

# +) error handling

## route 에러

> index.tsx:19 Uncaught Error: A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>
> 
- react-router-dom의 버전이 업데이트 되면서 Route엘리먼트는 반드시 Routes 아래에 있어야 함

```jsx
<Router>
  <Routes>
    <Route exact path="/" element={<Home />} />
    <Route path="/:id" element={<Detail />} />
  </Routes>
</Router>
```

## client 에러

> Uncaught Invariant Violation: To initialize Apollo Client, you must specify a 'cache' property in the options object.
> 
- 아폴로 클라이언트의 v3버전 이후에는 새로운 클라이언트 객체를 만들 때 반드시 캐시를 추가해 줘야함
- After Apollo Client updated to v3, 'apollo-boost' and '@apollo/react-hooks' seem to be merged into '@apollo/client'.

```jsx
import { ApolloClient, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache(); 

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache,
})

export default client;
```