var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getProduct, getProductPriceInfo, products } from "../data/product.js";
import { setupAddToCart, setupQuickView, createTypeHTML, setupQuickViewAddToCart } from "./main.js";
import { getCurrencySymbol } from "../data/currency.js";
// generate productDetails pages for products
function renderproductDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        // generate product url according to product id
        const url = new URL(window.location.href);
        const productId = url.searchParams.get('productId');
        ;
        const matchingproduct = getProduct(productId);
        let trackHTML = ``;
        if (!matchingproduct) {
            console.error("Product not found");
            return;
        }
        ;
        const priceInfo = getProductPriceInfo(matchingproduct);
        document.title = matchingproduct.name;
        trackHTML = `
            <img src="${matchingproduct.image}" alt="" />
            <div class="view-info">
                <h1>${matchingproduct.name}</h1>
                <h3>
                    ${priceInfo.hasDiscount ? `<span class="price original-price" data-original-price-usd-cents="${priceInfo.originalPriceCents}">${priceInfo.originalPrice} ${getCurrencySymbol()}</span><span class="price current-price" data-original-price-usd-cents="${priceInfo.discountedPriceCents}">${priceInfo.discountedPrice} ${getCurrencySymbol()}</span>`
            : `<span class="price current-price" data-original-price-usd-cents="${priceInfo.originalPriceCents}">${priceInfo.originalPrice} ${getCurrencySymbol()}</span>`}
                </h3>
                <h5><strong>Notes:</strong></h5>
                <ul>
                    <li>
                        Sale items are not eligible for returns, exchanges, or refunds.
                    </li>
                </ul>
                <div ${matchingproduct.availability ? '' : 'style="display: none;"'} class="input">
                    <div class="product-quantity-container">
                        <div class="quantity-container">
                            <button
                                class="quantity-btn"
                                onclick="this.nextElementSibling.stepDown()">
                                -
                            </button>
                            <input
                                type="number"
                                class="quantity-input quantity-input-d"
                                value="1"
                                min="1"
                                max="100" />
                            <button
                                class="quantity-btn"
                                onclick="this.previousElementSibling.stepUp()">
                                +
                            </button>
                        </div>
                    </div>
                    <button class="add-to-cart add-to-cart-d" data-product-id="${matchingproduct.id}">
                        ADD TO CART
                    </button>
                </div>
				<p style="color: #ff0000; ${matchingproduct.availability ? 'display: none;' : ''}" >Out Of Stock</p>
                <p><strong>Categories:</strong> ${matchingproduct.type}</p>
                <p>
                    <strong>Share:</strong>
                    <i class="fa-brands fa-facebook-f"></i>
                    <i class="fa-brands fa-x-twitter"></i>
                    <i class="fa-brands fa-linkedin-in"></i>
                    <i class="fa-brands fa-whatsapp"></i>
                    <i class="fa-brands fa-telegram"></i>
                </p>
            </div>
        `;
        const VP = document.querySelector('.view-product1');
        VP.innerHTML = trackHTML;
        setupQuickViewAddToCart(VP);
        // insert info for product description
        document.querySelector('.product-description .name').textContent = `${matchingproduct.name}`;
        document.querySelector('.product-description .type').textContent = `How to redeem A ${matchingproduct.type} Code?`;
        document.querySelector('.inner-li').innerHTML = `
                    <li>Login to your ${matchingproduct.type} account.</li>
					<li class="li-catch">Go to Redeem a ${matchingproduct.type} Code page.</li>
					<li>
						Enter the ${matchingproduct.type} Gift Card Code that you bought from us and click
						Continue.
					</li>
					<li>
						The funds will be added to your account and be ready for use to buy
						or gift games on ${matchingproduct.type}!
					</li>`;
        const productsContainer = document.querySelector(".products");
        const productTypes = [matchingproduct.type];
        const htmlContent = productTypes.map(type => {
            const specificProducts = products.filter(product => product.type === type && product.name !== matchingproduct.name);
            return specificProducts.length ? createTypeHTML(type !== null && type !== void 0 ? type : 'steam', specificProducts) : '';
        }).join('');
        if (productsContainer)
            productsContainer.innerHTML = htmlContent;
        setupQuickView();
        setupAddToCart();
        const suggestSwiper = new Swiper(".swiper-3", {
            slidesPerView: 2,
            loop: true,
            spaceBetween: 40,
            breakpoints: { 640: { slidesPerView: 4 } },
            autoplay: { pauseOnMouseEnter: true, delay: 2000 },
            speed: 500,
        });
    });
}
renderproductDetails();
