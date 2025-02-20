document.addEventListener("DOMContentLoaded", function () {
    function updateGridClass() {
        const productRows = document.querySelectorAll(".row");

        productRows.forEach(row => {
            row.classList.remove("row-cols-md-4", "row-cols-md-3", "row-cols-md-2", "row-cols-md-1");

            let newClass = "row-cols-md-4";

            if (window.innerWidth <= 400) {
                newClass = "row-cols-md-1";
            } else if (window.innerWidth <= 1200) {
                newClass = "row-cols-md-2";
            } else if (window.innerWidth <= 1600) {
                newClass = "row-cols-md-3";
            }

            row.classList.add(newClass);
            row.style.setProperty("display", "flex", "important");
            row.style.setProperty("flex-wrap", "wrap", "important");
        });
    }

    updateGridClass();
    window.addEventListener("resize", updateGridClass);
});
document.addEventListener("DOMContentLoaded", function () {
    const allDetails = document.querySelectorAll("details");

    allDetails.forEach((details, index) => {
        if (index === 0) {
            details.setAttribute("open", "");
        } else {
            details.removeAttribute("open");
        }

        details.addEventListener("click", function () {
            allDetails.forEach(d => {
                if (d !== details) {
                    d.removeAttribute("open");
                }
            });
        });
    });
});