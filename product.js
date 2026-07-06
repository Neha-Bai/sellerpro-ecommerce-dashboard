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
function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.innerText = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
}

// ========================
// ALL PRODUCTS DATA
// ========================
const allCards = document.querySelectorAll(".product-card");

// ========================
// SEARCH
// ========================
const searchInput = document.getElementById("productSearch");
searchInput.addEventListener("keyup", filterProducts);

function filterProducts() {
    const searchVal = searchInput.value.toLowerCase();
    const activeCat = document.querySelector(".cat-btn.active").dataset.cat;

    let count = 0;
    allCards.forEach(card => {
        const name = card.dataset.name.toLowerCase();
        const cat  = card.dataset.cat;

        const matchSearch = name.includes(searchVal);
        const matchCat    = activeCat === "all" || cat === activeCat;

        if (matchSearch && matchCat) {
            card.style.display = "block";
            count++;
        } else {
            card.style.display = "none";
        }
    });

    document.getElementById("productCount").innerText = `${count} Products`;
}

// ========================
// CATEGORY FILTER
// ========================
document.querySelectorAll(".cat-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        filterProducts();
    });
});

// ========================
// SORT
// ========================
document.getElementById("sortSelect").addEventListener("change", function () {
    const grid   = document.getElementById("productGrid");
    const cards  = Array.from(allCards);
    const sortBy = this.value;

    cards.sort((a, b) => {
        if (sortBy === "low")  return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
        if (sortBy === "high") return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
        if (sortBy === "name") return a.dataset.name.localeCompare(b.dataset.name);
        return 0;
    });

    cards.forEach(card => grid.appendChild(card));
});

// ========================
// MODAL
// ========================
const modalOverlay = document.getElementById("modalOverlay");
const modalClose   = document.getElementById("modalClose");

function openModal(card) {
    document.getElementById("modalImg").src    = card.querySelector("img").src;
    document.getElementById("modalName").innerText  = card.dataset.name;
    document.getElementById("modalPrice").innerText = "$" + card.dataset.price;
    document.getElementById("modalDesc").innerText  = card.dataset.desc;
    document.getElementById("modalCat").innerText   = card.querySelector(".cat-tag").innerText;

    // Stars
    const rating = parseInt(card.dataset.rating);
    document.getElementById("modalStars").innerText = "★".repeat(rating) + "☆".repeat(5 - rating);

    // Quantity reset
    let qty = 1;
    document.getElementById("qtyValue").innerText = 1;
    updateTotal(qty, parseFloat(card.dataset.price));

    document.getElementById("qtyMinus").onclick = () => {
        if (qty > 1) { qty--; document.getElementById("qtyValue").innerText = qty; updateTotal(qty, parseFloat(card.dataset.price)); }
    };
    document.getElementById("qtyPlus").onclick = () => {
        qty++; document.getElementById("qtyValue").innerText = qty; updateTotal(qty, parseFloat(card.dataset.price));
    };

    document.getElementById("modalCartBtn").onclick = () => {
        showToast(`✓ ${card.dataset.name} (x${qty}) added to cart!`);
        modalOverlay.classList.remove("open");
    };

    // Reviews
    const reviews = JSON.parse(card.dataset.reviews);
    const list = document.getElementById("reviewsList");
    list.innerHTML = reviews.map(r => `
        <div class="review-item">
            <strong>${r.name}</strong>
            <span class="r-stars"> ${"★".repeat(r.stars)}${"☆".repeat(5 - r.stars)}</span>
            <p>${r.text}</p>
        </div>
    `).join("");

    modalOverlay.classList.add("open");
}

function updateTotal(qty, price) {
    document.getElementById("qtyTotal").innerText = `= $${(qty * price).toFixed(2)}`;
}

modalClose.addEventListener("click", () => modalOverlay.classList.remove("open"));
modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) modalOverlay.classList.remove("open");
});

// Open modal on Quick View click
document.querySelectorAll(".quick-view-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        openModal(btn.closest(".product-card"));
    });
});

// Open modal on card click too
allCards.forEach(card => {
    card.addEventListener("click", () => openModal(card));
});

// Cart btn — stop propagation so card click doesn't fire
document.querySelectorAll(".cart-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const name = btn.closest(".product-card").dataset.name;
        showToast(`✓ ${name} added to cart!`);
    });
});

// ========================
// ADD PRODUCT BTN
// ========================
document.getElementById("addProductBtn").addEventListener("click", () => {
    showToast("Add Product feature coming soon!");
});
// Cart btn
document.querySelectorAll(".cart-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const card = btn.closest(".product-card");

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existing = cart.find(i => i.name === card.dataset.name);
        if (existing) {
            existing.qty++;
        } else {
            cart.push({
                name:  card.dataset.name,
                price: parseFloat(card.dataset.price),
                img:   card.querySelector("img").src,
                cat:   card.querySelector(".cat-tag").innerText,
                qty:   1
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        showToast(`✓ ${card.dataset.name} added to cart!`);

        // Update navbar count
        const count = cart.reduce((sum, i) => sum + i.qty, 0);
        const badge = document.querySelector(".cart-count");
        if (badge) badge.innerText = count;
    });
});