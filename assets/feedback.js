document.addEventListener("DOMContentLoaded", function () {
    fetch("media/data/feedback.json") 
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("feedback");

            data.forEach(client => {
                const clientBlock = document.createElement("div");
                clientBlock.classList.add("client-block");
                clientBlock.classList.add("wow");
                clientBlock.classList.add("fadeInLeft");


                clientBlock.innerHTML = `
                    <div class="food-images">
                        <img class="food-img" src="${client.food_images[0]}" alt="Еда 1">
                        <img class="food-img" src="${client.food_images[1]}" alt="Еда 2">
                    </div>
                    <div class="client-avatar-review">
                        <div class="client-header">
                            <img class="avatar" src="${client.avatar}" alt="${client.client_name}">
                            <span class="client-name">${client.client_name}</span>
                        </div>
                        <div class="review">
                            <img class="review-img" src="${client.review_screenshot}" alt="Отзыв">
                        </div>
                    </div>
                `;

                container.appendChild(clientBlock);
                
            });
            const menuButtonWrapper = document.createElement("div");
            menuButtonWrapper.classList.add("menu-button-wrapper");

            menuButtonWrapper.innerHTML = `
                <a class="menu_btn btn" href="./catalog.html">
                    <button>МЕНЮ</button>
                </a>
            `;

            container.appendChild(menuButtonWrapper);
        })
        .catch(error => console.error("Ошибка загрузки JSON:", error));
});
