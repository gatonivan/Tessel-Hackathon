const express = require('express')
const app = express();

// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
Create a server that responds to every request by taking a picture and piping it directly to the browser.
*********************************************/

var tessel = require('tessel');
var av = require('tessel-av');
var os = require('os');
var http = require('http');
var port = 8000;
var camera = new av.Camera();
var ambientlib = require('ambient-attx4');
var ambient = ambientlib.use(tessel.port['B']);

var capture = camera.capture()
// ambient.on('ready', function () {
    //     ambient.setSoundTrigger(.3)
    //      ambient.on('sound-trigger', function(){
        //         pic = camera.capture()
        //         console.log("took pic")
        //     })
        // });



ambient.setSoundTrigger(0.3);

  ambient.on('sound-trigger', function(){
      console.log("Took Pic!")
        capture = camera.capture(2000, 'jpg')
  });

ambient.on('error', function (err) {
    console.log(err);
});

app.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    capture.pipe(res)
})

app.listen(port, () => console.log(`http://${os.hostname()}.local:${port}`));


// Get points of light and sound data.
//      setInterval( function () {
    //          ambient.getSoundLevel( function(err, sounddata) {
        //            if (err) throw err;
        //            console.log("Sound Level:", sounddata.toFixed(8));
        //        });
        //      }, 5000); // The readings will happen every 5 seconds