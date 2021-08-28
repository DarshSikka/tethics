document.querySelector(".phoneMenu").addEventListener("click", (e) => {
  const phoneBottom = document.querySelector("#phone-bottom");
  phoneBottom.style.display =
    phoneBottom.style.display === "none" ? "flex" : "none";
  const app = document.querySelector("#app");
  app.style.display = app.style.display === "" ? "none" : "";
});
const url = window.location.href.split("/")[3];
if (url == "index.html") {
  window.location.href = "/";
}
const faculty = [
  {
    name: "John Doe",
    award: "Padma Bhushan",
    designation: "Principal",
    image: "assets/Principal.png",
  },
  {
    name: "Harry Singh",
    award: "Padma Shri",
    designation: "Vice Principal",
    image: "assets/VicePrincipal.jpg",
  },
  {
    name: "Meera Chopra",
    award: "Padma Shri",
    designation: "Senior Supervisor",
    image: "assets/SeniorSupervisor.jpg",
  },
];
let i = 0;
const img = document.querySelector(".slide-image");
const fullname = document.querySelector(".slide-name");
const designation = document.querySelector(".slide-designation");
const award = document.querySelector(".slide-award");
const next = () => {
  i++;
  if (i >= faculty.length) {
    i = 0;
  }
  img.src = faculty[i].image;
  fullname.innerText = faculty[i].name;
  designation.innerText = faculty[i].designation;
  award.innerText = faculty[i].award;
};
const prev = () => {
  i--;
  if (i < 0) {
    i = faculty.length - 1;
  }
  img.src = faculty[i].image;
  fullname.innerText = faculty[i].name;
  designation.innerText = faculty[i].designation;
  award.innerText = faculty[i].award;
};
