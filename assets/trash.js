// document.addEventListener("DOMContentLoaded", function () {
//     fetch("./media/data/menu.json")
//         .then(response => response.json())
//         .then(data => {
//             const container = document.getElementById("products-container");
//             const cartContainer = document.getElementById("cart");
//             let cart = {};
//             let firstCategory = true;
//             let categoryCounter = 1;
//             Object.keys(data.categories).forEach(categoryName => {
//                 const categoryBlock = document.createElement("details");
//                 if (firstCategory) {
//                     categoryBlock.setAttribute("open", "");
//                     firstCategory = false;
//                 }
//                 categoryBlock.classList.add("category");
//                 categoryBlock.innerHTML = `
//                     <summary id="category-${categoryCounter}">${categoryName}</summary>
//                     <hr class="hr-menu" width="100%" style="color: #6D6D6D !important; height: 5px; background-color: #6D6D6D; opacity: 1; margin-bottom: 30px">
//                     <div class="row row-cols-1 row-cols-md-4 g-4 category-products"></div>
//                 `;
//                 categoryCounter = categoryCounter < 10 ? categoryCounter + 1 : 1;
                

//                 const categoryProductsContainer = categoryBlock.querySelector(".category-products");

//                 data.categories[categoryName].forEach(product => {
//                     const productCard = document.createElement("div");
//                     productCard.classList.add("col");

//                     productCard.innerHTML = `
//                         <div class="card wow fadeInLeft" style="visibility: visible; animation-name: fadeInLeft;">
//                             <div class="card-img-wrapper clickable">
//                                 <img src="${product.images.main}" class="card-img-top main-img clickable" alt="${product.images.main}">
//                                 <img src="${product.images.hover}" class="card-img-top hover-img clickable" alt="${product.images.hover}" style="opacity: 0; position: absolute; top: 0; left: 0;">
//                             </div>
//                             <div class="card-body">
//                                 <h5 class="card-title clickable">${product.name}</h5>
//                                 <p class="card-price clickable">Цена: ${product.price}</p>
//                                 <a href="#" class="toggle-description">Подробнее...</a>
//                                 <p class="card-text clickable short-description" style="display: none;">${product.short_description}</p>
//                                 <button class="btn add-to-cart" data-id="${product.name}">В корзину</button>
//                             </div>
//                         </div>
//                     `;

//                     categoryProductsContainer.appendChild(productCard);

//                     const mainImg = productCard.querySelector(".main-img");
//                     const hoverImg = productCard.querySelector(".hover-img");

//                     productCard.addEventListener("mouseover", () => hoverImg.style.opacity = 1);
//                     productCard.addEventListener("mouseout", () => hoverImg.style.opacity = 0);

//                     const toggleDesc = productCard.querySelector(".toggle-description");
//                     const desc = productCard.querySelector(".short-description");

//                     toggleDesc.addEventListener("click", function (e) {
//                         e.preventDefault();
//                         desc.style.display = (desc.style.display === "none") ? "block" : "none";
//                         toggleDesc.textContent = (desc.style.display === "none") ? "Подробнее..." : "Скрыть";
//                     });

//                     const addToCartBtn = productCard.querySelector(".add-to-cart");

//                     addToCartBtn.addEventListener("click", function () {
//                         let productId = product.name;

//                         if (!cart[productId]) {
//                             cart[productId] = 1;
//                         } else {
//                             cart[productId]++;
//                         }

//                         updateCartUI();

//                         addToCartBtn.outerHTML = `
//                             <div class="quantity-control" data-id="${productId}">
//                                 <button class="btn-decrease" data-id="${productId}">-</button><hr>
//                                 <span class="quantity" data-id="${productId}">${cart[productId]}</span><hr>
//                                 <button class="btn-increase" data-id="${productId}">+</button>
//                             </div>
//                         `;

//                         attachQuantityListeners();
//                     });
//                 });

//                 container.appendChild(categoryBlock);
//             });

//             function attachQuantityListeners() {
//                 document.querySelectorAll(".btn-increase").forEach(btn => {
//                     btn.addEventListener("click", function () {
//                         let productId = this.dataset.id;
//                         cart[productId]++;
//                         updateCartUI();
//                         document.querySelector(`.quantity[data-id="${productId}"]`).textContent = cart[productId];
//                     });
//                 });

//                 document.querySelectorAll(".btn-decrease").forEach(btn => {
//                     btn.addEventListener("click", function () {
//                         let productId = this.dataset.id;
//                         if (cart[productId] > 1) {
//                             cart[productId]--;
//                         } else {
//                             delete cart[productId];
//                             document.querySelector(`.quantity-control[data-id="${productId}"]`).outerHTML = `<button class="btn btn-success add-to-cart" data-id="${productId}">В корзину</button>`;
//                             attachAddToCartListeners();
//                         }
//                         updateCartUI();
//                     });
//                 });
//             }

//             function attachAddToCartListeners() {
//                 document.querySelectorAll(".add-to-cart").forEach(btn => {
//                     btn.addEventListener("click", function () {
//                         let productId = this.dataset.id;
//                         cart[productId] = 1;
//                         updateCartUI();
//                         this.outerHTML = `
//                             <div class="quantity-control" data-id="${productId}">
//                                 <button class="btn-decrease" data-id="${productId}">-</button><hr>
//                                 <span class="quantity" data-id="${productId}">1</span><hr>
//                                 <button class="btn-increase" data-id="${productId}">+</button>
//                             </div>
//                         `;
//                         attachQuantityListeners();
//                     });
//                 });
//             }

//             function updateCartUI() {
//                 cartContainer.innerHTML = "";
//                 let totalItems = Object.values(cart).reduce((sum, item) => sum + item, 0);

//                 if (totalItems > 0) {
//                     cartContainer.style.display = "block";
//                     Object.keys(cart).forEach(item => {
//                         const cartItem = document.createElement("div");
//                         cartItem.classList.add("cart-item");
//                         cartItem.innerHTML = `
//                             <span>${item} x ${cart[item]}</span>
//                             <button class="cart-remove" data-id="${item}">Удалить</button>
//                         `;
//                         cartContainer.appendChild(cartItem);
//                     });

//                     document.querySelectorAll(".cart-remove").forEach(btn => {
//                         btn.addEventListener("click", function () {
//                             let productId = this.dataset.id;
//                             delete cart[productId];
//                             updateCartUI();
//                             document.querySelector(`.quantity-control[data-id="${productId}"]`).outerHTML = `<button class="btn btn-success add-to-cart" data-id="${productId}">В корзину</button>`;
//                             attachAddToCartListeners();
//                         });
//                     });
//                 } else {
//                     cartContainer.style.display = "none";
//                 }
//             }
//         })
//         .catch(error => console.error("Ошибка загрузки JSON:", error));
// });

// document.addEventListener("DOMContentLoaded", function () {
//     fetch("./media/data/menu.json")
//         .then(response => response.json())
//         .then(data => {
//             const container = document.getElementById("products-container");
//             const cartIcon = document.createElement("div");
//             cartIcon.id = "cart-icon";
//             cartIcon.innerHTML = `<img src="./media/img/icons/cart.png" alt="Корзина"> <span id="cart-count">0</span>`;
//             document.body.appendChild(cartIcon);

//             const cartModal = document.createElement("div");
//             cartModal.id = "cart-modal";
//             cartModal.innerHTML = `
//                 <div class="cart-content">
//                     <span class="cart-close">&times;</span>
//                     <h2>Корзина</h2>
//                     <div id="cart-items"></div>
//                     <div class="cart-footer">
//                         <input type="text" id="customer-name" placeholder="ФИО">
//                         <input type="tel" id="customer-phone" placeholder="Телефон">
//                         <textarea id="customer-comment" placeholder="Комментарий"></textarea>
//                         <button id="submit-order">Оформить заказ</button>
//                     </div>
//                 </div>`;
//             document.body.appendChild(cartModal);
            
//             let cart = {};
//             let categoryCounter = 1;
//             Object.keys(data.categories).forEach(categoryName => {
//                 const categoryBlock = document.createElement("details");
//                 categoryBlock.classList.add("category");
//                 categoryBlock.innerHTML = `
//                     <summary id="category-${categoryCounter}">${categoryName}</summary>
//                     <hr class="hr-menu">
//                     <div class="row row-cols-1 row-cols-md-4 g-4 category-products"></div>
//                 `;
//                 categoryCounter = categoryCounter < 10 ? categoryCounter + 1 : 1;
//                 const categoryProductsContainer = categoryBlock.querySelector(".category-products");
                
//                 data.categories[categoryName].forEach(product => {
//                     const productCard = document.createElement("div");
//                     productCard.classList.add("col");
//                     productCard.innerHTML = `
//                         <div class="card">
//                             <div class="card-img-wrapper clickable">
//                                 <img src="${product.images.main}" class="card-img-top main-img clickable" alt="${product.name}">
//                                 <img src="${product.images.hover}" class="card-img-top hover-img clickable" alt="${product.name}" style="opacity: 0; position: absolute; top: 0; left: 0;">
//                             </div>
//                             <div class="card-body">
//                                 <h5 class="card-title clickable">${product.name}</h5>
//                                 <p class="card-price clickable">Цена: ${product.price}</p>
//                                 <button class="btn add-to-cart" data-id="${product.name}">В корзину</button>
//                             </div>
//                         </div>
//                     `;
//                     categoryProductsContainer.appendChild(productCard);
//                 });
//                 container.appendChild(categoryBlock);
//             });

//             function updateCartUI() {
//                 const cartCount = document.getElementById("cart-count");
//                 const cartItemsContainer = document.getElementById("cart-items");
//                 let totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
//                 cartCount.textContent = totalItems;
//                 cartItemsContainer.innerHTML = "";
//                 Object.keys(cart).forEach(productId => {
//                     let product = cart[productId];
//                     cartItemsContainer.innerHTML += `
//                         <div class="cart-item">
//                             <img src="${product.image}" class="cart-item-img">
//                             <span>${productId} x ${product.quantity}</span>
//                             <button class="cart-remove" data-id="${productId}">Удалить</button>
//                         </div>`;
//                 });
//                 attachCartListeners();
//             }

//             function attachCartListeners() {
//                 document.querySelectorAll(".cart-remove").forEach(btn => {
//                     btn.addEventListener("click", function () {
//                         let productId = this.dataset.id;
//                         delete cart[productId];
//                         updateCartUI();
//                     });
//                 });
//             }

//             document.body.addEventListener("click", function (event) {
//                 if (event.target.classList.contains("add-to-cart")) {
//                     let productId = event.target.dataset.id;
//                     let productImage = event.target.closest(".card").querySelector(".main-img").src;
//                     if (!cart[productId]) {
//                         cart[productId] = { quantity: 1, image: productImage };
//                     } else {
//                         cart[productId].quantity++;
//                     }
//                     updateCartUI();
//                 }
//             });

//             cartIcon.addEventListener("click", function () {
//                 cartModal.style.display = "flex";
//             });

//             document.querySelector(".cart-close").addEventListener("click", function () {
//                 cartModal.style.display = "none";
//             });

//             document.getElementById("submit-order").addEventListener("click", function () {
//                 alert("Заказ отправлен!");
//                 cart = {};
//                 updateCartUI();
//                 cartModal.style.display = "none";
//             });
//         })
//         .catch(error => console.error("Ошибка загрузки JSON:", error));
// });