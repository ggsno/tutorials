// const images = [
//   "1.jpg",
//   "2.jpg",
//   "3.jpg",
//   "4.jpg",
// ]
// const todayImage = images[Math.floor(Math.random() * images.length)];

// const imageElement = document.createElement("img");
// imageElement.src = 'https://picsum.photos/2000/1000';

const body = document.querySelector('body');

// radial-gradient(rgba(0, 0, 0, 155))
// linear-gradient(to right, rgba(30, 75, 115, 1), rgba(255, 255, 255, 0))
//body.style.backgroundImage = 'radial-gradient(rgba(0, 0, 0, 0),rgba(0, 0, 0, 1)), url("https://picsum.photos/2000/1000?blur=2")'
body.style.background = 'no-repeat center url("https://picsum.photos/2000/1800?blur=2")'
// body.appendChild(imageElement);
// document.body.appendChild(imageElement);