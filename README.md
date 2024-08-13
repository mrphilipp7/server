# Express Server

This is an exmaple of a boilerplate expressjs server that uses mongodb

## Installation

To get started make sure you are in the root directory and run

```
npm i
```

## Enviroment variables

Inside the server directory create a new file called .env

```
touch .env
```

and add the following variables

```
## connection and development status
NODE_ENV='development'
MONGODB_URI='uri to mongodb'
```

## Running application

Make sure you have the latest build version available for the server
Run a build in the directory before running in production mode

```
npm run build
```

Then, in the root directory start the server in production mode

```
npm start
```
