
module.exports = (fileName) => {

  var gifFrames = require('gif-frames');
  var fs = require('fs');

  gifFrames(
    { url: `${fileName}`, frames: 'all', outputType: 'png', cumulative: false },
    function (err, frameData) {
      if (err) throw err;
      console.log(`Starting extract frames from the GIF.`);
      frameData.forEach(function (frame) {
        console.log(`Extracting Frame: ${frame.frameIndex}`)
        frame.getImage().pipe(fs.createWriteStream(
          `./extracted_frames/${fileName}-${frame.frameIndex}.png`
        ));
      });
    }
  ).then(() => {
    setTimeout(() => require(`./resize_frames.js`)(), 1000);
  });
};