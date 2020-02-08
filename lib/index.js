'use strict';

const getProduct = (productName, products) => {
  return products.find(({ name }) => name === productName)
};

const getProducer = (producerName, producers) => {
  return producers.find(({ name }) => name === producerName)
};

const getSeller = (sellerName, sellers) => {
  return sellers.find(({ name }) => name === sellerName)
};

// should rename to calculateNewStore
const updateQuantity = (store, product, quantity) => {
  const newStore = {
    ...store,
    [product]: (store[product] || 0) + quantity,
  };
  return newStore
};

const message = (message, isSuccessful) => {
  return {
    message,
    isSuccessful,
  }
};

var config = {
  tickRate: 1000, // 1 second
};

class Farm {
  constructor({ producers, products, sellers }, handleTick = () => {}) {
    // All availible Products and Producers
    this.products = products;
    this.producers = producers;
    this.sellers = sellers;

    this.handleTick = handleTick;

    this.farmProducers = {};
    this.farmSellers = {
      'for-sale-sign': 1,
    };
    this.farmProducts = {};
    this.farmBank = 1000;

    this.initialise();
  }

  initialise() {
    this.interval = setInterval(() => this.onTick(), config.tickRate );
  }

  onTick() {
    this.produce();
    this.consume();
    this.handleTick(this.total());
  }

  buy(producer) {
    const producerInfo = getProducer(producer, this.producers);

    if (!producerInfo) {
      return message(`Cannot find ${producer}`, false)
    }

    if (this.bank >= producerInfo.cost) {
      return message('Not enough money', false)
    }

    this.farmBank -= producerInfo.cost;
    this.farmProducers = updateQuantity(this.farmProducers, producer, 1);

    return message(`Bought ${producer}`, true)
  }

  sell(product, quantity = 1) {
    const productInfo = getProduct(product, this.products);

    // Does product exist?
    if (!productInfo) {
      return message(`Cannot find ${product}`, false)
    }

    // Is there enough product to sell?
    if (
      !this.farmProducts[product] >= quantity ||
      this.farmProducts[product] == undefined
    ) {
      return message(`You dont have enough ${product}s to sell`, false)
    }

    this.farmBank += productInfo.value * quantity;
    this.farmProducts = updateQuantity(this.farmProducts, product, -quantity);
    return message(`Sold ${product} (x${quantity})`, true)
  }

  produce() {
    let producedProducts = this.farmProducts;
    // for each producer, generate their products into farm products
    for (const [producerName, quantity] of Object.entries(this.farmProducers)) {
      const producerInfo = getProducer(producerName, this.producers);

      // For each producers products
      producerInfo.produces.forEach(product => {
        const totalQty = product.rate * quantity;
        producedProducts = updateQuantity(
          producedProducts,
          product.type,
          totalQty
        );
      });
    }
    this.farmProducts = producedProducts;
  }

  consume() {
    // for each seller, sell max possible of good
    for (const [sellerName, quantity] of Object.entries(this.farmSellers)) {
      const sellerInfo = getSeller(sellerName, this.sellers);
      const productToSell = sellerInfo.products.name;
      const totalSell = sellerInfo.products.rate * quantity;

      const availibleProducts = Math.floor(this.farmProducts[productToSell]);
      // If total sell exceeds availible, only sell availible
      const maxSell = Math.min(totalSell, availibleProducts);

      this.sell(productToSell, maxSell);
    }
  }

  total() {
    return {
      farmProducers: this.farmProducers,
      farmProducts: this.farmProducts,
      farmSellers: this.farmSellers,
      farmBank: this.farmBank,
    }
  }
}

var producers = [
  {
    name: 'chicken',
    cost: 1000,
    produces: [{ type: 'egg', rate: 0.1 }],
  },
];

var products = [
  {
    name: 'egg',
    value: 100,
  },
];

var sellers = [
  {
    name: 'for-sale-sign',
    buyPrice: 1000,
    multiplier: 1.05,
    products: {
      name: 'egg',
      rate: 1,
    },
  },
];

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const formatPrice = price => formatter.format(price / 1000);

const onTick = ({ farmProducers, farmProducts, farmSellers, farmBank }) => {
  console.log({
    producers: farmProducers,
    products: farmProducts,
    sellers: farmSellers,
    total: formatPrice(farmBank),
  });
};

const farmLib = new Farm({ producers, products, sellers }, onTick);

console.log(farmLib.buy('chicken'));
console.log(farmLib.sell('egg', 10));
