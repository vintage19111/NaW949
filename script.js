
const burger = document.querySelector(".burger-menu");
const nav = document.querySelector(".header_menu-nav");
const body = document.body;

if (burger) {
    burger.addEventListener("click", () => {
        burger.classList.toggle("active");
        nav.classList.toggle("active");
        body.classList.toggle("menu-open");
    });
}

const menuLinks = document.querySelectorAll(".header_menu-item a");
menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
        burger.classList.remove("active");
        nav.classList.remove("active");
        body.classList.remove("menu-open");
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".floor-btn");
    const floorBlocks = document.querySelectorAll(".floor");
    const title = document.querySelector(".floor-title");

    function showFloor(number) {
        floorBlocks.forEach(block => block.classList.add("hidden"));
        const activeFloor = document.querySelector(`[data-floor-block="${number}"]`);
        if (activeFloor) activeFloor.classList.remove("hidden");
        const titles = { 1: "Первый этаж", 2: "Второй этаж", 3: "Третий этаж" };
        title.textContent = titles[number] || "";
        buttons.forEach(btn => btn.classList.remove("active"));
        const activeBtn = document.querySelector(`.floor-btn[data-floor="${number}"]`);
        if (activeBtn) activeBtn.classList.add("active");
    }

    buttons.forEach(btn => btn.addEventListener("click", () => showFloor(btn.dataset.floor)));
    showFloor(3);


    initMobileInteractive();
});
function initMobileInteractive() {
    const containers = document.querySelectorAll('.floor');
    
    containers.forEach(container => {
        const content = container.querySelector('.floor-content');
        if (!content) return;


        let state = {
            scale: 1,      
            panning: false,  
            pointX: 0,       
            pointY: 0,       
            startDist: 0,      
            startX: 0,         
            startY: 0          
        };


        const setTransform = () => {
            content.style.transform = `translate(${state.startX}px, ${state.startY}px) scale(${state.scale})`;
        };


        container.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {

                state.panning = true;

                state.pointX = e.touches[0].clientX - state.startX;
                state.pointY = e.touches[0].clientY - state.startY;
            } else if (e.touches.length === 2) {

                state.panning = false; 
                state.startDist = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
            }
        }, { passive: false });

        container.addEventListener('touchmove', (e) => {
            e.preventDefault();

            if (e.touches.length === 1 && state.panning) {
                state.startX = e.touches[0].clientX - state.pointX;
                state.startY = e.touches[0].clientY - state.pointY;
                setTransform();

            } else if (e.touches.length === 2) {

                const dist = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );


                if (state.startDist > 0) {
                    const delta = dist / state.startDist;
                    

                    const newScale = state.scale * delta;
                    

                    state.startDist = dist;


                    state.scale = Math.min(Math.max(0.5, newScale), 4);
                    setTransform();
                }
            }
        }, { passive: false });


        container.addEventListener('touchend', (e) => {

            if (e.touches.length === 0) {
                state.panning = false;
            } else if (e.touches.length === 1) {

                state.pointX = e.touches[0].clientX - state.startX;
                state.pointY = e.touches[0].clientY - state.startY;
                state.panning = true;
            }
        });
    });
}