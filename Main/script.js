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

//кнокпи переключения

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".floor-btn");
    const title = document.querySelector(".floor-title");

    const floorBlocks = document.querySelectorAll(".floor");

    function showFloor(number) {
        floorBlocks.forEach(block => block.classList.add("hidden"));


        document.querySelector(`[data-floor-block="${number}"]`)?.classList.remove("hidden");


        const titles = {
            1: "Первый этаж",
            2: "Второй этаж",
            3: "Третий этаж"
        };
        title.textContent = titles[number];


        buttons.forEach(btn => btn.classList.remove("active"));
        document.querySelector(`.floor-btn[data-floor="${number}"]`).classList.add("active");
    }

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const floor = btn.dataset.floor;
            showFloor(floor);
        });
    });

    showFloor(3);
});
