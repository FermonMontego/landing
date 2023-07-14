import "../styles/index.scss";
import slider from "./slider";

import menuDropdownData from "../../data/menuDropdown.data.json";

const header = document.querySelector("header");

const burger = document.querySelector(".burger-mobile");

window.addEventListener("scroll", (e) => {
  if (window.scrollY >= 200) {
    header.classList.add("fixed");
  } else {
    header.classList.remove("fixed");
  }
});

burger.addEventListener("click", function (event) {
  header.classList.remove("open-menu");
  document
    .querySelector(".desktop-mobile__wrapper")
    .classList.toggle("visible");
});
let nodeTopLink;

nodeTopLink = document.querySelectorAll(".navigation-top__list li a");

for (let i = 0; i < nodeTopLink.length; i++) {
  if (!nodeTopLink[i].attributes.href) {
    nodeTopLink[i].addEventListener("click", (e) => {
      const isActiveMenu = document.querySelector("[data-is-activ]");
      const attribute = Object.values(nodeTopLink[i].dataset)[0];
      console.log(isActiveMenu);
      if (isActiveMenu) {
        if (Object.values(isActiveMenu.dataset)[0] == attribute) {
          header.classList.remove("open-menu");
          return isActiveMenu.remove();
        } else if (Object.values(isActiveMenu.dataset)[0] != attribute) {
          isActiveMenu.remove();
        }
      }

      if (!attribute) return alert("dropdown is empty");

      header.classList.add("open-menu");

      const elementMenyNavigator = createElementNavigator(attribute);

      if (window.innerWidth < 1100) {
        e.target.parentNode.appendChild(elementMenyNavigator);
      } else {
        e.target.offsetParent.appendChild(elementMenyNavigator);
      }
    });
  }
}

function createElementNavigator(attr) {
  const element = document.createElement("div");
  element.classList.add("container");
  element.classList.add("wrapper-links__container");
  const wrapperContainerLinks = document.createElement("div");
  wrapperContainerLinks.classList.add("wrapper-links");

  for (let i = 0; i < menuDropdownData[attr].length; i++) {
    const link = document.createElement("a");
    link.innerHTML = menuDropdownData[attr][i].label;
    link.href = menuDropdownData[attr][i].href;

    wrapperContainerLinks.insertAdjacentElement("beforeend", link);
  }

  element.insertAdjacentElement("beforeend", wrapperContainerLinks);
  element.setAttribute("data-is-activ", attr);
  console.log(element);
  return element;
}
