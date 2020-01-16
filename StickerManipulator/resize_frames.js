module.exports = (ImageName) => {
    const Jimp = require("jimp");
    const fs = require("fs");

    console.log(`Starting Resize Frames.`);

    fs.readdir(`extracted_frames`, (err, frames) => {
        frameCount = 0;
        frames.forEach(frame => {
            frameCount++;
            Jimp.read(`./extracted_frames/${frame}`)
                .then(image => {
                    let w;
                    let h;
                    if (image.width > image.height) {
                        w = Jimp.AUTO;
                        h = 150;
                    } else {
                        w = 150;
                        h = Jimp.AUTO;
                    }
                    image
                        .resize(w, h)
                        .quality(100)
                        .write(`./extracted_frames/resized-${frame}`)
                    console.log(`Resized Frame: ${frame}`);
                    fs.unlinkSync(`./extracted_frames/${frame}`);
                });
            if (frameCount === frames.length) {
                setTimeout(() => {
                    require(`./frame_compiler.js`)(ImageName);
                    console.log(`Requesting Frame Compiler...`);
                }, 3000)
            }

        });

    });


};