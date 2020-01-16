module.exports = () => {
    const Jimp = require("jimp");
    const fs = require("fs");

    console.log(`Starting resize frames.`);

    fs.readdir(`extracted_frames`, (err, frames) => {
        frames.forEach(frame => {
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
                    console.log(`Resized frame: ${frame}`);
                    fs.unlinkSync(`./extracted_frames/${frame}`);
                });
        });
    });


};