import { products, getProduct, getProductPriceInfo } from '../data/product.js';
import { initializeCategoryLinks, updateBreadcrumb, categoryMappings } from '../data/breadcrumb.js';
import { getCurrencySymbol, updateAllPrices } from "../data/currency.js";
import { setupQuickView, setupAddToCart } from './main.js';
class ProductListing {
    constructor(productsPerPage = 12) {
        this.productsPerPage = productsPerPage;
        this.allProducts = products;
        this.filteredProducts = [];
        this.overlay = this.getOrCreateOverlay();
        this.currentPage = 1;
        this.totalPages = 1;
        this.displayedProducts = [];
        this.sortOrder = 'latest';
        this.searchTerm = '';
        this.productType = null;
        this.initializeState();
        this.render(true);
        this.setupEventListeners();
    }
    initializeState() {
        var _a;
        const urlParams = new URLSearchParams(window.location.search);
        this.sortOrder = urlParams.get('sort') || 'latest';
        this.searchTerm = urlParams.get('search') || '';
        this.productType = urlParams.get('type');
        // If we have a search term that matches a category, set the product type
        if (this.searchTerm && !this.productType) {
            const category = this.searchTerm.toLowerCase();
            const mapping = categoryMappings[category];
            if (mapping) {
                this.productType = mapping.type;
                // Update URL to use type instead of search
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.delete('search');
                newUrl.searchParams.set('type', mapping.type);
                window.history.replaceState({}, '', newUrl.toString());
            }
        }
        // Update breadcrumb navigation
        updateBreadcrumb((_a = this.productType) !== null && _a !== void 0 ? _a : undefined);
        this.filterAndSortProducts();
        this.totalPages = Math.ceil(this.filteredProducts.length / this.productsPerPage);
        this.currentPage = this.getValidPageNumber(urlParams.get('page'));
        this.updateSortSelect();
    }
    filterAndSortProducts() {
        this.filteredProducts = this.allProducts.filter(product => {
            var _a;
            const searchMatch = this.searchTerm
                ? product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                    product.keywords.some(keyword => keyword.toLowerCase().includes(this.searchTerm.toLowerCase()))
                : true;
            const typeMatch = this.productType
                ? ((_a = product.type) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === this.productType.toLowerCase()
                : true;
            return searchMatch && typeMatch;
        });
        const sortFunctions = {
            latest: (a, b) => parseInt(b.id) - parseInt(a.id),
            asc: (a, b) => a.priceCents - b.priceCents,
            desc: (a, b) => b.priceCents - a.priceCents
        };
        this.filteredProducts.sort(sortFunctions[this.sortOrder]);
    }
    render(isInitialLoad = false) {
        this.filterAndSortProducts();
        this.updateDisplayedProducts();
        this.renderProducts(isInitialLoad);
        this.renderPagination();
    }
    updateDisplayedProducts() {
        const startIndex = (this.currentPage - 1) * this.productsPerPage;
        this.displayedProducts = this.filteredProducts.slice(startIndex, startIndex + this.productsPerPage);
    }
    renderProducts(isInitialLoad = false) {
        const productsContainer = document.querySelector('.products1.products-container');
        const noFound = document.querySelector('.no');
        if (!productsContainer)
            return;
        if (!isInitialLoad) {
            this.fadeOutProducts(productsContainer);
        }
        setTimeout(() => {
            if (this.filteredProducts.length > 0) {
                productsContainer.innerHTML = this.displayedProducts.map(this.createProductHTML).join('');
                // Set up event listeners after rendering products
                setupQuickView();
                setupAddToCart();
            }
            else {
                noFound.innerHTML = '<p class="no-found"><i class="fa-solid fa-exclamation"></i> No products were found matching your selection.</p>';
            }
            updateAllPrices();
            setTimeout(() => this.fadeInProducts(productsContainer), 50);
        }, isInitialLoad ? 0 : 300);
    }
    createProductHTML(product) {
        const priceInfo = getProductPriceInfo(product);
        return `
            <div class="card fade-in">
                <div class="img-con">
                <span ${product.availability ? 'style="display: none;"' : ''} class = "${product.availability ? '' : 'out-of-stock'}">OUT OF STOCK</span>
				${priceInfo.hasDiscount ? `<span class="discount">${product.discountPercentage}% OFF</span>` : ''}
                    <div class="buttons">
                        <button class="view-button" data-product-id="${product.id}" data-pop="Quick view">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                        <button ${product.availability ? '' : 'style="display: none;"'} class="add-to-cart" data-product-id="${product.id}" data-pop="Add to Cart">
                            <i class="fa-solid fa-cart-shopping"></i>
                        </button>
                    </div>
                    <a href="product-details.html?productId=${product.id}">
                        <img loading="lazy" decoding="async" src="${product.image}" alt="${product.name}" />
                    </a>
                </div>
                <a href="product-details.html?productId=${product.id}">
                    <h4>${product.name}</h4>
                </a>
                <p>${product.description}</p>
                <div style = "text-align:center; padding: 10px 0;">
                    ${priceInfo.hasDiscount
            ? `<span class="price original-price" data-original-price-usd-cents="${priceInfo.originalPriceCents}">${priceInfo.originalPrice} ${getCurrencySymbol()}</span><span class="price current-price" data-original-price-usd-cents="${priceInfo.discountedPriceCents}">${priceInfo.discountedPrice} ${getCurrencySymbol()}</span>`
            : `<span class="price current-price" data-original-price-usd-cents="${priceInfo.originalPriceCents}">${priceInfo.originalPrice} ${getCurrencySymbol()}</span>`}
                </div>
            </div>
        `;
    }
    fadeOutProducts(container) {
        const products = container.querySelectorAll('.card');
        products.forEach(product => product.classList.add('fade-out'));
    }
    fadeInProducts(container) {
        const products = container.querySelectorAll('.card');
        products.forEach(product => product.classList.remove('fade-in'));
    }
    renderPagination() {
        const pagination = document.getElementById('pagination');
        if (!pagination)
            return;
        pagination.innerHTML = Array.from({ length: this.totalPages }, (_, i) => i + 1)
            .map(page => `
                <button ${page === this.currentPage ? 'disabled' : ''}>
                    ${page}
                </button>
            `).join('');
    }
    setupEventListeners() {
        var _a, _b, _c;
        (_a = document.getElementById('sort-select')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', this.handleSortChange.bind(this));
        (_b = document.getElementById('pagination')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', this.handlePaginationClick.bind(this));
        (_c = document.querySelector('.products-container')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', this.handleProductAction.bind(this));
        window.addEventListener('popstate', this.handlePopState.bind(this));
    }
    handleSortChange(event) {
        const select = event.target;
        this.changeSort(select.value);
    }
    handlePaginationClick(event) {
        const button = event.target.closest('button');
        if (button) {
            this.changePage(parseInt(button.textContent || '1'));
        }
    }
    handleProductAction(event) {
        const target = event.target;
        const card = target.closest('.card');
        if (card) {
            const productLink = card.querySelector('a[href^="product-details.html"]');
            if (productLink) {
                const productId = new URLSearchParams(productLink.href.split('?')[1]).get('productId');
                const product = productId ? getProduct(productId) : null;
                if (product) {
                    updateBreadcrumb(product.type);
                }
            }
        }
    }
    changePage(page) {
        this.currentPage = page;
        this.updateUrl();
        this.render();
    }
    changeSort(order) {
        this.sortOrder = order;
        this.currentPage = 1;
        this.updateUrl();
        this.render();
    }
    updateUrl() {
        const url = new URL(window.location.href);
        url.searchParams.set('page', this.currentPage.toString());
        url.searchParams.set('sort', this.sortOrder);
        if (this.searchTerm)
            url.searchParams.set('search', this.searchTerm);
        if (this.productType)
            url.searchParams.set('type', this.productType);
        window.history.pushState({ page: this.currentPage, sort: this.sortOrder, type: this.productType }, '', url.toString());
    }
    handlePopState() {
        this.initializeState();
        this.render();
    }
    getOrCreateOverlay() {
        let overlay = document.querySelector('.overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'overlay';
            document.body.appendChild(overlay);
        }
        return overlay;
    }
    getValidPageNumber(pageParam) {
        const page = parseInt(pageParam || '1');
        return isNaN(page) ? 1 : Math.max(1, Math.min(page, this.totalPages));
    }
    updateSortSelect() {
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect)
            sortSelect.value = this.sortOrder;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    initializeCategoryLinks();
});
new ProductListing();
