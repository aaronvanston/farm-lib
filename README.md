# 🐮 farm-lib

Simple JavaScript interface to help build a farm idle "clicker" game. The library behind farm-cli and farm-clicker.

## ✨ Features

- Built in TypeScript, exported to `es5`
- Accepts custom Products, Producers and Sellers
- Ability to save and load progress
- Runs on 1s tick rate (produces and sells goods automatically every 1 second)

## 📦 Install

For now this package is on the GitHub Packages, as such you will need to set the following in your `.npmrc` first:

```bash
#.npmrc
@aaronvanston:registry=https://npm.pkg.github.com
```

Then install:

```bash
$ yarn add @aaronvanston/farm-lib

# or

$ npm install @aaronvanston/farm-lib
```

## 🔨 Usage

Import the library:

```JavaScript
import FarmLib from '@aaronvanston/farm-lib'

const farm = new FarmLib()
```

### Arguments to Farm

The farm class takes in a single object with keys as arguments, all are **optional** with default values being used if nothing is passed.

See [customising the farm](#-customising-the-farm) to understand more about custom producers, products and sellers.

```JavaScript
const farm = new FarmLib({
  producers,
  products,
  sellers
  handleTick
})
```

| Argument     | Type                 | Default Value                                                                                        | Description                                                                                                                                                                 |
| ------------ | -------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `producers`  | `array`, optional    | [Default producers](https://github.com/aaronvanston/farm-lib/blob/master/src/catalogue/producers.ts) | An array of available producers to purchase in game. You can pass in your own custom set as long as it conforms to the producers interface.                                 |
| `products`   | `array`, optional    | [Default products](https://github.com/aaronvanston/farm-lib/blob/master/src/catalogue/products.ts)   | An array of available products to purchase in game. You can pass in your own custom set as long as it conforms to the products interface.                                   |
| `sellers`    | `array`, optional    | [Default sellers](https://github.com/aaronvanston/farm-lib/blob/master/src/catalogue/sellers.ts)     | An array of available sellers to purchase in game. You can pass in your own custom set as long as it conforms to the sellers interface.                                     |
| `handleTick` | `function`, optional | no-op function                                                                                       | Callback function that receives the status of the farm each tick (1 second). See [`.total`](https://github.com/aaronvanston/farm-lib#total) method to see what is returned. |

## 🖥 API

The farm class includes the following methods:

### `.buy`

```JavaScript
farm.buy(item, quantity)
```

**Params:**

- `item` | `{string}` - Name of Producer or Seller you wish to purchase.
- `quantity` | `{number?}` - Quantity you wish to purchase. Optional field, defaults to 1.

**Example:**

```JavaScript
farm.buy('chicken', 10)
```

**Return:**

- `message` | `{object}` - A message object with the keys:
  - `message` | `{string}` - Returns a message based on success/ failure with context.
  - `isSuccessful` | `{bool}` - Was the operation successful

**Description:**

The `.buy` action allows you to purchase either a producer or seller of products. You must have the required amount of goods (money) to purchase them. If you supply a quantity, you must have the entire amount needed, no partial purchases.

---

### `.sell`

```JavaScript
farm.sell(product, quantity)
```

**Params:**

- `product` | `{string}` - Name of Product you wish to sell.
- `quantity` | `{number?}` - Quantity you wish to sell. Optional field, defaults to 1.

**Example:**

```JavaScript
farm.sell('egg', 5)
```

**Return:**

- `message` | `{object}` - A message object with the keys:
  - `message` | `{string}` - Returns a message based on success/ failure with context.
  - `isSuccessful` | `{bool}` - Was the operation successful

**Description:**

The `.sell` action allows you to sell a product to earn money. You can supply a quantity if you wish to sell in bulk.

---

### `.total`

```JavaScript
farm.total()
```

**Return:**

- `farmInfo` | `{object}` - Object of the farm information at the time of call. Includes the following keys:
  - `farmProducers` | `{object}` - Object of farm producers, with each producer as a key and their quantity as a number value.
  - `farmProducts` | `{object}` - Object of farm products, with each product as a key and their quantity as a number value.
  - `farmSellers` | `{object}` - Object of farm sellers, with each seller as a key and their quantity as a number value.
  - `farmBank` | `{number}` - Total value value (available to spend), the bank stores a single \$1 as `100`, divide the farmBank value by 100 for dollar value.

Example return:

```javascript
{
  farmProducers: {
    chicken: 10,
    cow: 2
  },
  farmProducts: {
    egg: 21,
    milk: 1
  }
  farmSellers: {
    for_sale_sign: 1
  },
  farmBank: 11000
}
```

**Description**

The total method returns the farms status. This includes the farm bank and all the sub shops such as producers, products and sellers. This total value can be used to update/sync your record of the farm totals upon action.

The output of `.total` is the same data returned in the `handleTick` callback function.

---

### `.save`

```JavaScript
farm.save()
```

**Return:**

- `saveToken` | `{string}` - a base64 encoded save token.

**Description**

The `.save` method returns a serialised string that represents your farm, its quantities and value. Used to load your farm contents in the future.

---

### `.load`

```JavaScript
farm.buy(saveToken)
```

**Params:**

- `saveToken` | `{string}` - Base64 encoded save token.

**Example:**

```JavaScript
farm.load('eyJmYXJtUHJvZHVjZXJzIjp7ImNoaWNrZW5fY29vcCI6MX0sImZhcm1Qcm9kdWN0cyI6e30sImZhcm1TZWxsZXJzIjp7ImZvcl9zYWxlX3NpZ24iOjF9LCJmYXJtQmFuayI6ODkwMDAsImRhdGUiOjE1ODE1MDY0MDE1NDF9')
```

**Return:**

- `message` | `{string}` - A message object with the keys:
  - `message` | `{string}` - Returns a message based on success/ failure with context.
  - `isSuccessful` | `{bool}` - Was the operation successful

**Description**

The `.load` action accepts a base64 encoded string with the contents of the farm. Upon successful load, it will return the date and timestamp of the loaded save token.

---

## Interfaces

You can customise the products, producers and sellers within the farm library. In order to do so, you will need to conform to the following types and interfaces:

### Producers

```JavaScript
[
  {
    name: 'bakery',
    cost: 1000,
    multiplier: 1.05,
    produces: {
      name: 'cookie`
      rate: 0.1
    }
  }
]
```

**Keys:**

- `name` | `{string}` - The name of the producer.
- `cost` | `{number}` - The cost of the producer without decimal places. $1 is stored as `100`, in this example the bakery would cost $10.
- `multiplier` | `{number}` - The compound cost multiplier of the producer, as you buy more of the producer the cost exponentially increases. Set to `1` for no increase.
- `produces` | `{object}` - Object of Produce:
  - `name` | `{string}` - The product name it produces, this must match exactly to an associated product's name.
  - `rate` | `{number}` - The amount it produces per tick. This number can be a decimal. 0.1 would mean it adds 0.1 cookies to the inventory per tick.

### Products

```JavaScript
[
  {
    name: 'cookie',
    value: 100
  }
]
```

**Keys:**

- `name` | `{string}` - The name of the product
- `value` | `{number}` - The value of the product without decimal places. $1 is stored as `100`, in this example the cookie's would be $1.

### Sellers

```JavaScript
[
  {
    name: 'stall',
    cost: 1000,
    multiplier: 1.05,
    products: {
      name: 'cookie`
      rate: 1
    }
  }
]
```

**Keys:**

- `name` | `{string}` - The name of the seller.
- `cost` | `{number}` - The cost of the seller without decimal places. $1 is stored as `100`, in this example the store would cost $10.
- `multiplier` | `{number}` - The compound cost multiplier of the seller, as you buy more of the seller the cost exponentially increases. Set to `1` for no increase.
- `products` | `{object}` - Object of produce:
  - `name` | `{string}` - The product name it sells, this must match exactly to an associated product's name.
  - `rate` | `{number}` - The amount it sells per tick. This number has to be a whole number (no decimals).

## 🎨 Customising the farm

The farm class can take in a custom set of Producers, Products and Sellers. These custom sets must conform to the shape/interface detailed:

- [Producers](#producers): Things that produce products
- [Products](#products): The products being produces
- [Sellers](#sellers): The things that sell the products

You can be quite creative in the theme you choose. It does not just have to be about farms, it can literally be anything!

An example of a customised "farm":

```JavaScript
import FarmLib from '@aaronvanston/farm-lib'

const customProducers = [{
  name: 'gold mind',
  cost: 10000,
  multiplier: 1.10,
  produces: {
    name: 'gold_ore',
    rate: 0.1,
  },
}]

const customProducts = [{
  name: 'gold_ore',
  value: 100,
}]

const customSellers = [{
  name: 'smelter',
  cost: 10000,
  multiplier: 1.02,
  products: {
    name: 'gold_ore',
    rate: 1,
  }
}]

const logger = (farmInfo) => console.log(farmInfo)

const farm = new FarmLib({
  producers: customProducers,
  products: customProducts,
  sellers: customSellers,
  handleTick: logger
})
```

### Extending default lists

In addition to creating your own you can extend the current default set to include you own. To access the default lists, you can import them from the `farm-lib` as named imports.

```JavaScript
import FarmLib, { producers, products, sellers } from '@aaronvanston/farm-lib'

// extend, change, remove etc
const customProducers = {
  ...producers,
  // NEW PRODUCER
}

const farm = new FarmLib({
  producers: customProducers,
})
```
