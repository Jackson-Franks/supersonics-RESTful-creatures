const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/', (req, res) =>{
    let dinos = fs.readFileSync('./dinos.json')
    let dinoData = JSON.parse(dinos)
    console.log(dinoData)
    res.render('dinos/index', {myDinos: dinoData})
})


// get new dino form
router.get('/new', (req, res) => {
    res.render('dinos/new.ejs')
})

router.get('/edit/:idx', (req, res)=>{
    let dinos = fs.readFileSync('./dinos.json')
    let dinoData = JSON.parse(dinos)

    // get array index from url parameter
    let dinoIndex = (req.params.idx)
    res.render('dinos/edit.ejs', {
        myDino: dinoData[dinoIndex],
        dinoIdx: dinoIndex
    })
})

router.get('/:idx', (req, res) => {
    // get dino data from JSON file
    let dinos = fs.readFileSync('./dinos.json')
    let dinoData = JSON.parse(dinos)

    // get array index from url parameter
    let dinoIndex = (req.params.idx)

    res.render('dinos/show.ejs', {myDino: dinoData[dinoIndex]})
    
})

router.post('/', (req, res) => {
    // read dino file
    let dinos = fs.readFileSync('./dinos.json')
    let dinoData = JSON.parse(dinos)
    console.log(dinoData)

    // add item to dinos array
    dinoData.push(req.body)

    // save dinos to the data.json file
    fs.writeFileSync('./dinos.json', JSON.stringify(dinoData))

    // redirect to the GET /dinos route (index)
    res.redirect('/dinos')
})

router.put('/:idx', (req, res) => {
    let dinos = fs.readFileSync('./dinos.json')
    let dinoData = JSON.parse(dinos)

    dinoData[req.params.idx].name = req.body.name
    dinoData[req.params.idx].type = req.body.type

    fs.writeFileSync('./dinos.json', JSON.stringify(dinoData))

    res.redirect('/dinos')

})

router.delete('/:idx', (req, res) => {
    let dinos = fs.readFileSync('./dinos.json')
    dinoData = JSON.parse(dinos)

    // remove the deleted dino from the dino array
    dinoData.splice(req.params.idx, 1)

    // save the new dinosaurs to the data.json file
    fs.writeFileSync('./dinos.json', JSON.stringify(dinoData))

    // redirect to the GET /dinos route (index)
    res.redirect('/dinos')
})

module.exports = router