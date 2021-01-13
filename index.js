const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')

// middleware
app.set('view engine', 'ejs')
app.use(ejsLayouts)
// body-parser middleware
app.use(express.urlencoded({extended: false}))

// home route
app.get('/', (req, res)=>{
    res.render('home')
})

// index route
app.get('/dinosaurs', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    res.render('dinosaurs/index.ejs', {
        myDinos: dinoData
    })
})

// get new dino form
app.get('/dinosaurs/new', (req, res)=>{
    res.render('dinosaurs/new.ejs')
})

// show route
app.get('/dinosaurs/:idx', (req, res)=>{
    // get dinosaur data from json file
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    // get array index from url parameter
    let dinoIndex = req.params.idx

    // render page with data of the specified animal
    res.render('dinosaurs/show.ejs', {myDino: dinoData[dinoIndex]})
})

// post route
app.post('/dinosaurs', (req, res)=>{
    // read the dinosaurs json file
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    // add new dino to the array
    dinoData.push(req.body)

    // save new dinosaurs array to the json file (convert back to json first)
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    // redirect to the GET /dinosaurs route (index)
    res.redirect('/dinosaurs')
})


app.listen(3000, ()=>{
    console.log("on wednesdays, we hang out in Port 3000")
})