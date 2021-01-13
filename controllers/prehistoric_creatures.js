const express = require('express')
const router = express.Router()
const fs = require('fs')

// PC index route
router.get('/', (req, res)=>{
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)
    res.render('prehistoric_creatures/index.ejs', {myCreatures: creatureData})
})

// PC new route
router.get('/new', (req, res)=>{
    res.render('prehistoric_creatures/new.ejs')
})

// PC show route
router.get('/:idx', (req, res)=>{
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)
    let creatureIndex = req.params.idx
    res.render('prehistoric_creatures/show.ejs', {myCreature: creatureData[creatureIndex]})
})

// PC POST route
router.post('/', (req, res)=>{
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)
    creatureData.push(req.body)
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    res.redirect('/prehistoric_creatures')
})

module.exports = router