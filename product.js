// Sample product data
const products = [
    { id: 1, name: 'Chocolate Cake', price: 15.99, image: 'chocolate-cake.jpg' },
    { id: 2, name: 'Vanilla Cupcake', price: 3.99, image: 'vanilla-cupcake.jpg' },
    { id: 3, name: 'Strawberry Tart', price: 7.49, image: 'strawberry-tart.jpg' }
];

let cart = [];

// Display Products
function displayProducts() {
    const productContainer = document.getElementById('products');
    productContainer.innerHTML = '';

    products.forEach(product => {
        productContainer.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">
                        ${product.name}
                        </h5>
                        
                        <p class="card-text">
                        $${product.price.toFixed(2)}
                        </p>
                        
                        <button class="btn btn-primary w-100" onclick="addToCart(${product.id})">
                        Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
        
    });
}

// Add to Cart
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const itemInCart = cart.find(item => item.id === id);

    if (itemInCart) {
        itemInCart.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

// Update Cart
function updateCart() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        cartContainer.innerHTML += `
            <div class="cart-item">
                <span>${item.name} (x${item.quantity})</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
    });

    cartContainer.innerHTML += `<h3>Total: $${total.toFixed(2)}</h3>`;
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');

    if (cartCount){
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your purchase!');
    cart = [];
    updateCart();
    updateCartCount();
}

document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCart();
    updateCartCount();
});