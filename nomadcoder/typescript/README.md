# typescript

# set up

```jsx
// terminal
yarn add typescript
yarn add tsc-watch

```

```json
// tsconfig.json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "ES2015",
    "sourceMap": true,
    "outDir": "dist"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

- outDir : js로 변환된 파일이 들어갈 디렉토리
- include : js로 변환될 ts파일들
- exclude : js로 변환될 때 제외될 파일들

# interface

```tsx
interface Human {
  name: string,
  age: number,
  gender: string
}

const person = {
  name: "dlwlrma",
  age: 19,
  gender: "female"
}

const sayHi = (ppap: Human): string => {
  return (`Hi. My name is ${ppap.name}. I'm ${ppap.age} years old. I'm a ${ppap.gender}.`);
}

console.log(sayHi(person));

export {}
```

- interface는 오직 ts에서만 작동하고 js에는 영향을 미치지 않음
- js에도 영향을 미치기 위해선 class 사용

# class

```jsx
class Human {
  public name: string;
  public age: number;
  public gender: string;
  constructor(name: string, age:number, gender: string) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}

const dlwlrma = new Human("dlwlrma", 29, "female");

const sayHi = (ppap: Human): string => {
  return (`Hi. My name is ${ppap.name}. I'm ${ppap.age} years old. I'm a ${ppap.gender}.`);
}

console.log(sayHi(dlwlrma));

export {}
```