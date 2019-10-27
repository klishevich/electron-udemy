# Master Electron - Course Code

### To rebuild bycript run:

` ./node_modules/.bin/electron-rebuild`

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
