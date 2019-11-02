// Modules
const { app, BrowserWindow, webContents, session, Menu, MenuItem, ipcMain } = require('electron');
const windowStateKeeper = require('electron-window-state');

global['myVar'] = 'sdfsdfs';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let secondWindow;

const mainMenu = new Menu();

const menuItem1 = new MenuItem({
    label: 'Electron',
    submenu: [
        {
            label: 'Greet',
            click: () => {
                console.log('Hello from menu');
            },
            accelerator: 'Shift+Alt+K'
        },
        { label: 'DevTools', role: 'toggleDevTools' }
    ]
});

mainMenu.append(menuItem1);

// Create a new BrowserWindow when `app` is ready
function createWindow() {
    ipcMain.on('channel1', (e, args) => {
        console.log(args);
        e.sender.send('channel1-resp', 'message received');
    });

    ipcMain.on('sync-message', (e, args) => {
        console.log(args);
        e.returnValue = 'A sync response';
    });
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
            nodeIntegration: false,
            contextIsolation: false,
            preload: __dirname + '/preload.js'
        },
        show: true,
        backgroundColor: '#2C92F9'
        // frame: false,
        // titleBarStyle: 'hidden'
    });

    mainWindow.webContents.on('did-finish-load', e => {
        mainWindow.webContents.send('channel1-resp', {
            name: 'you have mail',
            email: 'email@email.com'
        });
    });

    const ses = mainWindow.webContents.session;
    console.log('ses', ses);
    const defaultSession = session.defaultSession;

    defaultSession.on('will-download', (e, downloadItem, webContents) => {
        console.log('Starting download');
        const name = downloadItem.getFilename();
        console.log(downloadItem.getTotalBytes());

        downloadItem.setSavePath(app.getPath('desktop') + `/${name}`);
    });

    console.log(Object.is(ses, defaultSession));

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

    Menu.setApplicationMenu(mainMenu);
    // mainWindow.loadURL('https://httpbin.org/basic-auth/user/passwd');

    let contents = mainWindow.webContents;
    // console.log('contents 1', contents);
    // console.log('contents 2', webContents.getAllWebContents());

    // contents.on('context-menu', (e, params) => {
    //     // console.log(`Context menu opened on:${params.mediaType} at x:${params.x}, y:${params.y}`);
    //     console.log(`User selected text: ${params.selectionText}`);
    //     console.log(`Can be copied: ${params.editFlags.canCopy}`);
    //     const selectedText = params.selectionText;
    //     contents.executeJavaScript(`alert("${selectedText}")`);
    // });

    // contents.on('media-started-playing', () => {
    //     console.log('video started');
    // });
    //
    // contents.on('media-paused', () => {
    //     console.log('video paused');
    // });

    // contents.on('login', (e, request, authInfo, callback) => {
    //     console.log('logging in:');
    //     callback('user', 'passwd');
    // });

    // contents.on('did-navigate', (e, url, statusCode, message) => {
    //     console.log(`Navigate to: ${url}, with response code: ${statusCode}`);
    //     console.log(message);
    // });
    // contents.on('before-input-event', (e, input) => {
    //     console.log(`${input.key} : ${input.type}`);
    // });

    // contents.on('new-window', (e, url) => {
    //     e.preventDefault();
    //     console.log(`creating new window for ${url}`);
    // });

    // contents.on('did-finish-load', () => {
    //     console.log('content fully loaded');
    // });

    // contents.on('dom-ready', () => {
    //     console.log('DOM ready');
    // });
    // mainWindow.loadURL('http://busation.ru');

    // secondWindow.loadFile('index2.html');

    // console.log(BrowserWindow.getAllWindows());

    // Open DevTools - Remove for PRODUCTION!
    mainWindow.webContents.openDevTools();
    // mainWindow.on('focus', () => {
    //     console.log('main window focused');
    // });

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

// app.on('before-quit', e => {
//     // console.log('prevent from quiting');
//     // e.preventDefault();
//     // app.quit();
// });

// app.on('browser-window-blur', () => {
//     console.log('unfocus');
//     // setTimeout(app.quit, 3000);
//     // setTimeout(app.hide, 3000);
// });

// app.on('browser-window-focus', () => {
//     console.log('focus');
// });

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
    if (mainWindow === null) createWindow();
});
