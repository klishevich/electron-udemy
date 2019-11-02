// Modules
const { app, BrowserWindow, ipcMain } = require('electron');
const windowStateKeeper = require('electron-window-state');
require('./menu');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

ipcMain.on('new-item', (e, itemUrl) => {
    setTimeout(() => {
        e.sender.send('new-item-success', 'new item from main process');
    }, 2000);
});

// Create a new BrowserWindow when `app` is ready
function createWindow() {
    let mainWindowState = windowStateKeeper({
        defaultWidth: 500,
        defaultHeight: 650
    });

    mainWindow = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        minWidth: 350,
        maxWidth: 650,
        minHeight: 300,
        webPreferences: {
            nodeIntegration: true
        },
        show: true
    });

    mainWindow.loadFile('renderer/main.html');
    mainWindowState.manage(mainWindow);
    mainWindow.webContents.openDevTools();

    // Listen for window being closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Electron `app` is ready
app.on('ready', () => {
    console.log('desktop path', app.getPath('desktop'));
    console.log('userData', app.getPath('userData'));
    createWindow();
});

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
    if (mainWindow === null) createWindow();
});
