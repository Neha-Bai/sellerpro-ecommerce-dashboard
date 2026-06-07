// ======================
// HAMBURGER MENU
// ======================

const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");

hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
});

// ======================
// CARD COUNTER ANIMATION
// ======================

const counters = document.querySelectorAll(".card h1");

counters.forEach(counter => {

    const finalValue = counter.innerText;

    if (!isNaN(parseFloat(finalValue))) {

        let count = 0;
        const target = parseFloat(finalValue);

        const interval = setInterval(() => {

            count += target / 50;

            if (count >= target) {
                counter.innerText = finalValue;
                clearInterval(interval);
            } else {
                counter.innerText = Math.floor(count);
            }

        }, 20);
    }
});

// ======================
// CARD HOVER EFFECT
// ======================

const dashboardCards = document.querySelectorAll(".card");

dashboardCards.forEach(card => {

    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-8px)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
    });

});

// ======================
// NOTIFICATION DROPDOWN
// ======================

const bell = document.querySelector(".notification");

bell.addEventListener("click", (e) => {

    e.stopPropagation();

    bell.classList.toggle("show");

});

// Close when clicking outside
document.addEventListener("click", () => {

    bell.classList.remove("show");

});


const searchInput = document.querySelector(".search-bar input");
const searchBtn = document.querySelector(".search-bar button");

searchBtn.addEventListener("click", () => {

    const value = searchInput.value.toLowerCase();

    const products = document.querySelectorAll(".product-card");

    products.forEach(product => {

        const productName =
        product.querySelector("h3").innerText.toLowerCase();

        if(productName.includes(value)){
            product.style.display = "block";
        }
        else{
            product.style.display = "none";
        }

    });

});


// =========================
// Search While Typing
// =========================
searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    const products = document.querySelectorAll(".product-card");

    products.forEach(product => {

        const productName =
        product.querySelector("h3").innerText.toLowerCase();

        product.style.display =
        productName.includes(value)
        ? "block"
        : "none";

    });

});




// =========================
// Product Card Click
// =========================
const cards = document.querySelectorAll(".product-card");

cards.forEach(card => {

    card.addEventListener("click", () => {

        const productName =
        card.querySelector("h3").innerText;

        alert(`In stock: ${productName}\nPrice: ${card.querySelector("p").innerText}`);

    });

});



document.addEventListener("DOMContentLoaded", () => {

    const searchOrder = document.getElementById("orderSearch");

    searchOrder.addEventListener("keyup", () => {

        const value = searchOrder.value.toLowerCase();
        const rows = document.querySelectorAll("#orderTable tr");

        rows.forEach(row => {

            const orderId = row.cells[0].textContent.toLowerCase();
            const customer = row.cells[1].textContent.toLowerCase();
            const product = row.cells[2].textContent.toLowerCase();

            const match =
                orderId.includes(value) ||
                customer.includes(value) ||
                product.includes(value);

            row.style.display = match ? "" : "none";

        });

    });

});