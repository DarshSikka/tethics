// this file contains code for the moving slideshow in facilities page

const image = document.querySelector(".main-card-image");
const heading = document.querySelector(".main-card-text");
let i = 0;

// create data for slideshow
const data = [
  {
    title: "Air conditioned classrooms and <br />auditoriums",
    image: "/assets/Slide1.png",
  },
  {
    title: "Sport-rooms (Cricket, Football, <br /> Basketball, Indoors)",
    image: "/assets/breakpoint7.jpg",
  },
  {
    title: "Both Offline and Online<br /> Learning available",
    image: "/assets/breakpoint4.jpg",
  },
  {
    title: "Entrepreneurship Incubators",
    image: "/assets/breakpoint5.jpg",
  },
  {
    title: "Cookery classes",
    image: "/assets/cookery.jpg",
  },
  {
    title: "Computer labs with latest <br />devices and education offered",
    image: "/assets/computer.png",
  },
  {
    title: "24x7 Library",
    image: "/assets/breakpoint8.jpg",
  },
  {
    title: "Hostel Facilities",
    image: "/assets/breakpoint9.jpg",
  },
];

// go next function
const next = () => {
  i++;
  if (i >= data.length) {
    i = 0;
  }
  image.src = data[i].image;
  heading.innerHTML = data[i].title;
};

// go previous function
const prev = () => {
  i--;
  if (i < 0) {
    i = data.length - 1;
  }
  image.src = data[i].image;
  heading.innerHTML = data[i].title;
};

// automatically set interval to move to next slide every 4000 milliseconds or 4 seconds
window.setInterval(() => next(), 4000);
