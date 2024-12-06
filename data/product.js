import { convMoney } from "../data/money.js";
export function getProduct(productId) {
    const product = products.find((product) => product.id === productId);
    return product || null;
}
export function getProductPriceInfo(product) {
    const hasDiscount = product.hasDiscount();
    return {
        originalPrice: product.getPrice(),
        discountedPrice: product.getDiscountedPrice(),
        hasDiscount,
        originalPriceCents: product.priceCents,
        discountedPriceCents: product.getDiscountedPriceCents()
    };
}
export class Product {
    constructor(productDetails) {
        this.id = productDetails.id;
        this.image = productDetails.image;
        this.name = productDetails.name;
        this.priceCents = productDetails.priceCents;
        this.description = productDetails.description;
        this.type = productDetails.type;
        this.keywords = productDetails.keywords;
        this.availability = productDetails.availability;
        this.discountPercentage = productDetails.discountPercentage;
        // Object.assign(this, productDetails);
    }
    getPrice() {
        return convMoney(this.priceCents);
    }
    getDiscountedPriceCents() {
        if (!this.discountPercentage)
            return this.priceCents;
        return Math.floor(this.priceCents * (1 - this.discountPercentage / 100));
    }
    getDiscountedPrice() {
        return convMoney(this.getDiscountedPriceCents());
    }
    hasDiscount() {
        return !!this.discountPercentage && this.discountPercentage > 0;
    }
}
export const products = [
    {
        id: "1",
        image: "imgs/Steam-Wallet-Code-USA-5-USD-553x800.jpg",
        name: "Steam Wallet Code USD 5$",
        description: "Steam Wallet Code USD 5$",
        priceCents: 500,
        keywords: ["Steam Wallet Code USA USD 20", "Steam", "Wallet"],
        type: "steam",
        availability: true,
        discountPercentage: 70,
    },
    {
        id: "2",
        image: "imgs/Steam-Wallet-Code-USA-10-USD-553x800.jpg",
        name: "Steam Wallet Code USD 10$",
        description: "Steam Wallet Code USD 10$",
        priceCents: 1000,
        keywords: ["Steam Wallet Code USA USD 10", "Steam", "Wallet"],
        type: "steam",
        availability: true,
        discountPercentage: 23,
    },
    {
        id: "3",
        image: "imgs/Steam-Wallet-Code-USA-20-USD-553x8001.jpg",
        name: "Steam Wallet Code USD 20$",
        description: "Steam Wallet Code USD 20$",
        priceCents: 2000,
        keywords: ["Steam Wallet Code USA USD 20", "Steam", "Wallet"],
        type: "steam",
        availability: true,
        discountPercentage: 80,
    },
    {
        id: "4",
        image: "imgs/Steam-Wallet-Code-USA-50-USD-553x800.jpg",
        name: "Steam Wallet Code USD 50$",
        description: "Steam Wallet Code USD 50$",
        priceCents: 5000,
        keywords: ["Steam Wallet Code USA USD 50", "Steam", "Wallet"],
        type: "steam",
        availability: true,
        discountPercentage: 64,
    },
    {
        id: "5",
        image: "imgs/Steam-Wallet-Code-USA-100-USD-553x800.jpg",
        name: "Steam Wallet Code USD 100$",
        description: "Steam Wallet Code USD 100$",
        priceCents: 10000,
        keywords: ["Steam Wallet Code USA USD 100", "Steam", "Wallet"],
        type: "steam",
        availability: true,
        discountPercentage: 70,
    },
    {
        id: "6",
        image: "imgs/playstation-network-card-10.jpg",
        name: "playstation network card $10",
        description: "playstation network card $10",
        priceCents: 10000,
        keywords: ["playstation network card 10", "playstation", "psn"],
        type: "playstation",
        availability: true,
    },
    {
        id: "7",
        image: "imgs/playstation-network-card-25.jpg",
        name: "playstation network card $25",
        description: "playstation network card $25",
        priceCents: 2500,
        keywords: ["playstation network card 25", "playstation", "psn"],
        type: "playstation",
        availability: true,
    },
    {
        id: "8",
        image: "imgs/playstation-network-card-40.png",
        name: "playstation network card $40",
        description: "playstation network card $40",
        priceCents: 4000,
        keywords: ["playstation network card 40", "playstation", "psn"],
        type: "playstation",
        availability: false,
    },
    {
        id: "9",
        image: "imgs/playstation-network-card-50.jpg",
        name: "playstation network card $50",
        description: "playstation network card $50",
        priceCents: 5000,
        keywords: ["playstation network card 50", "playstation", "psn"],
        type: "playstation",
        availability: true,
        discountPercentage: 34,
    },
    {
        id: "10",
        image: "imgs/playstation-network-card-75.jpg",
        name: "playstation network card $75",
        description: "playstation network card $75",
        priceCents: 7500,
        keywords: ["playstation network card 75", "playstation", "psn"],
        type: "playstation",
        availability: true,
        discountPercentage: 44,
    },
    {
        id: "11",
        image: "imgs/playstation-network-card-100.jpg",
        name: "playstation network card $100",
        description: "playstation network card $100",
        priceCents: 10000,
        keywords: ["playstation network card 100", "playstation", "psn"],
        type: "playstation",
        availability: true,
    },
    {
        id: "12",
        image: "imgs/20-EUR-Valorant-Points-430x575.png",
        name: "20 EUR Valorant Points",
        description: "20 EUR Valorant Points",
        priceCents: 2144,
        keywords: ["20 EUR Valorant Points", "Valorant", "points"],
        type: "valorant",
        availability: true,
    },
    {
        id: "13",
        image: "imgs/25-EUR-Valorant-Points-430x575.png",
        name: "25 EUR Valorant Points",
        description: "25 EUR Valorant Points",
        priceCents: 2680,
        keywords: ["25 EUR Valorant Points", "Valorant", "points"],
        type: "valorant",
        availability: true,
    },
    {
        id: "14",
        image: "imgs/50-EUR-Valorant-Points-430x575.png",
        name: "50 EUR Valorant Points",
        description: "50 EUR Valorant Points",
        priceCents: 5350,
        keywords: ["50 EUR Valorant Points", "Valorant", "points"],
        type: "valorant",
        availability: true,
    },
    {
        id: "15",
        image: "imgs/100-EUR-Valorant-Points-430x575.png",
        name: "100 EUR Valorant Points",
        description: "100 EUR Valorant Points",
        priceCents: 10700,
        keywords: ["100 EUR Valorant Points", "Valorant", "points"],
        type: "valorant",
        availability: true,
    },
    {
        id: "16",
        image: "imgs/pubg-60-430x602.png.avif",
        name: "PUBG MOBILE 60 UC (GLOBAL)",
        description: "PUBG MOBILE 60 UC (GLOBAL)",
        priceCents: 90,
        keywords: ["PUBG-MOBILE 60 UC (GLOBAL)", "PUBG", "MOBILE", "uc"],
        type: "pubg mobile",
        availability: true,
    },
    {
        id: "17",
        image: "imgs/pubg-325-430x605.png.avif",
        name: "PUBG MOBILE 325 UC (GLOBAL)",
        description: "PUBG MOBILE 325 UC (GLOBAL)",
        priceCents: 450,
        keywords: ["PUBG-MOBILE 325 UC (GLOBAL)", "PUBG", "MOBILE", "uc"],
        type: "pubg mobile",
        availability: true,
    },
    {
        id: "18",
        image: "imgs/pubg-660-430x602.png.avif",
        name: "PUBG MOBILE 660 UC (GLOBAL)",
        description: "PUBG MOBILE 660 UC (GLOBAL)",
        priceCents: 900,
        keywords: ["PUBG-MOBILE 660 UC (GLOBAL)", "PUBG", "MOBILE", "uc"],
        type: "pubg mobile",
        availability: true,
    },
    {
        id: "19",
        image: "imgs/pubg-1800-430x603.png.avif",
        name: "PUBG MOBILE 1800 UC (GLOBAL)",
        description: "PUBG MOBILE 1800 UC (GLOBAL)",
        priceCents: 2250,
        keywords: ["PUBG-MOBILE 1800 UC (GLOBAL)", "PUBG", "MOBILE", "uc"],
        type: "pubg mobile",
        availability: true,
    },
    // {
    // 	id: "20",
    // 	image: "imgs/freefire-card.png",
    // 	name: "Free Fire",
    // 	description: "Free Fire",
    // 	priceCents: 2250,
    // 	keywords: ["Free-Fire", "PUBG", "MOBILE", "uc"],
    // 	type: "free fire",
    // 	availability: true,
    // },
].map((productDetails) => {
    return new Product(productDetails);
});
