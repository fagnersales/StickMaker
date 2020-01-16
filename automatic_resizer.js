const GIFEncoder = require('gif-encoder-2')
const { createCanvas } = require('canvas')
const fs = require('fs')
const path = require('path')

buffer = fs.readFileSync(`./pato animated.gif`)

fs.writeFile('bbbbb.gif', buffer, (err) => {
    if (err) throw err;
    console.log(`The file has been saved.`);
});