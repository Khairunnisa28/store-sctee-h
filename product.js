// ===========================
// PRODUCT DATA
// ===========================

const products = [
    {
        id: 1,
        name: "Chocolate Cake",
        price: 15.99,
        image: "https://www.lifeloveandsugar.com/wp-content/uploads/2023/06/Raspberry-Chocolate-Cake3.jpg"
    },
    {
        id: 2,
        name: "Vanilla Cupcake",
        price: 3.99,
        image: "https://bakesbybrownsugar.com/wp-content/uploads/2024/05/Strawberry-Filled-Vanilla-Cupcakes-19.jpg"
    },
    {
        id: 3,
        name: "Strawberry Tart",
        price: 7.49,
        image: "https://www.rainbownourishments.com/wp-content/uploads/2025/06/vegan-strawberry-tart-1.jpg"
    }
];

// ===========================
// LOAD CART
// ===========================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===========================
// DISPLAY PRODUCTS
// ===========================

function displayProducts() {

    const container = document.getElementById("products");

    container.innerHTML = "";

    products.forEach(product => {

        container.innerHTML += `

        <div class="col-md-4 mb-4">

            <div class="card h-100 shadow">

                <img
                    src="${product.image}"
                    class="card-img-top"
                    alt="${product.name}">

                <div class="card-body d-flex flex-column">

                    <h5 class="card-title">
                        ${product.name}
                    </h5>

                    <p class="card-text">
                        $${product.price.toFixed(2)}
                    </p>

                    <button
                        class="btn btn-primary mt-auto"
                        onclick="addToCart(${product.id})">

                        Add to Cart

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

// ===========================
// SAVE CART
// ===========================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}

// ===========================
// ADD TO CART
// ===========================

function addToCart(id) {

    const product = products.find(
        p => p.id === id
    );

    const item = cart.find(
        p => p.id === id
    );

    if (item) {

        item.quantity++;

    } else {

        cart.push({

            ...product,
            quantity: 1

        });

    }

    saveCart();

    updateCart();

    updateCartCount();

}

// ===========================
// UPDATE CART
// ===========================

function updateCart() {

    const container = document.getElementById("cart");

    container.innerHTML = "";

    if (cart.length === 0) {

        container.innerHTML = `

            <p class="text-center text-muted">
                Your cart is empty.
            </p>

        `;

        return;

    }

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

        container.innerHTML += `

        <div class="cart-item">

            <div>

                <strong>${item.name}</strong>

                <br>

                <small>

                    $${item.price.toFixed(2)}

                </small>

            </div>

            <div class="d-flex align-items-center">

                <button
                    class="btn btn-sm btn-secondary me-2"
                    onclick="decreaseQuantity(${item.id})">

                    -

                </button>

                <span>

                    ${item.quantity}

                </span>

                <button
                    class="btn btn-sm btn-secondary ms-2"
                    onclick="increaseQuantity(${item.id})">

                    +

                </button>

            </div>

            <div>

                <strong>

                    $${(item.price * item.quantity).toFixed(2)}

                </strong>

            </div>

            <button
                class="btn btn-sm btn-danger"
                onclick="removeFromCart(${item.id})">

                Remove

            </button>

        </div>

        `;

    });

    container.innerHTML += `

        <hr>

        <h3>

            Total : $${total.toFixed(2)}

        </h3>

    `;

}

// ===========================
// INCREASE
// ===========================

function increaseQuantity(id){

    const item = cart.find(
        p => p.id === id
    );

    item.quantity++;

    saveCart();

    updateCart();

    updateCartCount();

}

// ===========================
// DECREASE
// ===========================

function decreaseQuantity(id){

    const item = cart.find(
        p => p.id === id
    );

    if(item.quantity > 1){

        item.quantity--;

    }else{

        removeFromCart(id);

        return;

    }

    saveCart();

    updateCart();

    updateCartCount();

}

// ===========================
// REMOVE
// ===========================

function removeFromCart(id){

    cart = cart.filter(
        item => item.id !== id
    );

    saveCart();

    updateCart();

    updateCartCount();

}

// ===========================
// CART COUNT
// ===========================

function updateCartCount(){

    const badge = document.getElementById(
        "cart-count"
    );

    if(!badge) return;

    const totalItems = cart.reduce(

        (sum,item)=>sum+item.quantity,

        0

    );

    badge.textContent = totalItems;

}

// ===========================
// CHECKOUT
// ===========================

function checkout(){

    if(cart.length===0){

        alert("Your cart is empty.");

        return;

    }

    let total = cart.reduce(

        (sum,item)=>sum+(item.price*item.quantity),

        0

    );

    alert(

        `Thank you for your purchase!\n\nTotal Payment : $${total.toFixed(2)}`

    );

    cart=[];

    saveCart();

    updateCart();

    updateCartCount();

}

// ===========================
// LOGOUT
// ===========================

function logout() {

    const confirmLogout = confirm("Are you sure you want to logout?");

    if (confirmLogout) {

        // Hapus data cart
        localStorage.removeItem("cart");

        // Arahkan ke halaman login
        window.location.href = "login.html";
    }

}

// ===========================
// INIT
// ===========================

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        displayProducts();

        updateCart();

        updateCartCount();

    }

);