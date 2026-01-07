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
    floorBlocks.forEach((block) => block.classList.add("hidden"));

    document
      .querySelector(`[data-floor-block="${number}"]`)
      ?.classList.remove("hidden");

    const titles = {
      1: "Первый этаж",
      2: "Второй этаж",
      3: "Третий этаж",
    };
    title.textContent = titles[number];

    buttons.forEach((btn) => btn.classList.remove("active"));
    document
      .querySelector(`.floor-btn[data-floor="${number}"]`)
      .classList.add("active");
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const floor = btn.dataset.floor;
      showFloor(floor);
    });
  });

  showFloor(3);
});

let scale = 1;

const MIN_SCALE = 0.8;
const MAX_SCALE = 2.2;

// видимый этаж
function getVisibleFloorContent() {
  const floors = document.querySelectorAll(".floor");
  for (const floor of floors) {
    if (floor.offsetParent !== null) {
      return floor.querySelector(".floor-content");
    }
  }
  return null;
}

document.addEventListener(
  "wheel",
  (e) => {
    const content = getVisibleFloorContent();
    if (!content || !content.contains(e.target)) return;

    if (!e.shiftKey) {
      e.preventDefault();
    }

    // --- позиция курсора относительно карты ---
    const rect = content.getBoundingClientRect();
    const offsetX = ((e.clientX - rect.left) / rect.width) * 100;
    const offsetY = ((e.clientY - rect.top) / rect.height) * 100;

    // --- ограничиваем область ---
    if (offsetX < 0 || offsetX > 100 || offsetY < 0 || offsetY > 100) return;

    // --- устанавливаем origin ---
    content.style.transformOrigin = `${offsetX}% ${offsetY}%`;

    // --- меняем scale ---
    const step = 0.12;
    if (e.deltaY < 0) {
      scale = Math.min(MAX_SCALE, scale + step);
    } else {
      scale = Math.max(MIN_SCALE, scale - step);
    }

    content.style.transform = `scale(${scale})`;
  },
  { passive: false }
);

// ===== сброс при смене этажа =====
document.querySelectorAll("[data-floor-button]").forEach((btn) => {
  btn.addEventListener("click", () => {
    scale = 1;
    const content = getVisibleFloorContent();
    if (content) {
      content.style.transform = "scale(1)";
      content.style.transformOrigin = "center center";
    }
  });
});
