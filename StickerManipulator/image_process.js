const Jimp = require("jimp");
const { unlinkSync } = require("fs");

module.exports = (ImageName) => {
    setTimeout(async () => {
        console.log(`Image Process has been started with sticker: ${ImageName}`);

        image = await Jimp.read(`../${ImageName}`)

        let w, h;
        if (image.width > image.height) {
            w = Jimp.AUTO;
            h = 150;
        } else {
            w = 150;
            h = Jimp.AUTO;
        }
        console.log(`Resizing Sticker to: ${w} x ${h}`);
        image
            .resize(w, h)
            .quality(60)
            .write(`../sticker-${ImageName}`);

        console.log(`Saving a new Sticker as: sticker-${ImageName}`);

        unlinkSync(`../${ImageName}`);

    }, 2000);
};