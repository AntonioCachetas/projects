const products = [
    { id: 1, name: "Wireless Headphones", price: 69.99, category: "Audio", image: "images/wireless-headphones.jpg" },
    { id: 2, name: "Smart Watch", price: 89.99, category: "Wearables", image: "images/watch.jpg" },
    { id: 3, name: "Gaming Keyboard", price: 109.99, category: "Accessories", image: "images/keyboard.jpg" },
    { id: 4, name: "Bluetooth Speaker", price: 189.99, category: "Audio", image: "images/speaker.jpg" },
    { id: 5, name: "Vr Headset", price: 499.99, category: "Wearables", image: "images/vr.jpg" },
    { id: 6, name: "Mouse Pad", price: 10.99, category: "Accessories", image: "images/mousepad.jpg" }
];

// Cart functions
function getCart() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
}
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}
function addToCart(id) {
    const cart = getCart();
    const item = cart.find(p => p.id === id);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ id: id, quantity: 1 });
    }
    saveCart(cart);
    updateCartCount();
}
function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
    renderCartItems();  // Re-render cart display on removal
    updateCartCount();
}

// DOM elements
const productsContainer = document.getElementById("products");
const searchBox = document.getElementById("search-box");
const categoryFilter = document.getElementById("category-filter");
const priceFilter = document.getElementById("price-filter");
const priceValue = document.getElementById("price-value");

// Populate categories dropdown dynamically
function populateCategories() {
    if (!categoryFilter) return;

    // Clear any existing options except "all"
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    const categories = [...new Set(products.map(p => p.category))];
    categories.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
    });
}

function renderProducts() {
    if (!productsContainer) return;

    let filtered = products;

    // Filter by search text
    const searchText = searchBox?.value.toLowerCase() || "";
    if (searchText) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(searchText));
    }

    // Filter by category
    if (categoryFilter?.value && categoryFilter.value !== "all") {
        filtered = filtered.filter(p => p.category === categoryFilter.value);
    }

    // Filter by price
    const maxPrice = Number(priceFilter?.value ?? Infinity);
    filtered = filtered.filter(p => p.price <= maxPrice);

    // Clear container
    productsContainer.innerHTML = "";

    if (filtered.length === 0) {
        productsContainer.innerHTML = "<p>No products found.</p>";
        return;
    }

    // Render filtered products
   filtered.forEach(p => {
    productsContainer.innerHTML += `
        <div class="product-card" onclick="location.href='product.html?id=${p.id}'">
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>Category: ${p.category}</p>
            <p>$${p.price.toFixed(2)}</p>
            <button onclick="event.stopPropagation(); addToCart(${p.id})">Add to Cart</button>
        </div>
    `;
});

}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    const countEl = document.getElementById("cart-count");
    if (countEl) countEl.textContent = count;
}

// --- NEW: Render cart items on Cart page ---
function renderCartItems() {
    const container = document.getElementById("cart-items");
    if (!container) return;

    const cart = getCart();
    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    let total = 0;

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return;

        const itemTotal = product.price * item.quantity;
        total += itemTotal;

        container.innerHTML += `
            <div class="cart-item" style="display:flex; align-items:center; justify-content:space-between; margin-bottom: 10px; background:white; padding:10px; border-radius:6px;">
                <div style="display:flex; align-items:center; gap: 15px;">
                    <img src="${product.image}" alt="${product.name}" style="width:50px; height:50px; object-fit:cover; border-radius:5px;">
                    <div>
                        <strong>${product.name}</strong><br>
                        Price: $${product.price.toFixed(2)}<br>
                        Quantity: ${item.quantity}
                    </div>
                </div>
                <div style="text-align:right;">
                    <div>$${itemTotal.toFixed(2)}</div>
                    <button onclick="removeFromCart(${product.id})" style="margin-top:8px; background:#ff4d4d; border:none; color:white; padding:6px 12px; border-radius:4px; cursor:pointer;">
                        Remove
                    </button>
                </div>
            </div>
        `;
    });

    // Total price at bottom
    container.innerHTML += `
        <div style="margin-top: 20px; font-weight:bold; font-size:1.2rem; text-align:right;">
            Total: $${total.toFixed(2)}
        </div>
    `;
}

// Event listeners for filters
function setupEventListeners() {
    if (searchBox) searchBox.addEventListener("input", renderProducts);
    if (categoryFilter) categoryFilter.addEventListener("change", renderProducts);
    if (priceFilter) {
        priceFilter.addEventListener("input", () => {
            priceValue.textContent = priceFilter.value;
            renderProducts();
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    populateCategories();
    setupEventListeners();
    renderProducts();
    updateCartCount();

    // On pages that have cart-items container, render cart items
    if (document.getElementById("cart-items")) {
        renderCartItems();
    }
});
