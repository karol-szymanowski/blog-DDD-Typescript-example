# TDD-Typescript

An application for storing and retrieving client configurations.

## Folder Structure
```
.
├── api             # Api Definitions
├── src             # Source code
├── .github         # Github actions CI config
│
└── README.md       #
```

## Getting started
**Requirements:**
- node
- yarn

### Development:
```
$ yarn
$ yarn run start:dev
```

### Build from source:
```
$ yarn
$ yarn build
$ node ./dist/index.js
```

### Build with docker:
```
$ docker build -t config-app:latest .
$ docker run -p 3000:3000 config-app:latest
```

### Configuring
App is using environment variables to configure app
```
PORT (number) - The port on which the application will listen
LOG_LEVEL ('debug', 'info', 'warn', 'error') - Log level
```
