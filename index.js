const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')
const methodOverride = require('method-override')

//middleware
app.set('view engine', 'ejs')
app.use(ejsLayouts)

//method override middleware
app.use(methodOverride('_method'))

// body-parser middleware (puts form data into req.body)
app.use(express.urlencoded({extended: false}))

// controllers middleware
app.use('/dinos', require('./controllers/dinos.js'))
app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures.js'))

app.get('/', (req, res)=>{
    res.render('home')
})






app.listen(3000, ()=>{
    console.log('listening')
})