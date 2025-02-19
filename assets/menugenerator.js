
document.addEventListener("DOMContentLoaded", function () {
    fetch("./media/data/menu.json")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("products-container");
            const cartIcon = document.createElement("div");
            cartIcon.id = "cart-icon";
            cartIcon.innerHTML = `<img src="./media/img/icons/cart.png" alt="Корзина"> <span id="cart-count">0</span>`;
            document.body.appendChild(cartIcon);

            const cartModal = document.createElement("div");
            cartModal.id = "cart-modal";
            cartModal.innerHTML = `
                <div class="cart-content">
                    <span class="cart-close">&times;</span>
                    <h2>Корзина</h2>
                    <div id="cart-items"></div>
                    <div class="cart-footer">
                        <input type="text" id="customer-name" placeholder="ФИО">
                        <input type="tel" id="customer-phone" placeholder="Телефон">
                        <textarea id="customer-comment" placeholder="Комментарий"></textarea>
                        <button id="submit-order">Оформить заказ</button>
                    </div>
                </div>`;
            document.body.appendChild(cartModal);
            let firstCategory = true;
            let cart = {};
            let categoryCounter = 1;
            Object.keys(data.categories).forEach(categoryName => {
                const categoryBlock = document.createElement("details");
                if (firstCategory) {
                    categoryBlock.setAttribute("open", "");
                    firstCategory = false;
                }
                categoryBlock.classList.add("category");
                categoryBlock.innerHTML = `
                    <summary id="category-${categoryCounter}">${categoryName}</summary>
                    <hr class="hr-menu">
                    <div class="row row-cols-1 row-cols-md-4 g-4 category-products"></div>
                `;
                categoryCounter = categoryCounter < 10 ? categoryCounter + 1 : 1;
                const categoryProductsContainer = categoryBlock.querySelector(".category-products");
                
                data.categories[categoryName].forEach(product => {
                    const productCard = document.createElement("div");
                    productCard.classList.add("col");
                    productCard.innerHTML = `
                        <div class="card">
                         <div class="card-img-wrapper open-modal">
                              <img src="${product.images.main}" class="card-img-top main-img clickable open-modal" alt="${product.images.main}">
                               <img src="${product.images.hover}" class="card-img-top hover-img clickable open-modal" alt="${product.images.hover}" style="position: absolute; top: 0; left: 0;">
                            </div>
                           <div class="card-body">
                               <h5 class="card-title clickable open-modal">${product.name}</h5>
                               <p class="card-price clickable open-modal">Цена: ${product.price}</p>
                               <a href="#" class="toggle-description">Подробнее...</a>
                               <p class="card-text clickable open-modal short-description" style="display: none;">${product.short_description}</p>
                               <button class="btn add-to-cart" data-id="${product.name}">В корзину</button>
                            </div>
                       </div>
                    `;
                    categoryProductsContainer.appendChild(productCard);
                    const toggleDesc = productCard.querySelector(".toggle-description");
                    const desc = productCard.querySelector(".short-description");

                    toggleDesc.addEventListener("click", function (e) {
                        e.preventDefault();
                        desc.style.display = (desc.style.display === "none") ? "block" : "none";
                        toggleDesc.textContent = (desc.style.display === "none") ? "Подробнее..." : "Скрыть";
                    });
                });
                container.appendChild(categoryBlock);
            });

            function updateCartUI() {
                const cartCount = document.getElementById("cart-count");
                const cartItemsContainer = document.getElementById("cart-items");
            
                let totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
                cartCount.textContent = totalItems;
                cartItemsContainer.innerHTML = "";
            
                Object.keys(cart).forEach(productId => {
                    let product = cart[productId];
                    let totalPrice = product.price * product.quantity;
            
                    cartItemsContainer.innerHTML += `
                    <div class="cart-item" data-id="${productId}">
                        <div class="cart-item-info">
                            <img src="${product.image}" class="cart-item-img">
                            <span>${productId}</span>
                            <span>Цена: ${totalPrice.toFixed(2)} руб.</span>
                        </div>
                        <div class="quantity-control" data-id="${productId}">
                            <button class="btn-decrease" data-id="${productId}">-</button><hr>
                            <span class="quantity" data-id="${productId}">${product.quantity}</span><hr>
                            <button class="btn-increase" data-id="${productId}">+</button>
                        </div>
                    </div>`;
                });
            
                attachCartListeners();
            }
            
            function attachCartListeners() {
                document.querySelectorAll('.btn-increase').forEach(button => {
                    button.addEventListener('click', function() {
                        const productId = this.getAttribute('data-id');
                        cart[productId].quantity += 1;
                        updateCartUI();
                    });
                });
            
                document.querySelectorAll('.btn-decrease').forEach(button => {
                    button.addEventListener('click', function() {
                        const productId = this.getAttribute('data-id');
                        if (cart[productId].quantity > 1) {
                            cart[productId].quantity -= 1;
                        } else {
                            delete cart[productId];
                        }
                        updateCartUI();
                    });
                });
            }

            function attachCartListeners() {
                document.querySelectorAll(".cart-remove").forEach(btn => {
                    btn.addEventListener("click", function () {
                        let productId = this.dataset.id;
                        delete cart[productId];
                        updateCartUI();
                    });
                });
            }

            document.body.addEventListener("click", function (event) {
                if (event.target.classList.contains("add-to-cart")) {
                    let productId = event.target.dataset.id;
                    let productCard = event.target.closest(".card");
                    let productImage = productCard.querySelector(".main-img").src;
                    let productPrice = parseFloat(productCard.querySelector(".card-price").textContent.replace("Цена: ", ""));
            
                    if (!cart[productId]) {
                        cart[productId] = { quantity: 1, image: productImage, price: productPrice };
                    } else {
                        cart[productId].quantity++;
                    }
                    updateCartUI();
            
                    event.target.outerHTML = `
                        <div class="quantity-control" data-id="${productId}">
                            <button class="btn-decrease" data-id="${productId}">-</button><hr>
                            <span class="quantity" data-id="${productId}">${cart[productId].quantity}</span><hr>
                            <button class="btn-increase" data-id="${productId}">+</button>
                        </div>`;
                    
                    attachQuantityListeners();
                }
            });

            function attachQuantityListeners() {
                document.querySelectorAll(".btn-increase").forEach(btn => {
                    btn.addEventListener("click", function () {
                        let productId = this.dataset.id;
                        cart[productId].quantity++;
                        updateCartUI();
                        document.querySelector(`.quantity[data-id="${productId}"]`).textContent = cart[productId].quantity;
                    });
                });
            
                document.querySelectorAll(".btn-decrease").forEach(btn => {
                    btn.addEventListener("click", function () {
                        let productId = this.dataset.id;
                        if (cart[productId].quantity > 1) {
                            cart[productId].quantity--;
                        } else {
                            delete cart[productId];
                            document.querySelector(`.quantity-control[data-id="${productId}"]`).outerHTML = `
                                <button class="btn add-to-cart" data-id="${productId}">В корзину</button>`;
                            attachAddToCartListeners();
                        }
                        updateCartUI();
                    });
                });
            }

            function attachAddToCartListeners() {
                document.querySelectorAll(".add-to-cart").forEach(btn => {
                    btn.addEventListener("click", function () {
                        let productId = this.dataset.id;
                        let productCard = this.closest(".card");
                        let productImage = productCard.querySelector(".main-img").src;
                        let productPrice = parseFloat(productCard.querySelector(".card-price").textContent.replace("Цена: ", ""));
                        cart[productId] = { quantity: 1, image: productImage, price: productPrice };
                        updateCartUI();
                        this.outerHTML = `
                            <div class="quantity-control" data-id="${productId}">
                                <button class="btn-decrease" data-id="${productId}">-</button>
                                <hr><span class="quantity" data-id="${productId}">${cart[productId].quantity}</span><hr>
                                <button class="btn-increase" data-id="${productId}">+</button>
                            </div>`;
                        attachQuantityListeners();
                    });
                });
            }

            cartIcon.addEventListener("click", function () {
                cartModal.style.display = "flex";
            });
            document.querySelector(".cart-close").addEventListener("click", function () {
                cartModal.style.display = "none";
            });

            cartModal.addEventListener("click", function (e) {
                if (e.target === cartModal) {
                    cartModal.style.display = "none";
                }
            });

            document.getElementById("submit-order").addEventListener("click", function () {
                alert("Заказ отправлен!");
                cart = {};
                updateCartUI();
                cartModal.style.display = "none";
            });

            attachCartListeners();
        })
        .catch(error => console.error("Ошибка загрузки JSON:", error));
});
