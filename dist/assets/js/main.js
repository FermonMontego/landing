import "../styles/index.scss";
import slider from "./slider";

const header = document.querySelector("header");
window.addEventListener("scroll", (e) => {
  if (window.scrollY >= 200) {
    header.classList.add("fixed");
  } else {
    header.classList.remove("fixed");
  }
});
