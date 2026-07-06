// ==========================
// HAMBURGER / SIDEBAR
// ==========================
var hamburger = document.getElementById("hamburger");
var sidebar   = document.getElementById("sidebar");

if (hamburger && sidebar) {
    hamburger.addEventListener("click", function() {
        sidebar.classList.toggle("open");
    });

    document.addEventListener("click", function(e) {
        if (!sidebar.contains(e.target) && e.target !== hamburger) {
            sidebar.classList.remove("open");
        }
    });
}

// ==========================
// NOTIFICATION DROPDOWN
// ==========================
var notifBtn = document.getElementById("notifBtn");

if (notifBtn) {
    notifBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        notifBtn.classList.toggle("open");
    });

    document.addEventListener("click", function() {
        notifBtn.classList.remove("open");
    });
}

// ==========================
// REVENUE BAR ANIMATION
// Data: Jan=$3.2k  Feb=$4.1k  Mar=$3.7k
//       Apr=$5.8k  May=$4.9k  Jun=$6.5k
// Heights are proportional — max bar (Jun) = 100%
// ==========================
var bars = document.querySelectorAll(".bar");

bars.forEach(function(bar) {
    var targetHeight = bar.getAttribute("data-height");
    if (targetHeight) {
        setTimeout(function() {
            bar.style.transition = "height 0.8s ease";
            bar.style.height = targetHeight;
        }, 300);
    }
});

// ==========================
// TOAST HELPER
// ==========================
function showToast(msg) {
    var toast = document.getElementById("toast");
    if (!toast) return;
    toast.innerHTML = '<i class="fa-solid fa-circle-check"></i> ' + msg;
    toast.classList.add("show");
    setTimeout(function() {
        toast.classList.remove("show");
    }, 2800);
}

// ==========================
// PRODUCT SEARCH + FILTER
// ==========================
var productSearch = document.querySelector(".search-bar input");
var catBtns       = document.querySelectorAll(".cat-btn");
var productCards  = document.querySelectorAll(".product-card");

function filterProducts() {
    var searchVal    = productSearch ? productSearch.value.toLowerCase() : "";
    var activeBtn    = document.querySelector(".cat-btn.active");
    var activeFilter = activeBtn ? activeBtn.textContent.trim().toLowerCase() : "all";

    productCards.forEach(function(card) {
        var name     = card.querySelector("h3").textContent.toLowerCase();
        var catTag   = card.querySelector(".cat-tag");
        var category = catTag ? catTag.textContent.toLowerCase() : "";

        var matchSearch = name.includes(searchVal);
        var matchCat    = activeFilter === "all" || category.includes(activeFilter);

        card.style.display = (matchSearch && matchCat) ? "block" : "none";
    });
}

if (productSearch) {
    productSearch.addEventListener("keyup", filterProducts);
}

catBtns.forEach(function(btn) {
    btn.addEventListener("click", function() {
        catBtns.forEach(function(b) { b.classList.remove("active"); });
        btn.classList.add("active");
        filterProducts();
    });
});

// ==========================
// PRODUCT MODAL
// ==========================
var modalOverlay = document.getElementById("modalOverlay");
var modalClose   = document.getElementById("modalClose");

if (productCards.length && modalOverlay) {
    productCards.forEach(function(card) {
        var quickViewBtn = card.querySelector(".quick-view-btn");
        if (quickViewBtn) {
            quickViewBtn.addEventListener("click", function(e) {
                e.stopPropagation();

                var name     = card.querySelector("h3").textContent;
                var price    = card.querySelector(".price").textContent;
                var img      = card.querySelector("img").src;
                var stars    = card.querySelector(".card-stars") ? card.querySelector(".card-stars").textContent : "★★★★★";
                var category = card.querySelector(".cat-tag")   ? card.querySelector(".cat-tag").textContent   : "";

                document.getElementById("modalName").textContent   = name;
                document.getElementById("modalPrice").textContent  = price;
                document.getElementById("modalImg").src            = img;
                document.getElementById("modalStars").textContent  = stars;
                document.getElementById("modalCatTag").textContent = category;
                document.getElementById("qtyValue").textContent    = "1";

                updateQtyTotal();
                modalOverlay.classList.add("open");
            });
        }
    });
}

if (modalClose) {
    modalClose.addEventListener("click", function() {
        modalOverlay.classList.remove("open");
    });
}

if (modalOverlay) {
    modalOverlay.addEventListener("click", function(e) {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove("open");
        }
    });
}

// Quantity controls
var qtyMinus = document.getElementById("qtyMinus");
var qtyPlus  = document.getElementById("qtyPlus");
var qtyValue = document.getElementById("qtyValue");
var qtyTotal = document.getElementById("qtyTotal");

function updateQtyTotal() {
    if (!qtyTotal || !qtyValue) return;
    var priceEl = document.getElementById("modalPrice");
    var price   = priceEl ? parseFloat(priceEl.textContent.replace(/[^0-9.]/g, "")) : 0;
    var qty     = parseInt(qtyValue.textContent);
    qtyTotal.textContent = "$" + (price * qty).toFixed(2);
}

if (qtyMinus) {
    qtyMinus.addEventListener("click", function() {
        var val = parseInt(qtyValue.textContent);
        if (val > 1) {
            qtyValue.textContent = val - 1;
            updateQtyTotal();
        }
    });
}

if (qtyPlus) {
    qtyPlus.addEventListener("click", function() {
        qtyValue.textContent = parseInt(qtyValue.textContent) + 1;
        updateQtyTotal();
    });
}

var modalCartBtn = document.getElementById("modalCartBtn");
if (modalCartBtn) {
    modalCartBtn.addEventListener("click", function() {
        var name = document.getElementById("modalName").textContent;
        showToast(name + " added to cart!");
        modalOverlay.classList.remove("open");
    });
}

// Cart buttons on cards
document.querySelectorAll(".cart-btn").forEach(function(btn) {
    btn.addEventListener("click", function(e) {
        e.stopPropagation();
        var card = btn.closest(".product-card");
        var name = card.querySelector("h3").textContent;
        showToast(name + " added to cart!");
    });
});

// ==========================
// ORDER SEARCH
// ==========================
var orderSearch = document.getElementById("orderSearch");

if (orderSearch) {
    orderSearch.addEventListener("keyup", function() {
        var val  = orderSearch.value.toLowerCase();
        var rows = document.querySelectorAll("#orderTable tbody tr");

        rows.forEach(function(row) {
            var rowText = row.textContent.toLowerCase();
            row.style.display = rowText.includes(val) ? "" : "none";
        });
    });
}

// ==========================
// REVIEW SEARCH
// ==========================
var reviewSearch = document.getElementById("reviewSearch");

if (reviewSearch) {
    reviewSearch.addEventListener("keyup", function() {
        var val = reviewSearch.value.toLowerCase();
        document.querySelectorAll(".customer-review").forEach(function(review) {
            var name = review.querySelector("h3").textContent.toLowerCase();
            review.style.display = name.includes(val) ? "block" : "none";
        });
    });
}

// ==========================
// CUSTOMER SEARCH
// ==========================
var customerSearch = document.getElementById("customerSearch");

if (customerSearch) {
    customerSearch.addEventListener("keyup", function() {
        var val = customerSearch.value.toLowerCase();
        document.querySelectorAll(".customer-card").forEach(function(card) {
            var name = card.querySelector("h3").textContent.toLowerCase();
            card.style.display = name.includes(val) ? "block" : "none";
        });
    });
}

// ==========================
// LOGIN / AUTH
// ==========================
var loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
    loginBtn.addEventListener("click", function() {
        var role = document.getElementById("role").value;

        if      (role === "buyer")  window.location.href = "buyer.html";
        else if (role === "seller") window.location.href = "index.html";
        else if (role === "admin")  window.location.href = "admin.html";
        else    alert("Please select a role.");
    });
}