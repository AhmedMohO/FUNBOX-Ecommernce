var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Cart_instances, _Cart_localStorageName, _Cart_loadFromStorage, _Cart_isInStock;
import { generateToast } from "../js/global.js";
import { getProduct, getProductPriceInfo, getStockInfo } from "../data/product.js";
export class Cart {
    constructor(localStorageName) {
        _Cart_instances.add(this);
        this.cartItems = [];
        _Cart_localStorageName.set(this, void 0);
        __classPrivateFieldSet(this, _Cart_localStorageName, localStorageName, "f");
        __classPrivateFieldGet(this, _Cart_instances, "m", _Cart_loadFromStorage).call(this);
        __classPrivateFieldGet(this, _Cart_instances, "m", _Cart_isInStock).call(this);
    }
    savetostorage() {
        localStorage.setItem(__classPrivateFieldGet(this, _Cart_localStorageName, "f"), JSON.stringify(this.cartItems));
    }
    clearstorage() {
        localStorage.removeItem(__classPrivateFieldGet(this, _Cart_localStorageName, "f"));
    }
    addToCart(productId, quantity, _priceCents) {
        const product = getProduct(productId);
        if (!product) {
            console.error('Product not found');
            return;
        }
        const priceInfo = getProductPriceInfo(product);
        // Use the discounted price if available, otherwise use regular price
        const effectivePriceCents = priceInfo.hasDiscount
            ? priceInfo.discountedPriceCents
            : product.priceCents;
        let matchingItem = this.cartItems.find((cartItem) => productId === cartItem.productId);
        if (matchingItem) {
            matchingItem.quantity += quantity;
            // Update the price in case it has changed
            matchingItem.priceCents = effectivePriceCents;
        }
        else {
            this.cartItems.push({
                productId,
                quantity,
                priceCents: effectivePriceCents
            });
        }
        this.savetostorage();
        generateToast('rgb(25,219,7)');
    }
    updateCartQuantity() {
        let cartQuantity = 0;
        this.cartItems.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });
        document.querySelectorAll(".cart-counter").forEach((counter) => {
            counter.textContent = `${cartQuantity}`;
        });
    }
    removeCart(productId) {
        this.cartItems = this.cartItems.filter((item) => item.productId !== productId);
        this.updateCartQuantity();
        this.savetostorage();
    }
}
_Cart_localStorageName = new WeakMap(), _Cart_instances = new WeakSet(), _Cart_loadFromStorage = function _Cart_loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(__classPrivateFieldGet(this, _Cart_localStorageName, "f")) || "[]");
}, _Cart_isInStock = function _Cart_isInStock() {
    const outOfStockItems = getStockInfo();
    if (outOfStockItems.length > 0) {
        outOfStockItems.forEach(item => {
            this.removeCart(item.id);
        });
    }
};
export const cart = new Cart("cart");
export function resetStorage() {
    cart.cartItems = [];
    cart.clearstorage();
    cart.updateCartQuantity();
}
;
