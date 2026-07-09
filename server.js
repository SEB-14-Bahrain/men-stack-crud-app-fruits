const dotenv = require('dotenv').config() // making .env file available
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()

// connect us to MongoDB using connection string in .env
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name} 🥭`)
})

const Fruit = require('./models/fruit.js')

app.use(morgan('dev'))

app.get('/', async (req, res) => {
    res.render('home.ejs')
})

// this route will change often
app.get('/fruits', async (req, res) => {
    // use a mongoose method to find all the bananas
    let notReady = await Fruit.find({ isReadyToEat: false})
    
    // view the found fruit
    res.send(notReady)
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})




// CODE GRAVEYARD ===============================

// CREATE ONE FRUIT
    // // create a fruit object
    // const fruitData = {}
    // fruitData.name = 'Blueberry'
    // fruitData.isReadyToEat = false

    // // use a mongoose method to add it to the DB
    // let createdFruit = await Fruit.create(fruitData)

// FIND ALL FRUITS
        // use a mongoose method to find all the Fruits
    // let allFruits = await Fruit.find()

// FIND ALL FRUITS WITH name OF Banana
        // use a mongoose method to find all the bananas
    // let allBananas = await Fruit.find({ name: 'Banana'})

// FIND ALL FRUITS WHERE isReadyToEat IS false
        // use a mongoose method to find all fruits where isReadyToEat is false
    // let notReady = await Fruit.find({ isReadyToEat: false})