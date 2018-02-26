# dryboard

Dryboard is an async, future-enabled memory key store.

## Installation

### using NPM

```bash
npm install dryboard --save
```

### using Yarn

```bash
yarn add dryboard
```

## Usage

### Trivial

```javascript
const dryboard = require("dryboard").configureDryboard();

dryboard.set("pi", "3.14159265");

const pi = await dryboard.get("pi"); //Without await, this returns a Promise so

console.log(pi); // 3.14159265 this would be a Promise if you don't use await
```

### Less Trivial

```javascript
const dryboard = require("dryboard").configureDryboard();

setTimeout(() => dryboard.set("pi", "3.14159265"), 3000);

const pi = await dryboard.get("pi"); // waits until resolved

console.log(pi); // 3.14159265
```

### Slightly Less Trivial

```javascript
const dryboard = require("dryboard").configureDryboard();

const allFetches = fetchAllItemsAndDependencies();
Promise.all(
  allFetches.map(promise =>
    promise.then(item => dryboard.set(item.id, item)).then(async item => ({
      ...item,
      parent: await dryboard.get(item.parentId)
    }))
  )
);
```

# API

## configureDryboard(preExistingValues = {})

Returns a new dryboard instance.

`preExistingValues` is an object that will provide initial values.
`get`s will be resolved immediately if found in this object.

## dryboard.get(key, fallbackValue)

Returns a promise to the value of `key` in the cache.

If key is `undefined`, this method will return the `fallbackValue`.

## dryboard.set(key, value)

Resolves the promise to the value of `key` in the cache.

# License

MIT © Jason Santos
