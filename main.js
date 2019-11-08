// Modules
const { app, BrowserWindow, session, Menu, MenuItem, ipcMain, Notification } = require('electron');
const windowStateKeeper = require('electron-window-state');
const path = require('path');
require('./menu');

// for notifications
app.setAppUserModelId('ru.busation.electron_udemy');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Create a new BrowserWindow when `app` is ready
function createWindow() {
    let mainWindowState = windowStateKeeper({
        defaultWidth: 1000,
        defaultHeight: 600
    });

    mainWindow = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        minWidth: 300,
        minHeight: 150,
        webPreferences: {
            nodeIntegration: true
        },
        show: true
    });

    mainWindowState.manage(mainWindow);
    mainWindow.loadFile('index.html');
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

// MESSAGE
setTimeout(() => {
    const logoIcon = path.join(__dirname, './logo3a.png');

    const notific = new Notification({
        title: 'Message from MAIN',
        body: 'Lorem Ipsum Dolor Sit AmetT',
        icon: logoIcon
    });

    notific.on('click', () => {
        console.log('MAIN notification clicked');
        // app.quit();
    });

    notific.show();
}, 2000);
