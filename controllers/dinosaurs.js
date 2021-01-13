const express = require('express')
const router = express.Router()
const fs = require('fs')

// index route
router.get('/', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    res.render('dinosaurs/index.ejs', {
        myDinos: dinoData
    })
})

// get new dino form
router.get('/new', (req, res)=>{
    res.render('dinosaurs/new.ejs')
})

// show route
router.get('/:idx', (req, res)=>{
    // get dinosaur data from json file
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    // get array index from url parameter
    let dinoIndex = req.params.idx

    // render page with data of the specified animal
    res.render('dinosaurs/show.ejs', {myDino: dinoData[dinoIndex]})
})

// post route
router.post('/', (req, res)=>{
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

module.exports = router