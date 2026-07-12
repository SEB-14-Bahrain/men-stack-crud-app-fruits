const Fruit = require('../models/fruit')


const index = async (req, res) => {
    try {
        let allFruits = await Fruit.find()
        console.log(allFruits)
        res.render('index.ejs', {
            allFruits: allFruits
        })
    } catch (error) {
        console.log(error.message)
        res.send('an error has occured')
    }
}

const create = async (req, res) => {
    try {
        const fruitData = {}

        // The trim() method removes whitespace from both ends of a string and returns a new string without modifying the original
        if (!req.body.name || !req.body.name.trim()) {
        throw new Error("The name field cannot be empty!");
        }

        fruitData.name = req.body.name
        
        if (req.body.isReadyToEat === 'on') {
            fruitData.isReadyToEat = true
        } else {
            fruitData.isReadyToEat = false
        }
        
        let createdFruit = await Fruit.create(fruitData)
        
        res.redirect('/fruits')
    } catch(error) {
        res.render('new.ejs', {msg: error.message})
    }
}


module.exports = {
    index,
    create,
}