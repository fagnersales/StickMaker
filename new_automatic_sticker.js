const Jimp = require('jimp');
const fs = require("fs");

let newSticker = [];
let AllStickers = 0;

console.log(`Automatic Sitcker Creator is ready!`);

fs.readdir(`./`, (err, files) => {
    files.forEach(file => file.startsWith(`sticker-`) ? AllStickers++ : null);
    console.log(`Now you have ${AllStickers} stickers!`);
});



fs.watch(`./`, (changeType, fileName) => { // watch the folder of th escript

    if (changeType !== `rename` || fileName.startsWith(`sticker`)) return; // conditions

    if (newSticker.includes(fileName)) return; // if the image name it's being proccessed.
    else newSticker.push(fileName); // if not go ahead.

    if (fileName.endsWith(`.png`) || fileName.endsWith(`.jpg`)) processImage(fileName); // process as image
    if (fileName.endsWith(`.gif`)) processAnimatedImage(fileName); // process as gif
});

const processImage = (imageName) => { // func to process a normal image
    setTimeout(() => { // timeout to wait till the image be saved

        Jimp.read(imageName) // read the image
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
                console.log(`Resizing Sticker to: ${w} x ${h}`);
                image
                    .resize(w, h) // resize the image
                    .quality(50) // set the quality of the image
                    .write(`sticker-${imageName}`); // save the image

                console.log(`Saving a new Sticker as: sticker-${imageName}`);

                fs.unlinkSync(imageName); // delet the old image after the proccess

            }).catch(err => console.log(err)); // if err

    }, 2000);
};


const processAnimatedImage = (imageName) => {
    setTimeout(() => { // timeout to wait till the image be saved
        const extractFrames = require(`./extract_frames.js`)
        console.log(`Manipulating a new GIF Sticker`);
        extractFrames(imageName);
    }, 2000);
};
