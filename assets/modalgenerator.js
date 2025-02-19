document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("click", function (event) {
        const triggerElement = event.target.closest(".clickable");
        if (!triggerElement) return;
        let cart = {};
        const card = triggerElement.closest(".card");
        if (!card) return;

        const productId = card.querySelector(".card-title").textContent.trim();

        fetch("./media/data/menu.json")
            .then(response => response.json())
            .then(data => {
                Object.values(data.categories).forEach(category => {
                    category.forEach(product => {
                        if (product.name === productId) {
                            openModal(product);
                        }
                    });
                });
            })
            .catch(error => console.error("Ошибка загрузки JSON:", error));
    });

    function openModal(product) {
        let modal = document.querySelector(".modal");
        if (!modal) {
            modal = document.createElement("div");
            modal.classList.add("modal");
            document.body.appendChild(modal);
        }
    
        let images = [product.images.main, product.images.hover];
        let galleryHTML = `
            <div class="modal-gallery">
                <div class="main-image-container fadeInLeftCustom">
                    <img src="${images[0]}" class="main-image" alt="${product.name}">
                    ${images.length > 1 ? `<button class="prev-btn">&lt;</button><button class="next-btn">&gt;</button>` : ""}
                </div>
                <div class="thumbnail-container">
                    ${images.map((img, index) => `<img src="${img}" class="thumbnail ${index === 0 ? "active_modal" : ""}" alt="${product.name}">`).join("")}
                </div>
            </div>`;
    
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                ${galleryHTML}
                <div class="modal-info  fadeInRightCustom">
                    <h2>${product.name}</h2>
                    <p class="modal-price">${product.price}</p>
                    <div class="quantity-control">
                        <button class="btn-decrease">-</button>
                        <hr><span class="quantity">${cart[product.name] ? cart[product.name].quantity : 1}</span><hr>
                        <button class="btn-increase">+</button>
                    </div>
                    <button class="btn add-to-cart">В КОРЗИНУ</button>
                    <p class="modal-description">${product.full_description}</p>
                </div>
            </div>`;
        modal.style.display = "flex";
    
        const quantityElement = modal.querySelector(".quantity");
        const btnIncrease = modal.querySelector(".btn-increase");
        const btnDecrease = modal.querySelector(".btn-decrease");
    
        btnIncrease.addEventListener("click", () => {
            if (!cart[product.name]) {
                cart[product.name] = { quantity: 1, price: product.price, image: product.images.main };
            } else {
                cart[product.name].quantity++;
            }
            quantityElement.textContent = cart[product.name].quantity;
            updateCartUI();
        });
    
        btnDecrease.addEventListener("click", () => {
            if (cart[product.name] && cart[product.name].quantity > 1) {
                cart[product.name].quantity--;
                quantityElement.textContent = cart[product.name].quantity;
            } else if (cart[product.name] && cart[product.name].quantity === 1) {
                delete cart[product.name];
                quantityElement.textContent = 1;
            }
            updateCartUI();
        });
    
        // Обработчик для кнопки "В корзину"
        const addToCartButton = modal.querySelector(".add-to-cart");
        addToCartButton.addEventListener("click", () => {
            if (!cart[product.name]) {
                cart[product.name] = { quantity: 1, price: product.price, image: product.images.main };
            } else {
                cart[product.name].quantity++;
            }
            updateCartUI(); // Обновление корзины
            modal.style.display = "none"; // Закрытие модального окна
        });
    
        // Закрытие модального окна
        modal.querySelector(".close").addEventListener("click", () => modal.style.display = "none");
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.style.display = "none";
        });
    
        // Галерея изображений
        const mainImage = modal.querySelector(".main-image");
        const thumbnails = modal.querySelectorAll(".thumbnail");
        let currentIndex = 0;
    
        function updateImage(index) {
            mainImage.src = images[index];
            thumbnails.forEach(thumb => thumb.classList.remove("active_modal"));
            thumbnails[index].classList.add("active_modal");
            currentIndex = index;
        }
    
        if (thumbnails.length > 1) {
            modal.querySelector(".prev-btn").addEventListener("click", () => {
                let newIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
                updateImage(newIndex);
            });
    
            modal.querySelector(".next-btn").addEventListener("click", () => {
                let newIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
                updateImage(newIndex);
            });
    
            thumbnails.forEach((thumb, index) => {
                thumb.addEventListener("click", () => updateImage(index));
            });
        }
    }
});
