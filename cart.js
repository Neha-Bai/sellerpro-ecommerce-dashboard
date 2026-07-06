// ========================
// HAMBURGER
// ========================
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");
if (hamburger) hamburger.addEventListener("click", () => nav.classList.toggle("active"));

// ========================
// NOTIFICATION
// ========================
const bell = document.querySelector(".notification");
if (bell) {
    bell.addEventListener("click", (e) => {
        e.stopPropagation();
        bell.classList.toggle("show");
    });
    document.addEventListener("click", () => bell.classList.remove("show"));
}

// ========================
// TOAST
// ========================
function showToast(msg, color = "#10b981") {
    const toast = document.getElementById("toast");
    toast.innerText = msg;
    toast.style.background = color;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
}

// ========================
// CART DATA (localStorage)
// ========================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ========================
// RENDER CART
// ========================
function renderCart() {
    const list      = document.getElementById("cartItemsList");
    const emptyCart = document.getElementById("emptyCart");
    const itemCount = document.getElementById("itemCount");

    list.innerHTML = "";

    if (cart.length === 0) {
        emptyCart.style.display = "block";
        itemCount.innerText = "0";
        updateSummary();
        return;
    }

    emptyCart.style.display = "none";
    itemCount.innerText = cart.reduce((sum, i) => sum + i.qty, 0);

    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <span class="item-cat">${item.cat}</span><br>
                <span class="item-price">$${item.price}</span>
            </div>
            <div class="item-qty">
                <button onclick="changeQty(${index}, -1)">−</button>
                <span>${item.qty}</span>
                <button onclick="changeQty(${index}, 1)">+</button>
            </div>
            <div class="item-right">
                <span class="item-total">$${(item.price * item.qty).toFixed(2)}</span>
                <button class="remove-btn" onclick="removeItem(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        list.appendChild(div);
    });

    updateSummary();
}

// ========================
// CHANGE QUANTITY
// ========================
function changeQty(index, change) {
    cart[index].qty += change;
    if (cart[index].qty < 1) cart[index].qty = 1;
    saveCart();
    renderCart();
}

// ========================
// REMOVE ITEM
// ========================
function removeItem(index) {
    const name = cart[index].name;
    cart.splice(index, 1);
    saveCart();
    renderCart();
    showToast(`${name} removed from cart`, "#ef4444");
}

// ========================
// CLEAR CART
// ========================
document.getElementById("clearCart").addEventListener("click", () => {
    if (cart.length === 0) return;
    if (confirm("Clear all items from cart?")) {
        cart = [];
        saveCart();
        renderCart();
        showToast("Cart cleared", "#ef4444");
    }
});

// ========================
// PROMO CODES
// ========================
const promoCodes = { "SAVE10": 10, "SELL20": 20, "PRO15": 15 };
let discount = 0;

document.getElementById("promoBtn").addEventListener("click", () => {
    const code = document.getElementById("promoInput").value.trim().toUpperCase();
    const msg  = document.getElementById("promoMsg");

    if (promoCodes[code]) {
        discount = promoCodes[code];
        msg.className = "promo-success";
        msg.innerText = `✓ ${discount}% discount applied!`;
        updateSummary();
    } else {
        discount = 0;
        msg.className = "promo-error";
        msg.innerText = "✗ Invalid promo code";
        updateSummary();
    }
});

// ========================
// UPDATE SUMMARY
// ========================
function updateSummary() {
    const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    const shipping = subtotal > 50 || subtotal === 0 ? 0 : 5.99;
    const discountAmt = subtotal * (discount / 100);
    const tax = (subtotal - discountAmt) * 0.08;
    const total = subtotal - discountAmt + shipping + tax;

    document.getElementById("subtotal").innerText   = `$${subtotal.toFixed(2)}`;
    document.getElementById("shipping").innerText   = shipping === 0 && subtotal > 0 ? "FREE" : `$${shipping.toFixed(2)}`;
    document.getElementById("tax").innerText        = `$${tax.toFixed(2)}`;
    document.getElementById("grandTotal").innerText = `$${total.toFixed(2)}`;
    document.getElementById("cartCount").innerText  = cart.reduce((sum, i) => sum + i.qty, 0);
}

// ========================
// CHECKOUT MODAL
// ========================
const checkoutModal = document.getElementById("checkoutModal");

document.getElementById("checkoutBtn").addEventListener("click", () => {
    if (cart.length === 0) {
        showToast("Your cart is empty!", "#ef4444");
        return;
    }
    document.getElementById("modalTotal").innerText =
        document.getElementById("grandTotal").innerText;
    document.getElementById("checkoutForm").style.display = "block";
    document.getElementById("checkoutSuccess").style.display = "none";
    checkoutModal.classList.add("open");
});

document.getElementById("closeCheckout").addEventListener("click", () => {
    checkoutModal.classList.remove("open");
});

checkoutModal.addEventListener("click", (e) => {
    if (e.target === checkoutModal) checkoutModal.classList.remove("open");
});

document.getElementById("placeOrderBtn").addEventListener("click", () => {
    const name    = document.getElementById("checkName").value.trim();
    const email   = document.getElementById("checkEmail").value.trim();
    const phone   = document.getElementById("checkPhone").value.trim();
    const address = document.getElementById("checkAddress").value.trim();
    const payment = document.getElementById("checkPayment").value;

    if (!name || !email || !phone || !address || !payment) {
        showToast("Please fill in all fields", "#ef4444");
        return;
    }

    // Show success
    document.getElementById("checkoutForm").style.display = "none";
    document.getElementById("checkoutSuccess").style.display = "block";

    const orderNum = "ORD-" + Math.floor(Math.random() * 90000 + 10000);
    document.getElementById("orderNumber").innerText = `Order ID: ${orderNum}`;

    // Clear cart
    cart = [];
    saveCart();
    renderCart();
});

// ========================
// INIT
// ========================
renderCart();