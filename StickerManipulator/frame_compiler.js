const GIFEncoder = require('gif-encoder-2')
const { createCanvas, loadImage } = require('canvas')
const fs = require('fs')

module.exports = (ImageName) => {
    console.log(ImageName);
    
    const size = 150

    const canvas = createCanvas(size, size)
    const ctx = canvas.getContext('2d')

    const encoder = new GIFEncoder(size, size)

    encoder.setDelay(100);
    encoder.setQuality(100);
    encoder.start();

    fs.readdir(`./extracted_frames`, async (err, images) => {

        console.log(`Frame Compiler has been started.`);

        function FinishEncoder() {
            encoder.finish();
            console.log(`encoder finish`)
            const buffer = encoder.out.getData()

            fs.writeFileSync(`Alexey.gif`, buffer);
            // console.log(`GIF Sticker has been saved as: gif-sticker-${ImageName}`)
        }

        images.map(async (image, i) => {
            if (i + 1 === images.length) {
                setTimeout(() => {
                    FinishEncoder();
                    console.log(`Finished`);
                }, 3000);
            }
            let example = await loadImage(`./extracted_frames/${image}`);
            ctx.drawImage(example, 0, 0, size, size);
            encoder.addFrame(ctx);
            // console.log(`New Frame has been added.`);
            fs.unlinkSync(`./extracted_frames/${image}`);
        });

    });

}