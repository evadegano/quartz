# Quartz
Quartz is a decentralized cash system built like a blockchain, but which stores user data on a webTRC-based graph database to allow for faster queries and light-weight storage.

The app is available [here](https://quartz-bank.herokuapp.com/)

## Table of contents
* [Scope](#scope)
* [Technologies](#technologies)
* [Features](#features)
* [Setup](#setup)
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

## Set up
### Dependencies

$ npm install

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

### Run
$ npm run dev

### Deploy
You must log into Heroku first.

```
$ git push heroku master
```

## Sources
This project is based on O'Reilly's Mastering Bitcoin.

Available at: https://www.oreilly.com/library/view/mastering-bitcoin/9781491902639/
