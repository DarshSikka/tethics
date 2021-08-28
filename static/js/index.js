document.querySelector(".phoneMenu").addEventListener("click", (e) => {
  const phoneBottom = document.querySelector("#phone-bottom");
  phoneBottom.style.display =
    phoneBottom.style.display === "none" ? "flex" : "none";
  const app = document.querySelector("#app");
  app.style.display = app.style.display === "" ? "none" : "";
});
