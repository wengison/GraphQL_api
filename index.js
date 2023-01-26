const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const schema = require('./schemas/schema');
const {graphqlHTTP} = require('express-graphql');

require('dotenv').config();

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV == 'development',
    
}));

const run = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URI)
        app.listen(process.env.PORT, ()=>console.log('server running & db connected'))
    } catch (error) {
        console.log(error.message)
    }
}

run();