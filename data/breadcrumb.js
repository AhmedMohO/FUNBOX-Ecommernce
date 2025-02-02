import { products } from "./product.js";
function generateCategoryMappings() {
    // Get unique product types
    const uniqueTypes = [...new Set(products.map(product => product.type.toLowerCase()))];
    // Create mappings object
    const mappings = {};
    // Map common search terms to their respective types
    uniqueTypes.forEach(type => {
        // Add direct type mapping
        mappings[type] = { type };
        // Add common variations/aliases
        switch (type) {
            case 'playstation':
                mappings['psn'] = { type };
                break;
            case 'valorant':
                mappings['valo'] = { type };
                break;
            case 'genshin impact':
                mappings['genshin'] = { type };
                break;
            case 'league of legends':
                mappings['league'] = { type };
                break;
            default:
                // For types without variations, use the type itself as the key
                mappings[type.replace(/\s+/g, '')] = { type };
        }
    });
    return mappings;
}
export const categoryMappings = generateCategoryMappings();
export function updateBreadcrumb(productType) {
    const orderProgress = document.querySelector('.order-progress a');
    const currentPath = document.querySelector('.current-path');
    if (!orderProgress)
        return;
    if (!currentPath)
        return;
    // Create base navigation structure
    const homeLink = document.createElement('a');
    homeLink.href = '/';
    homeLink.textContent = 'Home';
    const separator1 = document.createTextNode(' - ');
    const shopLink = document.createElement('a');
    shopLink.href = 'shop.html';
    shopLink.textContent = 'Shop';
    // Clear existing content
    orderProgress.appendChild(shopLink);
    currentPath.innerHTML = '';
    // Add home and shop links
    currentPath.appendChild(homeLink);
    currentPath.appendChild(separator1);
    currentPath.appendChild(shopLink);
    // If product type is provided, add it to the breadcrumb
    if (productType) {
        const separator2 = document.createTextNode(' - ');
        const typeLink = document.createElement('a');
        typeLink.href = `shop.html?type=${encodeURIComponent(productType)}`;
        // Capitalize each word in the product type
        typeLink.textContent = productType
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        currentPath.appendChild(separator2);
        currentPath.appendChild(typeLink);
        orderProgress.innerHTML = productType;
    }
}
export function initializeCategoryLinks() {
    const featuredCategories = document.querySelector('.featured-categories');
    if (!featuredCategories)
        return;
    featuredCategories.addEventListener('click', (event) => {
        event.preventDefault();
        const link = event.target.closest('a');
        if (!link)
            return;
        const currentUrl = new URL(link.href);
        const searchParam = currentUrl.searchParams.get('search');
        if (!searchParam)
            return;
        const category = searchParam.replace('+', ' ').toLowerCase();
        const mapping = categoryMappings[category];
        if (mapping) {
            const newUrl = new URL('shop.html', window.location.origin);
            newUrl.searchParams.set('type', mapping.type);
            if (mapping.search) {
                newUrl.searchParams.set('search', mapping.search);
            }
            window.location.href = newUrl.toString();
        }
    });
}
