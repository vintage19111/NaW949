//бургер меню

const burger = document.querySelector(".burger-menu");
const nav = document.querySelector(".header_menu-nav");
const body = document.body;

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  nav.classList.toggle("active");
  body.classList.toggle("menu-open");
});

const menuLinks = document.querySelectorAll(".header_menu-item a");
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    burger.classList.remove("active");
    nav.classList.remove("active");
    body.classList.remove("menu-open");
  });
});
