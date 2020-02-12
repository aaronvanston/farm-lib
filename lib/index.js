'use strict';

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
    return Object.assign(Object.assign({}, store), { [item]: (store[item] || 0) + quantity });
};
//# sourceMappingURL=calculateStore.js.map

const message = (message, isSuccessful) => {
    return {
        message,
        isSuccessful,
    };
};
//# sourceMappingURL=message.js.map

const config = {
    tickRate: 1000,
};
//# sourceMappingURL=config.js.map

// export type ProducerType = 'chicken' | 'cow'
var ProducerType;
(function (ProducerType) {
    ProducerType["chicken"] = "chicken";
    ProducerType["cow"] = "cow";
})(ProducerType || (ProducerType = {}));
//# sourceMappingURL=producers.js.map

// export type SellerType = 'for_sale_sign' | 'farmer'
var SellerType;
(function (SellerType) {
    SellerType["for_sale_sign"] = "for_sale_sign";
    SellerType["farmer"] = "farmer";
})(SellerType || (SellerType = {}));
//# sourceMappingURL=sellers.js.map

class Farm {
    constructor({ producers, products, sellers }, handleTick = () => { }) {
        this.products = products;
        this.producers = producers;
        this.sellers = sellers;
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
            if (!producerInfo) {
                return message(`Cannot find ${item}`, false);
            }
            if (this.farmBank <= producerInfo.cost) {
                return message('Not enough money', false);
            }
            this.farmBank -= producerInfo.cost;
            this.farmProducers = calculateStore(this.farmProducers, item, 1);
            return message(`Bought ${item}`, true);
        }
        else if (item in SellerType) {
            const sellerInfo = getSeller(item, this.sellers);
            const currentQuantity = this.farmSellers[item] || 0;
            const multiplerCost = currentQuantity === 0
                ? sellerInfo.cost
                : Math.floor(sellerInfo.cost * currentQuantity ** sellerInfo.multiplier);
            if (!sellerInfo) {
                return message(`Cannot find ${item}`, false);
            }
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
        const productInfo = getProduct(product, this.products);
        // Does product exist?
        if (!productInfo) {
            return message(`Cannot find ${product}`, false);
        }
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
            const producerInfo = getProducer(producerName, this.producers);
            // Does producer exist?
            if (!producerInfo) {
                return message(`Cannot find ${producerName}`, false);
            }
            const productToProduce = producerInfo.produces;
            const totalQty = productToProduce.rate * (quantity || 0);
            this.farmProducts = calculateStore(this.farmProducts, productToProduce.name, totalQty);
        }
    }
    consume() {
        var _a;
        // for each seller, sell max possible of good
        for (const [sellerName, quantity] of Object.entries(this.farmSellers)) {
            const sellerInfo = getSeller(sellerName, this.sellers);
            // Does seller exist?
            if (!sellerInfo) {
                return message(`Cannot find ${sellerName}`, false);
            }
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
}

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
        produces: { name: ProductType.egg, rate: 0.1 },
    },
    {
        name: ProducerType.cow,
        cost: 10000,
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
        value: 1000,
    },
];
//# sourceMappingURL=products.js.map

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

const farmLib = new Farm({ producers, products, sellers }, onTick);
console.log(farmLib.buy(ProducerType.chicken));
console.log(farmLib.sell(ProductType.egg, 10));
console.log(farmLib.buy(ProducerType.chicken));
console.log(farmLib.buy(SellerType.for_sale_sign));
console.log(farmLib.buy(SellerType.for_sale_sign));
console.log(farmLib.buy(SellerType.for_sale_sign));
console.log(farmLib.buy(SellerType.for_sale_sign));
//# sourceMappingURL=index.js.map
