document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".header");

    function toggleMenuBackground() {
        const modal = document.querySelector(".modal")?.style.display === "flex";
    {
            if (window.scrollY > 100 ) {
                header.classList.add("menu-active");
            }else if(!modal){
                header.classList.remove("menu-active");
            } 
            else {
                header.classList.remove("menu-active");
            }
        } 
    }

    window.addEventListener("scroll", toggleMenuBackground);
    window.addEventListener("resize", toggleMenuBackground);
    document.addEventListener("click", toggleMenuBackground);
});

