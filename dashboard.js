// ==========================
// SIDEBAR ACTIVE MENU
// ==========================

const menuItems = document.querySelectorAll(".sidebar-menu li");

menuItems.forEach(item => {

    item.addEventListener("click", () => {

        menuItems.forEach(i =>
            i.classList.remove("active")
        );

        item.classList.add("active");

    });

});


// ==========================
// DASHBOARD CARD COUNTER
// ==========================

const counters =
document.querySelectorAll(".card h1");

counters.forEach(counter => {

    const text =
    counter.innerText;

    const value =
    parseFloat(
        text.replace(/[^\d.]/g, "")
    );

    if (!isNaN(value)) {

        let current = 0;

        const update = setInterval(() => {

            current += value / 40;

            if (current >= value) {

                counter.innerText = text;

                clearInterval(update);

            } else {

                if (text.includes("$")) {

                    counter.innerText =
                        "$" +
                        Math.floor(current);

                }

                else {

                    counter.innerText =
                        Math.floor(current);

                }

            }

        }, 30);

    }

});


// ==========================
// CARD HOVER EFFECT
// ==========================

const cards =
document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform =
            "translateY(-10px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "translateY(0)";

    });

});


// ==========================
// NOTIFICATIONS
// ==========================

const notification =
document.querySelector(".notification");

if(notification){

notification.addEventListener("click",
(e)=>{

e.stopPropagation();

notification.classList.toggle("show");

});

document.addEventListener("click",
()=>{

notification.classList.remove("show");

});

}


// ==========================
// REVENUE BAR ANIMATION
// ==========================

const bars =
document.querySelectorAll(".bar");

bars.forEach((bar,index)=>{

const heights =
[
120,
180,
150,
240,
200,
260
];

setTimeout(()=>{

bar.style.height =
heights[index]+"px";

},300);

});


// ==========================
// ADD PRODUCT BUTTON
// ==========================

const addBtn =
document.querySelector(".add-btn");

if(addBtn){

addBtn.addEventListener("click",()=>{

alert("Product Panel Opening...");

});

}


// ==========================
// RECENT ORDERS
// ==========================

const orderItems =
document.querySelectorAll(".order-item");

orderItems.forEach(order=>{

order.addEventListener("click",()=>{

alert(
"Opening Order Details"
);

});

});


// ==========================
// SEARCH DASHBOARD
// ==========================

const dashboardSearch =
document.querySelector(".dashboard-search input");

if(dashboardSearch){

dashboardSearch.addEventListener(
"keyup",

()=>{

const value =
dashboardSearch.value
.toLowerCase();

cards.forEach(card=>{

const text =
card.innerText
.toLowerCase();

card.style.display =
text.includes(value)
? "block"
: "none";

});

});

}


// ==========================
// DARK MODE
// ==========================

const darkBtn =
document.querySelector(".theme-btn");

if(darkBtn){

darkBtn.addEventListener("click",()=>{

document.body
.classList.toggle("dark");

});

}