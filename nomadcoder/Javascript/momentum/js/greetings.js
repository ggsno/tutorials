const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");
const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "userName";

let userName = localStorage.getItem(USERNAME_KEY);

if (userName === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  paintGreetings(userName);
}

function onLoginSubmit(event) {
  event.preventDefault();
  userName = loginInput.value;
  localStorage.setItem(USERNAME_KEY,userName);
  loginForm.classList.add(HIDDEN_CLASSNAME);
  paintGreetings(userName);
}

function paintGreetings(name) {
  greeting.classList.remove(HIDDEN_CLASSNAME);
  greeting.innerText = `hello ${name} !!!`;
}