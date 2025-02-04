import { getProduct, getProductPriceInfo } from "../data/product.js";
import { cart } from "../data/cart.js";
import { convMoney } from "../data/money.js";
import { getCurrencySymbol, updateAllPrices } from "../data/currency.js";
import { searchBarCon } from "../data/search.js";
import { AuthManager, initializeAuth } from '../data/authmanager.js';
import { initializeCurrency } from "../data/currency.js";
// global file for all pages
let htmlHeader = ``;
let htmlSticky = ``;
let htmlFooter = ``;
let htmlEnd = ``;
// generate headers
function generateHeader() {
    return htmlHeader = `
	<div class="search-bar">
		<input
			placeholder="search for products"
			type="search"
			id="header-search"
			class="search-bar1" />
		<i class="fa-solid fa-magnifying-glass search-button"></i>
	</div>
	<a class="up"><i class="fa-solid fa-angles-up"></i></a>
	<div class="overlay"></div>
	<header class="header" id="header">
			<div class="container">
				<div class="currency">
					<div class="select-selected">
						<img
							class="current-img"
							src="imgs/egp.avif"
							alt=""
							width="20px"
							height="20px" />
						<span class="current-currency">Pounds</span>
						<i class="fa-solid fa-caret-down"></i>
					</div>
					<div class="select-items">
						<div data-value="egp"><img src="imgs/egp.avif" alt="" /> EGP</div>
						<div data-value="usd"><img src="imgs/usd.avif" alt="" /> USD</div>
					</div>
				</div>
				<div class="social">
					<h4>Follow Us On: </h4>
					<a href="#"><i class="fa-brands fa-facebook"></i></a>
					<a href="#"><i class="fa-brands fa-whatsapp"></i></a>
				</div>
			</div>
		</header>
		<aside>
			<div class="aside-head">
				<h3>Shopping cart</h3>
				<button class="close-button">
					<i class="fa-solid fa-xmark"></i> Close
				</button>
			</div>
			<div class="fill-cart">
				<div class="cart-items"></div>
				<div class="shopping-cart-footer">
					<div class="cart-price"></div>
					<a href="shopping-cart.html">View Cart</a>
				</div>
			</div>
		</aside>
		<nav>
				<button class="close-button">
					<i class="fa-solid fa-xmark"></i> Close
				</button>
				<div>
				<ul>
					<li><a href="/">Home</a></li>
					<li><a href="shop.html">Shop</a></li>
					<li><a href="shopping-cart.html">Cart</a></li>
					<li><a href="orders.html">Your Orders</a></li>
					<li>
						<div style = "position: relative;">
							<a class="sign-in" href="#"> <i class="fa-regular fa-user"></i> <span style="margin-left : 5px;"></span></a>
						</div>
					</li>
				</ul>
				</div>
				<div class="currency">
					<div class="select-selected">
						<img
							class="current-img"
							src="imgs/egp.avif"
							alt=""
							width="20px"
							height="20px" />
						<span class="current-currency">Pounds</span>
						<i class="fa-solid fa-caret-down"></i>
					</div>
					<div class="select-items">
						<div data-value="egp"><img src="imgs/egp.avif" alt="" /> Pounds</div>
						<div data-value="usd"><img src="imgs/usd.avif" alt="" /> $</div>
					</div>
				</div>
			</nav>
		<header class="header2 skewBg">
			<div class="container">
				<div class="hsec1">
					<button class="nav-button"><i class="fa-solid fa-bars"></i> </button>
					<a href="/"><img src="imgs/logo.avif" alt=""/></a>

					<div class="hsec2">
						<ul>
							<li><a class = "skewBg" href="/">Home</a></li>
							<li><a class = "skewBg" href="shop.html">Shop</a></li>
							<li><a class = "skewBg" href="shopping-cart.html">Cart</a></li>
							<li><a class = "skewBg" href="orders.html">Your Orders</a></li>
							<li >
								<div class = "register-wrap" style = "position: relative;">
									<a class="sign-in skewBg" href="#"> <i class="fa-regular fa-user"></i> <span style="margin-left: 5px;">Login/Register</span></a>
									<div id="dropdownMenu1" class="dropdown-menu1">
										<div class = "register" id="signOut">Sign Out</div>	
										<a href= "orders.html"class = "register">Your Orders</a>	
									</div>
								</div>
							</li>
						</ul>
						<div class="cart">
							<i class="fa-solid fa-magnifying-glass"></i>
							<a ${(window.location.href.includes("shopping-cart.html") || window.location.href.includes("checkout.html") ? `href ="shopping-cart.html"` : '')} class = "cart-container">
								<div class = "cart-counter">0</div>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
							</a>
						</div>
					</div>
				</div>
			</div>
		</header>`;
}
// generate sticky header 
function generateStickyHeader() {
    return htmlSticky = `
			<div class="container">
				<div class="hsec1">
					<button class="nav-button"><i class="fa-solid fa-bars"></i> </button>
					<a href="/"><img src="imgs/logo.avif" alt=""/></a>

					<div class="hsec2">
						<ul>
							<li><a class = "skewBg" href="/">Home</a></li>
							<li><a class = "skewBg" href="shop.html">Shop</a></li>
							<li><a class = "skewBg" href="shopping-cart.html">Cart</a></li>
							<li><a class = "skewBg" href="orders.html">Your Orders</a></li>
							<li >
								<div class = "register-wrap" style = "position: relative;">
									<a class="sign-in skewBg" href="#"> <i class="fa-regular fa-user"></i> <span style="margin-left: 5px;">Login/Register</span></a>
								</div>
							</li>
						</ul>
						<div class="cart">
							<i class="fa-solid fa-magnifying-glass"></i>
							<div class = "cart-container">
								<div class = "cart-counter">0</div>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
}
// generate footer 
function generateFooter() {
    return htmlFooter = `
		<div class="container">
			<div class="f-sec1">
				<a href="/"><img src="imgs/logo.avif" alt=""/></a>
				<h5>
					FUNBOX Marketplace – Your ultimate destination for unbeatable prices and the best deals!
				</h5>
				<h5>
					Reg. No.: 13451600 <br />128 City Road, London, United Kingdom, EC1V
					2NX
				</h5>
				<div class="social">
					<a href="#"><i class="fa-brands fa-whatsapp"></i></a>
					<a href="#"><i class="fa-brands fa-facebook"></i></a>
				</div>
			</div>
			<div class="f-sec2">
				<h4>QUICK LINKS</h4>
				<a href="privacy.html"> Privacy Policy</a>
				<a href="refund.html">Refund Policy</a>
				<a href="terms.html">Terms & Conditions </a>
				<a href="orders.html">My Orders</a>
			</div>
			<div class="f-sec2">
				<h4>SUPPORTS</h4>
				<a href="mailto:ahmam2004@gmail.com"
					><i class="fa-solid fa-envelope"></i> ahmam2004@gmail.com</a
				>
				<a href="tel:01020697551"><i class="fa-solid fa-phone"></i> +201020697551</a>
				<a href="#"> Support Ticket </a>
				<a href="#">FAQ</a>
			</div>
			<div class="f-sec2">
				<div class="wrapper">
					<h4>Join our newsletter!</h4>
					<form action="">
						<input
							type="email"
							id="newsletter-email"
							placeholder="Your Email address" />
						<button type="submit"><i class="fa-solid fa-rocket"></i></button>
					</form>
				</div>
			</div>
		</div>
		`;
}
// generate development copyright
function generateEnd() {
    return htmlEnd = `
	<a href="#"><strong>FUNBOX Store</strong></a> 2024 Created By
	<strong><a href="https://www.facebook.com/ahmed.moh232/" target = "_blank">BadHunterN1</a></strong>.
`;
}
// append all headers and footer and end 
function appendHeader() {
    const header = document.createElement("header");
    header.id = `header-container`;
    header.innerHTML = generateHeader();
    document.body.prepend(header);
    const stickyHeader = document.createElement("div");
    stickyHeader.classList.add("sticky-header", "unsticked");
    stickyHeader.innerHTML = generateStickyHeader();
    document.body.prepend(stickyHeader);
    const footer = document.createElement("footer");
    footer.innerHTML = generateFooter();
    const end = document.createElement("div");
    end.classList.add("end");
    end.innerHTML = generateEnd();
    footer.append(end);
    document.body.append(footer);
}
appendHeader();
// make stickyheader sticky
window.addEventListener("scroll", function () {
    const stickyHeader = document.querySelector(".sticky-header");
    stickyHeader.classList.toggle("sticked", window.scrollY > 250);
    stickyHeader.classList.toggle("unsticked", window.scrollY <= 250);
});
// generate aside OrderSummray for all pages
export function renderOrderSummray() {
    let cartSummHTML = "";
    cart.updateCartQuantity();
    if (cart.cartItems.length === 0) {
        cartSummHTML += `
			<div class="empty-cart">
				<h5>No products in the cart.</h5>
				<button><a href="shop.html">Return To Shop</a></button>
			</div>
		`;
    }
    else {
        cart.cartItems.forEach((cartItem) => {
            const productId = cartItem.productId;
            const matchingproduct = getProduct(productId);
            if (matchingproduct) {
                const priceInfo = getProductPriceInfo(matchingproduct);
                cartSummHTML += `
						<div class="item">
							<img
								src="${matchingproduct.image}"
								alt="" />
							<div class="item-info">
								<h4>${matchingproduct.name}</h4>
								<div class="product-quantity-container">
									<div class="quantity-container">
										<button
											class="quantity-btn"
											onclick="this.nextElementSibling.stepDown()">
											-
										</button>
										<input
											type="number"
											class="quantity-input"
											data-product-id= '${matchingproduct.id}'
											value="${cartItem.quantity}"
											min="1"
											max="100" />
										<button
											class="quantity-btn"
											onclick="this.previousElementSibling.stepUp()">
											+
										</button>
									</div>
								</div>
								<div style = "display:flex">
								<span class = "js-quantity-label-${matchingproduct.id}">
								${cartItem.quantity}×</span><h4">
								${priceInfo.hasDiscount ? `<span class="price original-price" data-original-price-usd-cents="${priceInfo.originalPriceCents}">${priceInfo.originalPrice} ${getCurrencySymbol()}</span><span class="price current-price" data-original-price-usd-cents="${priceInfo.discountedPriceCents}">${priceInfo.discountedPrice} ${getCurrencySymbol()}</span>`
                        : `<span class="price current-price" data-original-price-usd-cents="${priceInfo.originalPriceCents}">${priceInfo.originalPrice} ${getCurrencySymbol()}</span>`}
            </h4>
								</div>
							</div>
							<button class="delete" data-product-id= '${matchingproduct.id}' >x</button>
						</div>
			`;
            }
        });
    }
    document.querySelector(".cart-items").innerHTML =
        cartSummHTML;
    // make delete button work 
    document.querySelectorAll(".delete").forEach((link) => {
        link.addEventListener("click", () => {
            const productId = link.dataset.productId;
            if (productId) {
                cart.removeCart(productId);
            }
            else {
                console.error("Product ID is undefined");
            }
            renderPaymentSummary();
            renderOrderSummray();
            generateToast('rgb(213 19 19)');
        });
    });
    // update product quantity
    document.querySelectorAll(".quantity-input").forEach((link2) => {
        const updateQuantity = () => {
            const productId = link2.dataset.productId;
            let quantity = Number(link2.value);
            if (quantity > 100) {
                quantity = 100;
                link2.value = `100`;
            }
            else if (quantity < 1) {
                quantity = 1;
                link2.value = `1`;
            }
            let matchingItem;
            cart.cartItems.forEach((cartItem) => {
                if (productId === cartItem.productId) {
                    matchingItem = cartItem;
                }
            });
            if (matchingItem) {
                matchingItem.quantity = quantity;
                const quantityLabel = (document.querySelector(`.js-quantity-label-${productId}`));
                quantityLabel.textContent = `${quantity}x`;
                cart.updateCartQuantity();
                cart.savetostorage();
            }
        };
        const prevButton = link2.previousElementSibling;
        const nextButton = link2.nextElementSibling;
        // addEventListeners
        if (prevButton) {
            prevButton.addEventListener("click", () => {
                updateQuantity();
                renderOrderSummray();
                renderPaymentSummary();
            });
        }
        if (nextButton) {
            nextButton.addEventListener("click", () => {
                updateQuantity();
                renderOrderSummray();
                renderPaymentSummary();
            });
        }
        link2.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                updateQuantity();
                renderPaymentSummary();
                renderOrderSummray();
            }
        });
    });
    updateAllPrices();
}
renderOrderSummray();
// generate aside renderSummray for all pages
export function renderPaymentSummary() {
    let subtotalCents = 0;
    let discountedSubtotalCents = 0;
    let cartQuantity = 0;
    cart.cartItems.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        if (product) {
            const priceInfo = getProductPriceInfo(product);
            subtotalCents += priceInfo.originalPriceCents * cartItem.quantity;
            discountedSubtotalCents += priceInfo.discountedPriceCents * cartItem.quantity;
            cartQuantity += cartItem.quantity;
        }
    });
    const finalTotalCents = cart.totalDiscount
        ? Math.round(discountedSubtotalCents * (1 - cart.totalDiscount / 100))
        : discountedSubtotalCents;
    const finalTotal = convMoney(finalTotalCents);
    const paymentSummaryHTML = `
		<h4>Subtotal:</h4>
            <span class="price current-price" data-original-price-usd-cents="${finalTotalCents}">${finalTotal} ${getCurrencySymbol()}</span>
	`;
    document.querySelector(".cart-price").innerHTML =
        paymentSummaryHTML;
    updateAllPrices();
}
renderPaymentSummary();
// ScrollProgress
const up = document.querySelector(".up");
const upi = document.querySelector(".up i");
let height;
let resizeObserver;
function updateHeight() {
    height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
}
function updateScrollProgress() {
    const scrollTop = document.documentElement.scrollTop;
    const angle = Math.min((scrollTop / height) * 360, 360);
    up.style.background = `conic-gradient(white ${angle}deg, transparent 0deg)`;
    upi.classList.toggle("anim", scrollTop + window.innerHeight >= document.documentElement.scrollHeight);
    up.style.transform = scrollTop >= 500 ? "scale(1)" : "scale(0)";
}
function initScrollProgress() {
    updateHeight();
    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    resizeObserver = new ResizeObserver(() => {
        updateHeight();
        updateScrollProgress();
    });
    resizeObserver.observe(document.body);
}
initScrollProgress();
up.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
// Navigation menu functionality
const nav = document.querySelector("nav");
const openNav = document.querySelectorAll(".nav-button");
const overlay = document.querySelector(".overlay");
const mSearch = document.querySelectorAll(".cart i");
const openAside = document.querySelectorAll(".cart-container");
const aside = document.querySelector("aside");
const closeButton = document.querySelectorAll(".close-button");
function toggleActive(open, side) {
    open.forEach((bar) => {
        bar.addEventListener("click", function () {
            side.classList.add(`${side.tagName.toLowerCase()}-active`);
            overlay.classList.add("active");
            const removeActive = () => {
                side.classList.remove(`${side.tagName.toLowerCase()}-active`);
                overlay.classList.remove("active");
            };
            overlay.addEventListener("click", removeActive);
            closeButton.forEach(button => button.addEventListener("click", removeActive));
        });
    });
}
const currentPage = new URL(window.location.href);
if (currentPage.pathname !== '/shopping-cart.html') {
    toggleActive(openAside, aside);
}
toggleActive(openNav, nav);
// open seaarchbar for mobile screens
const searchBar = document.querySelector(".search-bar");
const searchInput = document.querySelector(".search-bar1");
mSearch.forEach((sIcon) => {
    sIcon.addEventListener("click", () => {
        overlay.classList.add('active');
        searchBar.classList.add('active');
        setTimeout(() => {
            searchInput.focus();
        }, 50);
    });
});
// Function to close search
const closeSearch = () => {
    overlay.classList.remove('active');
    searchBar.classList.remove('active');
};
// Close when clicking overlay
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        closeSearch();
    }
});
// Close on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closeSearch();
    }
});
// Prevent search bar clicks from closing
searchBar.addEventListener('click', (e) => {
    e.stopPropagation();
});
// make searchbar work
searchBarCon();
// make taost Notification appear
let toast = null;
let progress = null;
let timer1;
let timer2;
function initializeToast() {
    const toastHTML = `
        <div class="toast">
            <div class="toast-content">
                <i class="fas fa-solid fa-check check"></i>
                <div class="message">
                    <span class="text text-1">Success</span>
                    <span class="text text-2">Your Cart Has Been Successfully Updated!</span>
                </div>
            </div>
            <i class="fa-solid fa-xmark close"></i>
            <div class="progress"></div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', toastHTML);
    toast = document.querySelector(".toast");
    progress = document.querySelector(".progress");
    const closeIcon = document.querySelector(".close");
    closeIcon === null || closeIcon === void 0 ? void 0 : closeIcon.addEventListener("click", hideToast);
}
function hideToast() {
    toast === null || toast === void 0 ? void 0 : toast.classList.remove("active");
    setTimeout(() => {
        progress === null || progress === void 0 ? void 0 : progress.classList.remove("active");
    }, 300);
    clearTimeout(timer1);
    clearTimeout(timer2);
}
export function generateToast(checkColor) {
    if (!toast)
        return;
    document.querySelector('.toast .toast-content .check').style.backgroundColor = `${checkColor}`;
    toast.classList.add("active");
    progress === null || progress === void 0 ? void 0 : progress.classList.add("active");
    clearTimeout(timer1);
    clearTimeout(timer2);
    timer1 = setTimeout(() => {
        toast === null || toast === void 0 ? void 0 : toast.classList.remove("active");
    }, 2000);
    timer2 = setTimeout(() => {
        progress === null || progress === void 0 ? void 0 : progress.classList.remove("active");
    }, 2300);
}
document.addEventListener('DOMContentLoaded', initializeToast);
// handle register and sign in
function initializeHeaderWithAuth() {
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        initializeAuth();
        setupHeaderEventListeners();
    }
}
function setupHeaderEventListeners() {
    const signInElements = document.querySelectorAll('.sign-in');
    const dropdownMenu1 = document.getElementById('dropdownMenu1');
    signInElements.forEach((element) => {
        element.addEventListener('click', (event) => {
            event.preventDefault();
            const authManager = AuthManager.getInstance();
            if (authManager.isLoggedIn()) {
                if (dropdownMenu1) {
                    dropdownMenu1.style.display === 'flex' ? 'none' : "flex";
                }
            }
            else {
                window.location.href = 'register.html';
            }
        });
    });
}
document.addEventListener('DOMContentLoaded', initializeHeaderWithAuth);
initializeCurrency();
