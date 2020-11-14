# TDD-Typescript

An application for storing and retrieving client configurations.

## Folder Structure
```
.
├── .github         # Github actions CI config
├── api             # Api Definitions
├── src             # Source code
├── test            # Integration tests
│
└── README.md 
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
$ docker build -t blog:latest .
$ docker run -p 3000:3000 -e PORT=3000 blog:latest
```

## Configuring

```
| Variable name | type   | description                                       | default     |
|---------------|--------|---------------------------------------------------|-------------|
| PORT          | Number | The port on which the application will be listing | 3000        |
| LOG_LEVEL     | String |                                                   | http        |
| ENV           | String |                                                   | development |
|               |        |                                                   |             |
```

## Testing

### Run unit tests:
```
$ yarn test
```

### Run integration tests:
```
$ yarn run test:integration
```