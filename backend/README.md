# Backend

This implementation is for NodeJS based on [Express](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/) and uses [mongoose](https://mongoosejs.com/) as the ODM.

## IMPORTANT
### The .env should contain as follows: 
    
    MONGO_URL= mongodb+srv://group21:cis4339@group21.ch1nszx.mongodb.net/test
    PORT= 3000
    ORG= communitygarden

## Project setup

    npm install
    npm install bcrypt if needed

### Before startup
You need a MongoDB database ready.

Make sure you have a collection named 'org' in your database that contains at least one organization with the orgid listed in your environment variable (see below).

Setup a .env file with the following variables: MONGO_URL, PORT and ORG

    MONGO_URL= that is the Mongo URL connection string
    PORT= e.g.3000
    ORG= that is the orgid (as a string)

### Compiles and hot-reloads for development

    npm start

## Postman Documentation
    
    Can be found at <https://documenter.getpostman.com/view/23133138/2s83mdJiqh>
