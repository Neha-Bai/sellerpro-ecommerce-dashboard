// Hamburger
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");
if (hamburger) hamburger.addEventListener("click", () => nav.classList.toggle("active"));

// Notification
const bell = document.querySelector(".notification");
if (bell) {
    bell.addEventListener("click", (e) => { e.stopPropagation(); bell.classList.toggle("show"); });
    document.addEventListener("click", () => bell.classList.remove("show"));
}

// Toast
function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.innerText = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
}

// Search
document.getElementById("orderSearch").addEventListener("keyup", filterOrders);

// Status Filter
document.getElementById("statusFilter").addEventListener("change", filterOrders);

function filterOrders() {
    const search = document.getElementById("orderSearch").value.toLowerCase();
    const status = document.getElementById("statusFilter").value;
    const rows   = document.querySelectorAll("#orderTable tr");

    rows.forEach(row => {
        const text      = row.innerText.toLowerCase();
        const rowStatus = row.dataset.status;

        const matchSearch = text.includes(search);
        const matchStatus = status === "all" || rowStatus === status;

        row.style.display = matchSearch && matchStatus ? "" : "none";
    });
}

// View Button → Open Modal
const orderModal = document.getElementById("orderModal");

document.querySelectorAll(".view-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const row = btn.closest("tr");
        const cells = row.querySelectorAll("td");

        document.getElementById("d-id").innerText       = cells[0].innerText;
        document.getElementById("d-customer").innerText = cells[1].innerText;
        document.getElementById("d-product").innerText  = cells[2].innerText;
        document.getElementById("d-amount").innerText   = cells[3].innerText;
        document.getElementById("d-date").innerText     = cells[4].innerText;
        document.getElementById("d-status").innerText   = cells[5].innerText.trim();

        orderModal.classList.add("open");
    });
});

document.getElementById("closeOrderModal").addEventListener("click", () => {
    orderModal.classList.remove("open");
});

orderModal.addEventListener("click", (e) => {
    if (e.target === orderModal) orderModal.classList.remove("open");
});

// Export btn
document.querySelector(".export-btn").addEventListener("click", () => {
    showToast("Exporting orders... (coming soon)");
});

// Cart count
const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
const total = savedCart.reduce((sum, i) => sum + i.qty, 0);
const badge = document.getElementById("cartCount");
if (badge) badge.innerText = total;