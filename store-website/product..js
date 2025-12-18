// The same products array (or you can move it to a separate common file if you want)
const products = [
    { id: 1, name: "Wireless Headphones", price: 69.99, category: "Audio", image: "images/wireless-headphones.jpg" },
    { id: 2, name: "Smart Watch", price: 89.99, category: "Wearables", image: "images/watch.jpg" },
    { id: 3, name: "Gaming Keyboard", price: 109.99, category: "Accessories", image: "images/keyboard.jpg" },
    { id: 4, name: "Bluetooth Speaker", price: 189.99, category: "Audio", image: "images/speaker.jpg" },
    { id: 5, name: "Vr Headset", price: 499.99, category: "Wearables", image: "images/vr.jpg" },
    { id: 6, name: "Mouse Pad", price: 10.99, category: "Accessories", image: "images/mousepad.jpg" }
];

// Cart functions reused (optional, or you can import/duplicate)
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

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    const countEl = document.getElementById("cart-count");
    if (countEl) countEl.textContent = count;
}

function renderProductDetails() {
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));
    const product = products.find(p => p.id === id);

    const container = document.getElementById("product-details");
    if (!product) {
        container.innerHTML = "<p>Product not found.</p>";
        return;
    }

    container.innerHTML = `
        <div style="display:flex; gap: 30px; align-items: flex-start;">
            <img src="${product.image}" alt="${product.name}" style="width: 300px; border-radius: 10px;">
            <div>
                <h2>${product.name}</h2>
                <p><strong>Category:</strong> ${product.category}</p>
                <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel augue ut nulla convallis efficitur.</p>
                <button id="add-to-cart-btn" style="margin-top: 20px; padding: 12px 28px; background: #000; color: #fff; border: none; border-radius: 6px; cursor: pointer;">Add to Cart</button>
            </div>
        </div>
    `;

    document.getElementById("add-to-cart-btn").addEventListener("click", () => {
        addToCart(product.id);
        alert(`${product.name} added to cart!`);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    renderProductDetails();
});
