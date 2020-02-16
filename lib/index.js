'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

// These can be collapsed into a single function
var getProducer = function (producerName, producers) {
    return producers.find(function (_a) {
        var name = _a.name;
        return name === producerName;
    });
};
var getProduct = function (productName, products) {
    return products.find(function (_a) {
        var name = _a.name;
        return name === productName;
    });
};
var getSeller = function (sellerName, sellers) {
    return sellers.find(function (_a) {
        var name = _a.name;
        return name === sellerName;
    });
};
//# sourceMappingURL=getters.js.map

var calculateStore = function (store, item, quantity) {
    var _a;
    var newQuantity = (store[item] || 0) + quantity;
    return __assign(__assign({}, store), (_a = {}, _a[item] = parseFloat(newQuantity.toFixed(2)), _a));
};
//# sourceMappingURL=calculateStore.js.map

var message = function (message, isSuccessful) {
    return {
        message: message,
        isSuccessful: isSuccessful,
    };
};
//# sourceMappingURL=message.js.map

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
var formatPrice = function (price) { return formatter.format(price / 1000); };
//# sourceMappingURL=format.js.map

var addMultiplier = function (cost, currentQuantity, multipler) { return Math.floor(cost * Math.pow(multipler, currentQuantity)); };
var calculateMultiplerCost = function (cost, currentQuantity, multipler, purchaseQuantity) {
    var quantities = __spread(Array(purchaseQuantity).keys()).map(function (item) {
        var tempQuantity = item + currentQuantity;
        return tempQuantity === 0
            ? cost
            : addMultiplier(cost, tempQuantity, multipler);
    });
    return quantities.reduce(function (total, amount) { return total + amount; });
};
//# sourceMappingURL=calculateMultiplerCost.js.map

var config = {
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

var ProductType;
(function (ProductType) {
    ProductType["egg"] = "egg";
    ProductType["milk"] = "milk";
})(ProductType || (ProductType = {}));

var producers = [
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

var products = [
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

var sellers = [
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

var Farm = /** @class */ (function () {
    function Farm(_a) {
        var _b = _a.producers, producers$1 = _b === void 0 ? producers : _b, _c = _a.products, products$1 = _c === void 0 ? products : _c, _d = _a.sellers, sellers$1 = _d === void 0 ? sellers : _d, _e = _a.handleTick, handleTick = _e === void 0 ? function () { } : _e;
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
    Farm.prototype.initialiseClock = function () {
        var _this = this;
        setInterval(function () { return _this.onTick(); }, config.tickRate );
    };
    Farm.prototype.onTick = function () {
        this.produce();
        this.consume();
        this.handleTick(this.total());
    };
    Farm.prototype.buy = function (item, buyQuantity) {
        if (buyQuantity === void 0) { buyQuantity = 1; }
        if (item in ProducerType) {
            var producerInfo = getProducer(item, this.producers);
            var currentQuantity = this.farmProducers[item] || 0;
            var multiplerCost = calculateMultiplerCost(producerInfo.cost, currentQuantity, producerInfo.multiplier, buyQuantity);
            if (this.farmBank <= multiplerCost) {
                return message('Not enough money', false);
            }
            this.farmBank -= multiplerCost;
            this.farmProducers = calculateStore(this.farmProducers, item, buyQuantity);
            return message("Bought " + item + " (x" + buyQuantity + ") for " + formatPrice(multiplerCost), true);
        }
        else if (item in SellerType) {
            var sellerInfo = getSeller(item, this.sellers);
            var currentQuantity = this.farmSellers[item] || 0;
            var multiplerCost = calculateMultiplerCost(sellerInfo.cost, currentQuantity, sellerInfo.multiplier, buyQuantity);
            if (this.farmBank <= multiplerCost) {
                return message('Not enough money', false);
            }
            this.farmBank -= multiplerCost;
            this.farmSellers = calculateStore(this.farmSellers, item, buyQuantity);
            return message("Bought " + item + " (x" + buyQuantity + ") for " + formatPrice(multiplerCost), true);
        }
        else {
            return message("Cannot find: " + item + " in availible lists", false);
        }
    };
    Farm.prototype.sell = function (product, quantity) {
        if (quantity === void 0) { quantity = 1; }
        // Does product exist?
        if (!(product in ProductType)) {
            return message("Cannot find " + product, false);
        }
        var productInfo = getProduct(product, this.products);
        // Does the product exist?
        // Is there enough product to sell?
        if ((this.farmProducts[product] || 0) <= quantity) {
            return message("You dont have enough " + product + "s to sell", false);
        }
        this.farmBank += productInfo.value * quantity;
        this.farmProducts = calculateStore(this.farmProducts, product, -quantity);
        return message("Sold " + product + " (x" + quantity + ")", true);
    };
    Farm.prototype.produce = function () {
        var e_1, _a;
        try {
            // for each producer, generate their products into farm products
            for (var _b = __values(Object.entries(this.farmProducers)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), producerName = _d[0], quantity = _d[1];
                // Does producer exist?
                if (!(producerName in ProducerType)) {
                    return message("Cannot find " + producerName, false);
                }
                var producerInfo = getProducer(producerName, this.producers);
                var productToProduce = producerInfo.produces;
                var totalQty = productToProduce.rate * (quantity || 0);
                this.farmProducts = calculateStore(this.farmProducts, productToProduce.name, totalQty);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    Farm.prototype.consume = function () {
        var e_2, _a;
        var _b;
        try {
            // for each seller, sell max possible of good
            for (var _c = __values(Object.entries(this.farmSellers)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = __read(_d.value, 2), sellerName = _e[0], quantity = _e[1];
                // Does seller exist?
                if (!(sellerName in SellerType)) {
                    return message("Cannot find " + sellerName, false);
                }
                var sellerInfo = getSeller(sellerName, this.sellers);
                var productToSell = (_b = sellerInfo) === null || _b === void 0 ? void 0 : _b.products.name;
                var totalSell = sellerInfo.products.rate * (quantity || 0);
                var availibleProducts = Math.floor(this.farmProducts[productToSell] || 0);
                // If total sell exceeds availible, only sell availible
                var maxSell = Math.min(totalSell, availibleProducts);
                if (maxSell > 0) {
                    this.sell(productToSell, maxSell);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    Farm.prototype.total = function () {
        return {
            farmProducers: this.farmProducers,
            farmProducts: this.farmProducts,
            farmSellers: this.farmSellers,
            farmBank: this.farmBank,
        };
    };
    Farm.prototype.save = function () {
        var date = Date.now();
        var progress = {
            farmProducers: this.farmProducers,
            farmProducts: this.farmProducts,
            farmSellers: this.farmSellers,
            farmBank: this.farmBank,
            date: date,
        };
        var stringify = JSON.stringify(progress);
        var encoded = Buffer.from(stringify, 'binary').toString('base64');
        return encoded;
    };
    Farm.prototype.load = function (progress) {
        var decoded = Buffer.from(progress, 'base64').toString('binary');
        var progressData = JSON.parse(decoded);
        var farmProducers = progressData.farmProducers, farmProducts = progressData.farmProducts, farmSellers = progressData.farmSellers, farmBank = progressData.farmBank, date = progressData.date;
        var loadData = new Date(date);
        this.farmProducers = farmProducers;
        this.farmProducts = farmProducts;
        this.farmSellers = farmSellers;
        this.farmBank = farmBank;
        return message("Loading save from " + loadData, true);
    };
    return Farm;
}());
//# sourceMappingURL=Farm.js.map

var onTick = function (_a) {
    var farmProducers = _a.farmProducers, farmProducts = _a.farmProducts, farmSellers = _a.farmSellers, farmBank = _a.farmBank;
    console.log({
        producers: farmProducers,
        products: farmProducts,
        sellers: farmSellers,
        total: formatPrice(farmBank),
    });
};
//# sourceMappingURL=debugLogger.js.map

var farmLib = new Farm({
    handleTick: onTick,
});
// console.log(farmLib.buy('for_sale_sign'))
console.log(farmLib.buy('chicken', 10));
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
