// ler novos arquivos
// identificar seu tipo
// log de stickers amount

const fs = require("fs");

let Total_Stickers = 0;

fs.readdir(`../`, (err, files) => {
    files.map(file => file.startsWith(`sticker-`) ? Total_Stickers++ : null);
    console.log(`You have ${Total_Stickers} Stickers to use!`);
});

let newSticker = [];

fs.watch(`../`, (event, fileName) => {

    if (event !== "rename" || fileName.startsWith("sticker")) return;

    if (newSticker.includes(fileName)) return;
    else newSticker.push(fileName);

    checkFormat = (file) => file.split(".")[1];

    stickerFormat = checkFormat(fileName);

    RequestImageProcess = (file) => {
        ImageProcess = require("./image_process.js");
        console.log(`Requesting Image Process.`);
        return ImageProcess(file);
    }

    RequestAnimatedImageProcess = (file) => {
        AnimatedImageProcess = require("./animated_image_process.js");
        console.log(`Requesting Animated Image Process.`);
        return AnimatedImageProcess(file);
    }

    switch (stickerFormat) {
        case "png": RequestImageProcess(fileName);
            break;

        case "jpg": RequestImageProcess(fileName);
            break;

        case "gif": RequestAnimatedImageProcess(fileName);
            break;
    }

});