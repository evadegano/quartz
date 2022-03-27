# Quartz
Quartz is a decentralized cash system built like a blockchain, but which stores user data on a webTRC-based graph database to allow for faster queries and light-weight storage.

The app is available [here](https://quartz-bank.herokuapp.com/)

## Table of contents
* [Scope](#scope)
* [Features](#features)
* [Development](#development)
  * [Setup](#setup)
  * [Install](#install)
  * [Run](#run)
  * [Test](#test)
  * [Deploy](#deploy)
* [API](#api)
* [Sources](#sources)

## Scope
The app was built as a second project during Ironhack's Full Stack Developer bootcamp.
It was awarded gold medal for best project by teachers and students.

## Features
* User authentication and authorization via Passport
* Off-chain data stored in a MongoDB database
* On-chain data store on [Gun](https://gun.eco/)
* Password reset via Nodemailer
* Svg animations using Green Sock
* Purchasing QRTZ Coins via Stripe
* Proof of Work algorithm for block mining
* Merkle Tree structure for storing transaction data

## Development
### Setup
#### Requirements
* [NodeJS](https://nodejs.org): >= 14
* [NPM](https://www.npmjs.com/): >= 8.1.2

### Config variables
Add the following variable with your own values inside a `.env` file:

#### Server
* PORT=5005 (local port to call the server)
* ORIGIN=http://localhost:3000 (local URL to call the app)
* MONGODB_URI=mongodb://localhost/quartz (local URL to call the database)
* GMAIL_USER (Gmail address for Nodemailer)
* GMAIL_PWD (Gmail address password)
* STRIPE_PRIV_KEY (private key from your Stripe developer account)

#### Client
* REACT_APP_GUN_URL=http://localhost:5005/gun
* REACT_APP_API_URL=http://localhost:5005/api
* REACT_APP_STRIPE_PUB_KEY (public key from your Stripe developer account)

### Install
```bash
# install dependencies
$ npm i 
```

### Run
```bash
# launch the app in development modeh
$ npm run dev
```

### Deploy
You must log into [Heroku](https://id.heroku.com/login) first.

```bash
# create an Heroku app in the root directory
$ heroku create -a example-app
```

```bash
# deploy to Heroku
$ git push heroku main
```

## API
### `POST /signup`

Create a new user.
```json
POST /signup
{
  "email": "jdoe@gmail.com",
  "password": "Foobar@01",
  "passwordConfirm": "Foobar@01"
}
```
Response:
```json
{
  "newUser": {
    "_id": "620d2a6cd7ba8f53a70a75e1",
    "createdAt": "2022-02-16T16:46:36.854+00:00",
    "email": "jdoe@gmail.com"
  }
}
```

### `POST /login`

Log a user in.
```json
POST /login
{
  "email": "jdoe@gmail.com",
  "password": "Foobar@01"
}
```
Response:
```json
{
  "userData": {
    "_id": "620d2a6cd7ba8f53a70a75e1",
    "createdAt": "2022-02-16T16:46:36.854+00:00",
    "email": "jdoe@gmail.com"
  },
  "walletAddress": "4cd203f4eb2534875ac1fb365792ad020f87a2fda9633bfd062074ae2e82f9b1"
}
```

### `GET /loggedin`

Check whether a user is logged in.

Response:
```json
{
  "userData": {
    "_id": "620d2a6cd7ba8f53a70a75e1",
    "createdAt": "2022-02-16T16:46:36.854+00:00",
    "email": "jdoe@gmail.com"
  },
  "walletAddress": "4cd203f4eb2534875ac1fb365792ad020f87a2fda9633bfd062074ae2e82f9b1"
}
```
Error:
403 
```json
{
  "message": "Unauthorized"
}
```

### `PUT /:userId`

Update a user's account data.
```json
PUT /:userId
{
  "email": "jdoe@gmail.com",
  "password": "Foobar@01",
  "passwordConfirm": "Foobar@01"
}
```

Response:
```json
{
  "user": {
    "_id": "620d2a6cd7ba8f53a70a75e1",
    "createdAt": "2022-02-16T16:46:36.854+00:00",
    "email": "jdoe@gmail.com"
  }
}
```

### `DELETE /:userId`

Delete a user's account.

Response:
```json
{
  "message": "Your account has been removed successfully." 
}
```

### `POST /wallets`

Create a new user wallet.

```json
POST /wallets
{
  "userId": "hfu178387bde190332",
}
```

Response:
```json
{
  "walletAddress": "4cd203f4eb2534875ac1fb365792ad020f87a2fda9633bfd062074ae2e82f9b1"
}
```

### `POST /coins`

Add QRTZ Coins to a user's wallet.

```json
POST /coins
{
  "amount": "3000",
  "token": "",
  "keypair": "",
  "publicKey": ""
}
```

Response:
```json
{
  "amount": "3000",
  "keypair": ""
}
```

## Sources
This project is based on O'Reilly's Mastering Bitcoin.

Available at: https://www.oreilly.com/library/view/mastering-bitcoin/9781491902639/
