$ npm init -y

$ tsc --init

$ git init

$ npm install webpack webpack-cli --save-dev

$ npm install typescript ts-loader --save-dev

```
Webpack 認得的 TypeScript 編譯器並不會從 Global 的 NPM 模組參照，而是在專案內部參照。因此每一次建構 Webpack 結合 TypeScript 的環境時，必須額外下載 typescript 在專案內部。
```

$ npm install lite-server concurrently --save-dev

$ npm install leaflet @types/leaflet
