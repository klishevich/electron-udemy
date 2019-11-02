# Master Electron - Course Code

## Main Proccess

### To rebuild bycript run:

`./node_modules/.bin/electron-rebuild`

### Inspect

chrome://inspect/

### Restart from console

`rs`

### Execute JavaScript

contents.executeJavaScript(code[, userGesture])

### Session

```$xslt
session.fromPartition('persist:part1')
```

```$xslt
BrowserWindow({
  webPreferences: {
    partitiond: 'persist:part1'
})
```

```
session.clearStorageData()
```

### Cookie

```javascript
const ses = session.defaultSession;

ses.cookies.get({}, (err, cookies) => {
    console.log(cookies);
});
```

```javascript
let cookie = {
    url: 'https://my.site',
    name: 'cookie1',
    value: 'electron',
    expirationDate: 1613852855
};

ses.cookies.set(cookie, err => {
    console.log('cookie1 set');
});
```

`session = true` property, means the cookie only valid for session

#### read specific cookie

```javascript
const ses = session.defaultSession;

ses.cookies.get({ name: 'cookie1' }, (err, cookies) => {
    console.log(cookies);
});
```

#### remove cookie

```javascript
ses.cookies.remove('https://my.site', 'cookie1', err => {
    console.log('some log');
});
```

### Dialog

```javascript
const { dialog } = require('electron');

mainWindow.webContens.on('did-finish-load', () => {
    dialog.showOpenDialog(mainWindow, {
        //...
    });
});
```

#### save dialog

dialog.showSaveDialog

dialog.showMessageBox

### Global Shortcut Module

```javascript
globalShortcut.register('G', () => {
    console.log('G pressed');
});
```

### Menu

Menu.buildFromTemplate

### Context Menu

```javascript
mainWindow.webContents.on('context-menu', e => {
    contextMenu.popup();
});
```

### Tray

System tray icon

tray.setContextMenu(trayMenu)

### powerMonitor

```javascript
electron.powerMonitor.on('suspend', e => {
    console.log('saving file');
});
```

## Renderer Proccess

Arrays and buffers are copied over IPC!!!

### Remote module

### window (BrowserWindowProxy)

### WebFrame

in renderer

```javascript
const { webFrame } = require('electron');

const zoomUp = () => {
    webFrame.setZoomFactor(webFrame.getZoomFactor() + 1);
};
```

```javascript
webFrame.getResourceUsage();
```

### desktopCapturer

## IPC Inter-Process Communication

## Shared API. Process

process.type - where from I accessed the process (rendered/ browser)
process.mas, process.windowsStore

process.cpuUsage 

process.hang()

process.crash() - we can reload when crashed

## Screen

in renderer

window.screen

electron.screen

screen.getAllDisplays()

You may use the module to create window with half of the display width.

## Shell

- open url

