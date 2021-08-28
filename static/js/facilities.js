const image = document.querySelector(".main-card-image");
const heading = document.querySelector(".main-card-text");
let i = 0;
const data = [
  {
    title: "Air conditioned classrooms and auditoriums",
    image: "assets/Slide1.png",
  },
  {
    title: "Sport-rooms (Cricket, Football, Basketball, <br />Indoors)",
    image: "assets/breakpoint7.jpg",
  },
  {
    title: "Both Offline and Online<br /> Learning available",
    image: "assets/breakpoint4.jpg",
  },
  {
    title: "Entrepreneurship Incubators",
    image: "assets/breakpoint5.jpg",
  },
];
const next = () => {
  i++;
  if (i >= data.length) {
    i = 0;
  }
  image.src = data[i].image;
  heading.innerHTML = data[i].title;
};
const prev = () => {
  i--;
  if (i < 0) {
    i = data.length - 1;
  }
  image.src = data[i].image;
  heading.innerHTML = data[i].title;
};
window.setInterval(() => next(), 4000);
