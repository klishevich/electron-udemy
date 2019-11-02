// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { remote, ipcRenderer } = require('electron');
const { BrowserWindow, app } = remote;

ipcRenderer.on('channel1-resp', (e, args) => {
    console.log(args);
});

const button = document.getElementById('test-button');

button.addEventListener('click', e => {
    let secWin = new BrowserWindow({
        width: 400,
        height: 200
    });
    secWin.loadFile('index.html');
});

const button2 = document.getElementById('quit');
button2.addEventListener('click', e => {
    app.quit();
});

const button3 = document.getElementById('ipc-button');
button3.addEventListener('click', e => {
    ipcRenderer.send('channel1', 'hi from renderer');
});

const button4 = document.getElementById('ipc-sync');
button4.addEventListener('click', e => {
    let response = ipcRenderer.sendSync('sync-message', 'Waiting for response');
    console.log(response);
});
