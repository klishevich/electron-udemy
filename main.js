// Modules
const { app, BrowserWindow } = require('electron');
const windowStateKeeper = require('electron-window-state');

console.log('checking ready', app.isReady());

setTimeout(() => {
    console.log('checking ready', app.isReady());
}, 2000);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let secondWindow;

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
        webPreferences: { nodeIntegration: true },
        show: true,
        backgroundColor: '#2C92F9',
        // frame: false,
        titleBarStyle: 'hidden'
    });

    mainWindowState.manage(mainWindow);

    // console.log('mainWindow.id', mainWindow.id);

    // secondWindow = new BrowserWindow({
    //     width: 500,
    //     height: 300,
    //     webPreferences: { nodeIntegration: true },
    //     show: true
    // });

    // Load index.html into the new BrowserWindow
    mainWindow.loadFile('index.html');
    // mainWindow.loadURL('http://busation.ru');

    // secondWindow.loadFile('index2.html');

    // console.log(BrowserWindow.getAllWindows());

    // Open DevTools - Remove for PRODUCTION!
    // mainWindow.webContents.openDevTools();
    mainWindow.on('focus', () => {
        console.log('main window focused');
    });

    // secondWindow.on('focus', () => {
    //     console.log('second window focused');
    // });

    // Listen for window being closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // secondWindow.on('closed', () => {
    //     secondWindow = null;
    // });

    // once - discard trigger after once
    // mainWindow.once('ready-to-show', () => {
    //     mainWindow.show();
    // });

    // setTimeout(() => {
    //     secondWindow.show();
    //     setTimeout(() => {
    //         secondWindow.close();
    //         secondWindow = null;
    //     }, 3000);
    // }, 2000);
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
