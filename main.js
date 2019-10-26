// Modules
const { app, BrowserWindow } = require('electron');

console.log('checking ready', app.isReady());

setTimeout(() => {
    console.log('checking ready', app.isReady());
}, 2000);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Create a new BrowserWindow when `app` is ready
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: { nodeIntegration: true },
        show: true,
        backgroundColor: '#2C92F9'
    });

    // Load index.html into the new BrowserWindow
    mainWindow.loadFile('index.html');
    // mainWindow.loadURL('http://busation.ru');

    // Open DevTools - Remove for PRODUCTION!
    mainWindow.webContents.openDevTools();

    // Listen for window being closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // once - discard trigger after once
    // mainWindow.once('ready-to-show', () => {
    //     mainWindow.show();
    // });
}

// Electron `app` is ready
app.on('ready', () => {
    console.log('desktop path', app.getPath('desktop'));
    console.log('userData', app.getPath('userData'));
    createWindow();
});

app.on('before-quit', e => {
    // console.log('prevent from quiting');
    // e.preventDefault();
    // app.quit();
});

app.on('browser-window-blur', () => {
    console.log('unfocus');
    // setTimeout(app.quit, 3000);
    // setTimeout(app.hide, 3000);
});

app.on('browser-window-focus', () => {
    console.log('focus');
});

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
    if (mainWindow === null) createWindow();
});
