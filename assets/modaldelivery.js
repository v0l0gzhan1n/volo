document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("delivery-modal");
    const openModalBtn = document.getElementById("open-info-modal");
    const closeModalBtn = document.querySelector(".close-info-modal");

    openModalBtn.addEventListener("click", function (event) {
        event.preventDefault(); 
        modal.style.display = "flex";
    });

    closeModalBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
