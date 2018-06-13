# thaime – developer edition

here are some of the commands to run the project locally

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [requirements](#requirements)
- [dev stack](#dev-stack)
- [commands](#commands)
  - [building dependencies](#building-dependencies)
  - [building for production](#building-for-production)
  - [serving production files locally](#serving-production-files-locally)
  - [development](#development)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## requirements

- [node](http://nodejs.org/download/) >= 8.11.2
- [yarn](https://yarnpkg.com/lang/en/) >= 1.7.0

## dev stack

- framework: [Vue.js](https://vuejs.org/)
- build tools:
  - [Parcel](https://parceljs.org/)
  - [Gulp](https://gulpjs.com/)
- progressive web application: [workbox](https://developers.google.com/web/tools/workbox/)

## commands

### building dependencies

```sh
yarn install
```

### building for production

```
yarn build
```

### serving production files locally

```
yarn serve
```

application will be running on  https://127.0.0.1:8080

### development

```sh
yarn dev
```

application will be running on http://localhost:1234
