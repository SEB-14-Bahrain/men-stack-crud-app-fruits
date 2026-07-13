const Fruit = require('../models/fruit.js')


const index = async (req, res) => {
    let allFruits = await Fruit.find()
    console.log(allFruits)
    res.render('index.ejs', {
        allFruits: allFruits
    })
}



module.exports = {
    index,
}