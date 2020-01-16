console.log(`am I working?`);

const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(200, 200)
const ctx = canvas.getContext('2d')
const fs = require('fs')

var text = ctx.measureText('Awesome!')
ctx.strokeStyle = 'rgb(102,0,0)'
ctx.beginPath()
ctx.lineTo(50, 102)
ctx.lineTo(50 + text.width, 102)
ctx.stroke()

loadImage('./awnn.png').then((image) => {
    ctx.drawImage(image, 50, 0, 70, 70)

    const out = fs.createWriteStream('download.png')
    const stream = canvas.createPNGStream()
    stream.pipe(out)
    out.on('finish', () => console.log('The PNG file was created.'))
});


