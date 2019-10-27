// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { remote } = require('electron');
const { BrowserWindow, app } = remote;

const button = document.getElementById('test-button');

button.addEventListener('click', e => {
    let secWin = new BrowserWindow({
        width: 400,
        height: 200
    });
    secWin.loadFile('index.html');

    console.log(remote.getGlobal('myVar'));
});

const button2 = document.getElementById('quit');

button2.addEventListener('click', e => {
    app.quit();
});
