import "../styles/index.scss";
import slider from "./slider";

import menuDropdownData from "../../data/menuDropdown.data.json";

const header = document.querySelector("header");

const burger = document.querySelector(".burger-mobile"); // Кнопка бургера

window.addEventListener("scroll", (e) => {
  // Слушаем скролл окна
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

nodeTopLink = document.querySelectorAll(".navigation-top__list li a"); // Собираем все ссылки из <nav> -> <li>

for (let i = 0; i < nodeTopLink.length; i++) {
  if (!nodeTopLink[i].attributes.href) {
    nodeTopLink[i].addEventListener("click", (e) => {
      e.stopPropagation();
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

      if (!attribute) return alert("dropdown is empty"); // Если ссылка помечена как dropdown, но данных ее подпукнтов нет, выдаем алерт

      header.classList.add("open-menu");

      const elementMenyNavigator = createElementNavigator(attribute); // Передаем значение атрибута в функцию по созданию блока с подпунктами

      if (window.innerWidth < 1100) {
        // Здесь проверяю размер окна, если оно меньше десктопа, то меняем способ вставки блока с подпунктами
        e.target.parentNode.appendChild(elementMenyNavigator);
      } else {
        e.target.offsetParent.appendChild(elementMenyNavigator);
      }
    });
  }
}

/**
 * Функция принимает строку со значением аттрибута
 * По которому нужно вернуть массив с элементами подходящие для этого значения.
 * @param {string} attr
 * 
 * Функция вернет HTML element для последующего встраивания в DOM.
 * @returns {HTMLBaseElement}
 */

function createElementNavigator(attr) {
  
  const element = document.createElement("div"); // создаем обертку с классом container
  element.classList.add("container");
  element.classList.add("wrapper-links__container");

  const wrapperContainerLinks = document.createElement("div"); // Элемент который будет отвечать за расположение элементов внутри себя
  wrapperContainerLinks.classList.add("wrapper-links");

  for (let i = 0; i < menuDropdownData[attr].length; i++) { // Перебираем массив значений и формируем ссылки и встраиваем в wrapperContainerLinks обертку
    const link = document.createElement("a");
    link.innerHTML = menuDropdownData[attr][i].label;
    link.href = menuDropdownData[attr][i].href;

    wrapperContainerLinks.insertAdjacentElement("beforeend", link);
  }

  element.insertAdjacentElement("beforeend", wrapperContainerLinks); // встраиваем wrapperContainerLinks с ссылками в главный оберточный контейнер
  element.setAttribute("data-is-activ", attr); // Добавляем аттрибут главному контейнеру, чтобы в дальнейшем следить за ним
  console.log(element);
  return element;
}
