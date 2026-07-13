const dotenv = require('dotenv').config() // making .env file available
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require('path')
const methodOverride = require('method-override')

const app = express()

// connect us to MongoDB using connection string in .env
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name} 🥭`)
})

const Fruit = require('./models/fruit.js')

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "public")))

// HOME PAGE
app.get('/', async (req, res) => {
    res.render('home.ejs')
})

// GET /fruits/new (displays form for creating fruit)
app.get('/fruits/new', async (req, res) => {
    res.render('new.ejs')
})

// POST /fruits (creates fruit in database)
app.post('/fruits', async (req, res) => {
    const fruitData = {}
    fruitData.name = req.body.name

    if (req.body.isReadyToEat === 'on') {
        fruitData.isReadyToEat = true
    } else {
        fruitData.isReadyToEat = false
    }

    let createdFruit = await Fruit.create(fruitData)

    res.redirect('/fruits')
})


//GET all fruits /fruits - index route
app.get('/fruits', async (req, res) => {
    let allFruits = await Fruit.find()
    console.log(allFruits)
    res.render('index.ejs', {
        allFruits: allFruits
    })
})

// GET show route /fruits/:fruitId
app.get('/fruits/:fruitId', async (req, res) => {
    let foundFruit = await Fruit.findById(req.params.fruitId)
    console.log(foundFruit)
    res.render('show.ejs', {
        foundFruit: foundFruit
    })
})  

app.delete('/fruits/:fruitId', async (req, res) =>{
    await Fruit.findByIdAndDelete(req.params.fruitId)
    res.redirect('/fruits')
})

// GET the edit form /fruits/:fruitId/edit
app.get('/fruits/:fruitId/edit', async (req, res) => {
    let foundFruit = await Fruit.findById(req.params.fruitId)
    console.log(foundFruit)
    res.render('edit.ejs', {
        foundFruit: foundFruit
    })
})

// PUT - actually updates the fruit in the database
app.put('/fruits/:fruitId', async (req, res) => {
    const fruitData = {}
    fruitData.name = req.body.name

    if (req.body.isReadyToEat === 'on') {
        fruitData.isReadyToEat = true
    } else {
        fruitData.isReadyToEat = false
    }

    let updatedFruit = await Fruit.findByIdAndUpdate(req.params.fruitId, fruitData, {new: true})

    res.redirect(`/fruits/${req.params.fruitId}`)
})


app.listen(3000, () => {
    console.log('Listening on port 3000')
})

// IM JUST ADDING SOME COMMENTS 🍓



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

// FIND ONE FRUIT BY ITS ID AND UPDATE IT
    // use a mongoose method to find and update the Fruit
    // let updatedFruit = await Fruit.findByIdAndUpdate("6a4f6c5b26b63467c4db784b", {name: 'Plaintain'}, {new: true})

// FIND BY ID AND DELETE THE FRUIT
    // use a mongoose method to find and delete the Fruit
    // let deletedFruit = await Fruit.findByIdAndDelete("6a4f6c5b26b63467c4db784b")

// FIND A FRUIT BY IT'S ID
        // use a mongoose method to find a single Fruit by it's ID
    // let foundFruit = await Fruit.findById("6a4f6c5b26b63467c4db784b")