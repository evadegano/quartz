# Quartz
Quartz is a decentralized cash system built like a blockchain, but which stores user data on a webTRC-based graph database to allow for faster queries and light-weight storage.

The app is available [here](https://quartz-bank.herokuapp.com/)

## Table of contents
* [Scope](#scope)
* [Technologies](#technologies)
* [Features](#features)
* [Setup](#setup)
* [Run](#run)
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

## Setup
### Dependencies
```
$ npm install
```

* @types/node: 17.0.13
* axios: 0.26.0
* bcryptjs: 2.4.3
* connect-mongo: 4.6.0
* cookie-parser: 1.4.6
* cors: 2.8.5
* crypto-js: 4.1.1
* dotenv: 14.3.2
* express: 4.17.2
* express-session: 1.17.2
* gun: 0.2020.1235
* human-readable-ids: 1.0.4
* mongoose: 6.1.8
* morgan: 1.10.0
* nodemailer: 6.7.2
* passport: 0.5.2
* passport-google-oauth: 2.0.0
* passport-local: 1.0.0
* stripe: 8.203.0
* typescript: 4.5.5

### Config variables
Add the following variable with your own values inside a `.env` file

#### Server
* PORT
* ORIGIN
* MONGODB_URI
* GMAIL_USER
* GMAIL_PWD
* GOOGLE_OAUTH_ID
* GOOGLE_OAUTH_SECRET
* GOOGLE_OAUTH_CALLBACK_URL
* STRIPE_PRIV_KEY

#### Client
* REACT_APP_GUN_URL
* REACT_APP_API_URL
* REACT_APP_STRIPE_PUB_KEY
* REACT_APP_GOOGLE_OAUTH_ID
* REACT_APP_GOOGLE_OAUTH_SECRET

## Run
```
$ npm run dev
```

## Deploy
You must log into Heroku first.

```
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
