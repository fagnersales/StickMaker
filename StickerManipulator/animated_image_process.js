

module.exports = (ImageName) => {

    setTimeout(() => { // timeout to wait till the image be saved
        const extractFrames = require(`./extract_animated_image_frames.js`)
        console.log(`Animated Image Process has been started with sticker: ${ImageName}`);
        extractFrames(ImageName);
    }, 2000);

};