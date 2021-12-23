# why react?

- UI를 쉽게 interactive하게 해줌
    - 기존 작업 : HTML 작성 → js에서 element 가져옴 → event handle→ HTML를 업데이트 해주는 코드를 js에 작성
    - react : js에서 바로 작업 (react가 HTML으로 바꿔줌)

# basic of react

## package

```jsx
<script src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"></script>

const root = document.querySelector('#root');
...
```

- react : interactive한 UI를 만들 수 있는 library. 엔진의 역할 수행
- react-DOM : react element들을 HTML body에 넣어주는 library

## Create React App

```jsx
// terminal
npx create-react-app my-app
```

## create element

```jsx
const ppap = React.createElement(
  "div",
  {
    id: 0,
    style: {
      color: "red",
    },
    onClick: () => console.log("clicked"),
  },
  "click me"
);
```

- React.createElement( HTML tag 이름, property, 내용 )

## JSX

```jsx
const Title = () => (
  <h3 id="title" onMouseEnter={() => console.log("mouse enter")}>
    Hello
  </h3>
);
const Btn = () => (
  <button
    style={{ backgroundColor: "tomato" }}
    onClick={() => console.log("clicked")}
  >
    click me
  </button>
);
```

## component nesting

```jsx
const Container = (
  <div>
    <Title /> <Btn />
  </div>
);

```

- component는 첫 글자가 꼭 대문자여야 함

## render

```jsx
ReactDOM.render(Container, root);
```

- ReactDOM.render(element, container[, callback])
- React 엘리먼트를 container DOM에 렌더링하고 컴포넌트에 대한 참조를 반환

# state

- 데이터가 저장되는 공간

```jsx
const MinutesToHours = () => {
    const [minutes, setMinutes] = React.useState(0);
    const [converted, setconverted] = React.useState(false);
    const onChange = (event) => {
      setMinutes(event.target.value);
    }
    const onReset = () => setMinutes(0);
    const onFlip = () => setconverted(!converted);
    return (
      <div>
        <h3>Minute to Hour</h3>
        <div>
          <label htmlFor="minutes">minutes</label>
          <input
            id="minutes"
            placeholder="minutes"
            type="number"
            value={minutes}
            onChange={onChange}
            disabled={converted}
          />
        </div>
        <div>
          <label htmlFor="hours">hours</label>
          <input
            id="hours"
            placeholder="hours"
            type="number"
            disabled={!converted}
            value={converted ? Math.floor(minutes / 60) : minutes}
          />
        </div>
        <button onClick={onReset}>Reset</button>
        <button onClick={onFlip}>Flip</button>
      </div>
    );
  }
ReactDOM.render(<MinuitesToHours />, root);
```

## re-rendering

- 이전 렌더링을 체크해서 바뀐 부분만 렌더링 함
- useState의 반환 배열의 두 번째 값에 바인딩된 함수를 호출 시 리렌더링 됨

# props

- 컴포넌트 간 데이터를 보낼 수 있게 함

## propType 패키지

- prop에 전달되는 데이터의 타입을 고정 시켜줌

```jsx
MyComponent.propTypes = {
	myPropNum: PropType.number.isRequired,
	myPropStr: PropType.string
}
```

# CSS

- CSS를 주는 방법들
    1. render하는 js파일에 CSS파일을 import
        
        ```jsx
        import ReactDOM from "react-dom";
        import App from "./App";
        import "./styles.css";
        
        ReactDOM.render(
        	<App />,
        	document.getElementById("root")
        );
        ```
        
    2. property로 style 값을 전달
    3. CSS module 사용
        
        ```css
        /* Button.module.css */
        .btn {
        	color: "red"
        }
        ```
        
        ```jsx
        // Button.js
        import styles from "./Button.module.css"
        
        const Button = ({text}) => {
          return (
            <button className={styles.btn}>
              {text}
            </button>
          );
        }
        
        export default Button;
        ```
        

# effect

- state가 바뀔 때 마다 새로 render됨
- API call처럼 한 번만 해도 되는 것도 render 될 때마다 call 됨
- useEffect(callback, dependent list)

```jsx
import { useState, useEffect } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onChange = (event) => {
    setKeyword(event.target.value);
  };
  const onClick = () => {
    setCounter(counter + 1);
  };
  console.log("I'm called easily")
  useEffect(() => {
    if (keyword.length > 1) {
      console.log(keyword);
    }
  }, [keyword]);
  return (
    <div>
      <input onChange={onChange}/>
      <h3>clicked : {counter}</h3>
      <button onClick={onClick}>click me</button>
    </div>
  );
}

export default App;
```

# 알아둬

- component는 단지 jsx를 return하는 function임

# Cleanup

- component가 destroy됐을 때 실행되는 함수
- useEffect의 콜백함수의 리턴 값으로 전달되는 함수

```jsx
import { useState, useEffect } from "react";

function Hello() {
  useEffect(() => {
    console.log("created :>");
    return () => console.log("destroyed :<");
  },[]);
  return (
    <h3>Hello !</h3>
  )
}

function App() {
  const [showing, setShowing] = useState(false);
  const onClick = () => {
    setShowing(!showing);
  }
  return (
    <div>
      <button onClick={onClick}>{showing ? "hide" : "show"}</button>
      {showing ? <Hello /> : null}
    </div>
  );
}

export default App;
```

# 실습

## todo list 만들기

```jsx
import { useState, } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const onSubmit = (event) => {
    event.preventDefault();
    if (todo.length === 0) return;
    setTodos(currentTodos => [todo, ...currentTodos]);
    setTodo("");
  }
  const onChange = (event) => {
    setTodo(event.target.value);
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input 
          type="text"
          placeholder="write your to do"
          onChange={onChange}
          value={todo}
        />
        <button>Add To Do</button>
      </form>
      <ul>
        {todos.map((todo, index) => <li key={index}>{todo}</li>)}
      </ul>
    </div>
  );
}

export default App;
```

## 코인 가격 불러오기

```jsx
import { useState, useEffect } from "react";

function App() {
  const [isLoading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>Coin ppap{coins.length > 0 ? ` : ${coins.length}` : ""}</h1>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {coins.map((coin) => (
            <li key={coin.id}>
              {coin.name}({coin.symbol}) : {coin.quotes.USD.price} USD
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
```


# etc

## key

React에서만 map 안에서 component들을 render할 때 사용

## Router

- react-router-dom
- route : 도메인 뒤의 URL
- router : URL을 보고있는 component
- routing : 렌더하는 파일(App.js)이 router를(component를) render함
- 하나의 router에서 두 개 이상의 렌더링도 가능

### router

- 라우터는 두 가지가 있음
    - browser router : 일반적인 라우터
    - hash router : 도메인 뒤에 해쉬(#)가 붙음

### switch

- route를 찾아 컴포넌트를 렌더링함

```jsx
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Detail from "./routes/Detail";
import Home from "./routes/Home";

export default function App() {
  return <Router>
    <Switch>
      <Route path="/movie/:id">
        <Detail />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </Router>;
}
```
