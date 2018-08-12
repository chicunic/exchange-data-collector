# exchange-data-collector

This project could collect the exchange API from Bitcoin and show the differ between the max and min prices.

## Project structure
```
|-- project
    |-- .browserslistrc
    |-- .eslintrc.js
    |-- .gitignore
    |-- .postcssrc.js
    |-- README.md
    |-- app.js            // Entry of web server
    |-- babel.config.js
    |-- data.js           // Data collector
    |-- directoryList.md
    |-- package.json
    |-- yarn.lock
    |-- server            // Web server
    |   |-- controller.js
    |   |-- router.js
    |   |-- service.js
    |-- src               // Web client
        |-- App.vue
        |-- main.js
        |-- router.js
```

## How to start

Start Mongodb database

```
mongod
```

Start data collection

```
node data.js
```

start web server

```
node app.js
```

Compiles and hot-reloads for web client

```
yarn run serve
```

Compiles and minifies for production of web client

```
yarn run build
```

## Reference

Exchange Rates API:

https://www.blockchain.com/api/exchange_rates_api

Node.js

https://nodejs.org/en/

Koa

https://koajs.com/

Vue.js

https://vuejs.org/index.html

Bootstrap Vue

https://bootstrap-vue.js.org/