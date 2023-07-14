import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

new Swiper(".swiper", {
  observer: true,
  observeParents: true,
  parallax: true,
  slidesPerView: 1,
  loop: true,
  
  navigation: {
    nextEl: ".action-next",
    prevEl: ".action-prev",
  },

  modules: [Navigation, Pagination],
});

new Swiper(".reviews_slider", {
  slidesPerView: 1,
  loop: false,
  observer: true,
  observeParents: true,
  parallax: true,
  
  spaceBetween: 30,
  navigation: {
    nextEl: ".action-next-reviews",
    prevEl: ".action-prev-reviews",
  },

  modules: [Navigation, Pagination],
});
