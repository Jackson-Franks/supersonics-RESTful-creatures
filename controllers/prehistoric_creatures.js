const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/', (req, res) =>{
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)
    console.log(creatureData)
    res.render('prehistoric_creatures/index', {myCreature: creatureData})
})

// get new creature form
router.get('/new', (req, res) => {
    res.render('prehistoric_creatures/new.ejs')
})

router.get('/edit/:idx', (req, res)=>{
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)

    // get array index from url parameter
    let creatureIndex = (req.params.idx)
    res.render('prehistoric_creatures/edit.ejs', {
        myCreature: creatureData[creatureIndex],
        creatureIdx: creatureIndex
    })
})

router.get('/:idx', (req, res) => {
    // get dino data from JSON file
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)

    // get array index from url parameter
    let creatureIndex = parseInt(req.params.idx)

    res.render('prehistoric_creatures/show.ejs', {myCreature: creatureData[creatureIndex]})
    
})

//post


router.post('/', (req, res) => {
    // read dino file
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)

    // add item to dinos array
    creatureData.push(req.body)
    // req.body = form data

    // save dinos to the data.json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

    // redirect to the GET /dinos route (index)
    res.redirect('/prehistoric_creatures')
})

router.put('/:idx', (req, res) => {
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)

    creatureData[req.params.idx].img_url = req.body.img_url
    creatureData[req.params.idx].type = req.body.type

    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

    res.redirect('/prehistoric_creatures')

})

router.delete('/:idx', (req, res) => {
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    creatureData = JSON.parse(creatures)

    // remove the deleted dino from the dino array
    creatureData.splice(req.params.idx, 1)

    // save the new dinosaurs to the data.json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

    // redirect to the GET /dinos route (index)
    res.redirect('/prehistoric_creatures')
})

module.exports = router
