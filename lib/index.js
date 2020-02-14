'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// These can be collapsed into a single function
const getProducer = (producerName, producers) => {
    return producers.find(({ name }) => name === producerName);
};
const getProduct = (productName, products) => {
    return products.find(({ name }) => name === productName);
};
const getSeller = (sellerName, sellers) => {
    return sellers.find(({ name }) => name === sellerName);
};
//# sourceMappingURL=getters.js.map

const calculateStore = (store, item, quantity) => {
    const newQuantity = (store[item] || 0) + quantity;
    return Object.assign(Object.assign({}, store), { [item]: parseFloat(newQuantity.toFixed(2)) });
};
//# sourceMappingURL=calculateStore.js.map

const message = (message, isSuccessful) => {
    return {
        message,
        isSuccessful,
    };
};
//# sourceMappingURL=message.js.map

const calculateMultiplerCost = (cost, currentQuantity, multipler) => {
    return currentQuantity === 0
        ? cost
        : Math.floor(cost * multipler ** currentQuantity);
};
//# sourceMappingURL=calculateMultiplerCost.js.map

const config = {
    tickRate: 1000,
};
//# sourceMappingURL=config.js.map

var ProducerType;
(function (ProducerType) {
    ProducerType["chicken"] = "chicken";
    ProducerType["chicken_coop"] = "chicken_coop";
    ProducerType["chicken_barn"] = "chicken_barn";
    ProducerType["field_of_wild_chickens"] = "field_of_wild_chickens";
    ProducerType["chicken_resort"] = "chicken_resort";
    ProducerType["cow"] = "cow";
})(ProducerType || (ProducerType = {}));
//# sourceMappingURL=producers.js.map

// export type ProductType = 'egg' | 'milk'
var ProductType;
(function (ProductType) {
    ProductType["egg"] = "egg";
    ProductType["milk"] = "milk";
})(ProductType || (ProductType = {}));
//# sourceMappingURL=products.js.map

const producers = [
    {
        name: ProducerType.chicken,
        cost: 1000,
        multiplier: 1.05,
        produces: { name: ProductType.egg, rate: 0.1 },
    },
    {
        name: ProducerType.chicken_coop,
        cost: 10000,
        multiplier: 1.07,
        produces: { name: ProductType.egg, rate: 1 },
    },
    {
        name: ProducerType.chicken_barn,
        cost: 100000,
        multiplier: 1.07,
        produces: { name: ProductType.egg, rate: 5 },
    },
    {
        name: ProducerType.field_of_wild_chickens,
        cost: 300000,
        multiplier: 1.27,
        produces: { name: ProductType.egg, rate: 10 },
    },
    {
        name: ProducerType.chicken_resort,
        cost: 1000000,
        multiplier: 1.4,
        produces: { name: ProductType.egg, rate: 100 },
    },
    {
        name: ProducerType.cow,
        cost: 10000,
        multiplier: 1.1,
        produces: { name: ProductType.milk, rate: 1 },
    },
];
//# sourceMappingURL=producers.js.map

const products = [
    {
        name: ProductType.egg,
        value: 100,
    },
    {
        name: ProductType.milk,
        value: 200,
    },
];
//# sourceMappingURL=products.js.map

// export type SellerType = 'for_sale_sign' | 'farmer'
var SellerType;
(function (SellerType) {
    SellerType["for_sale_sign"] = "for_sale_sign";
    SellerType["newspaper_ad"] = "newspaper_ad";
    SellerType["craigslist_ad"] = "craigslist_ad";
    SellerType["chicken_dealer"] = "chicken_dealer";
    SellerType["shopkeeper"] = "shopkeeper";
    SellerType["farmer"] = "farmer";
})(SellerType || (SellerType = {}));
//# sourceMappingURL=sellers.js.map

const sellers = [
    {
        name: SellerType.for_sale_sign,
        cost: 1000,
        multiplier: 1.05,
        products: {
            name: ProductType.egg,
            rate: 1,
        },
    },
    {
        name: SellerType.newspaper_ad,
        cost: 5000,
        multiplier: 1.05,
        products: {
            name: ProductType.egg,
            rate: 2,
        },
    },
    {
        name: SellerType.craigslist_ad,
        cost: 7500,
        multiplier: 1.05,
        products: {
            name: ProductType.egg,
            rate: 5,
        },
    },
    {
        name: SellerType.chicken_dealer,
        cost: 10000,
        multiplier: 1.05,
        products: {
            name: ProductType.egg,
            rate: 7,
        },
    },
    {
        name: SellerType.shopkeeper,
        cost: 20000,
        multiplier: 1.05,
        products: {
            name: ProductType.egg,
            rate: 10,
        },
    },
    {
        name: SellerType.farmer,
        cost: 1000,
        multiplier: 1.05,
        products: {
            name: ProductType.milk,
            rate: 1,
        },
    },
];
//# sourceMappingURL=sellers.js.map

class Farm {
    constructor({ producers: producers$1 = producers, products: products$1 = products, sellers: sellers$1 = sellers, handleTick = () => { }, }) {
        this.products = products$1;
        this.producers = producers$1;
        this.sellers = sellers$1;
        this.handleTick = handleTick;
        this.farmProducers = {};
        this.farmSellers = {};
        this.farmProducts = {};
        this.farmBank = 100000;
        this.initialiseClock();
    }
    initialiseClock() {
        setInterval(() => this.onTick(), config.tickRate );
    }
    onTick() {
        this.produce();
        this.consume();
        this.handleTick(this.total());
    }
    buy(item) {
        if (item in ProducerType) {
            const producerInfo = getProducer(item, this.producers);
            const currentQuantity = this.farmProducers[item] || 0;
            const multiplerCost = calculateMultiplerCost(producerInfo.cost, currentQuantity, producerInfo.multiplier);
            if (this.farmBank <= multiplerCost) {
                return message('Not enough money', false);
            }
            this.farmBank -= multiplerCost;
            this.farmProducers = calculateStore(this.farmProducers, item, 1);
            return message(`Bought ${item}`, true);
        }
        else if (item in SellerType) {
            const sellerInfo = getSeller(item, this.sellers);
            const currentQuantity = this.farmSellers[item] || 0;
            const multiplerCost = calculateMultiplerCost(sellerInfo.cost, currentQuantity, sellerInfo.multiplier);
            if (this.farmBank <= multiplerCost) {
                return message('Not enough money', false);
            }
            this.farmBank -= multiplerCost;
            this.farmSellers = calculateStore(this.farmSellers, item, 1);
            return message(`Bought ${item} for ${multiplerCost}`, true);
        }
        else {
            return message(`Cannot find: ${item} in availible lists`, false);
        }
    }
    sell(product, quantity = 1) {
        // Does product exist?
        if (!(product in ProductType)) {
            return message(`Cannot find ${product}`, false);
        }
        const productInfo = getProduct(product, this.products);
        // Does the product exist?
        // Is there enough product to sell?
        if ((this.farmProducts[product] || 0) <= quantity) {
            return message(`You dont have enough ${product}s to sell`, false);
        }
        this.farmBank += productInfo.value * quantity;
        this.farmProducts = calculateStore(this.farmProducts, product, -quantity);
        return message(`Sold ${product} (x${quantity})`, true);
    }
    produce() {
        // for each producer, generate their products into farm products
        for (const [producerName, quantity] of Object.entries(this.farmProducers)) {
            // Does producer exist?
            if (!(producerName in ProducerType)) {
                return message(`Cannot find ${producerName}`, false);
            }
            const producerInfo = getProducer(producerName, this.producers);
            const productToProduce = producerInfo.produces;
            const totalQty = productToProduce.rate * (quantity || 0);
            this.farmProducts = calculateStore(this.farmProducts, productToProduce.name, totalQty);
        }
    }
    consume() {
        var _a;
        // for each seller, sell max possible of good
        for (const [sellerName, quantity] of Object.entries(this.farmSellers)) {
            // Does seller exist?
            if (!(sellerName in SellerType)) {
                return message(`Cannot find ${sellerName}`, false);
            }
            const sellerInfo = getSeller(sellerName, this.sellers);
            const productToSell = (_a = sellerInfo) === null || _a === void 0 ? void 0 : _a.products.name;
            const totalSell = sellerInfo.products.rate * (quantity || 0);
            const availibleProducts = Math.floor(this.farmProducts[productToSell] || 0);
            // If total sell exceeds availible, only sell availible
            const maxSell = Math.min(totalSell, availibleProducts);
            if (maxSell > 0) {
                this.sell(productToSell, maxSell);
            }
        }
    }
    total() {
        return {
            farmProducers: this.farmProducers,
            farmProducts: this.farmProducts,
            farmSellers: this.farmSellers,
            farmBank: this.farmBank,
        };
    }
    save() {
        const date = Date.now();
        const progress = {
            farmProducers: this.farmProducers,
            farmProducts: this.farmProducts,
            farmSellers: this.farmSellers,
            farmBank: this.farmBank,
            date,
        };
        const stringify = JSON.stringify(progress);
        const encoded = Buffer.from(stringify, 'binary').toString('base64');
        return encoded;
    }
    load(progress) {
        const decoded = Buffer.from(progress, 'base64').toString('binary');
        const progressData = JSON.parse(decoded);
        const { farmProducers, farmProducts, farmSellers, farmBank, date, } = progressData;
        const loadData = new Date(date);
        this.farmProducers = farmProducers;
        this.farmProducts = farmProducts;
        this.farmSellers = farmSellers;
        this.farmBank = farmBank;
        return message(`Loading save from ${loadData}`, true);
    }
}

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
const formatPrice = (price) => formatter.format(price / 1000);
//# sourceMappingURL=format.js.map

const onTick = ({ farmProducers, farmProducts, farmSellers, farmBank, }) => {
    console.log({
        producers: farmProducers,
        products: farmProducts,
        sellers: farmSellers,
        total: formatPrice(farmBank),
    });
};
//# sourceMappingURL=debugLogger.js.map

const farmLib = new Farm({
    handleTick: onTick,
});
// console.log(farmLib.buy('for_sale_sign'))
console.log(farmLib.buy('chicken'));
console.log(farmLib.buy('chicken'));
console.log(farmLib.buy('chicken'));
console.log(farmLib.buy('chicken'));
console.log(farmLib.buy('chicken'));
console.log(farmLib.buy('chicken'));
console.log(farmLib.buy('chicken'));
console.log(farmLib.buy('chicken'));
console.log(farmLib.buy('chicken'));
console.log(farmLib.buy('chicken'));
console.log(farmLib.buy('chicken'));
console.log(farmLib.buy('chicken'));
console.log(farmLib.buy('chicken'));
// console.log(
//   farmLib.load(
//     'eyJmYXJtUHJvZHVjZXJzIjp7ImNoaWNrZW5fY29vcCI6MX0sImZhcm1Qcm9kdWN0cyI6e30sImZhcm1TZWxsZXJzIjp7ImZvcl9zYWxlX3NpZ24iOjF9LCJmYXJtQmFuayI6ODkwMDAsImRhdGUiOjE1ODE1MDY0MDE1NDF9'
//   )
// )
//# sourceMappingURL=index.js.map

exports.default = Farm;
exports.producers = producers;
exports.products = products;
exports.sellers = sellers;
