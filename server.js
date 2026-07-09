const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))

app.get('/', async (req, res) => {
    res.render('home.ejs')
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})