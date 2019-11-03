const { remote, shell } = require('electron');

const template = [
    {
        label: 'Items',
        submenu: [
            {
                label: 'Add New',
                click: window.newItem,
                accelerator: 'CmdOrCtrl+O'
            },
            {
                label: 'Read Item',
                accelerator: 'CmdOrCtrl+Enter',
                click: window.openItem
            },
            {
                label: 'Delete item',
                accelerator: 'CmdOrCtrl+Backspace',
                click: window.deleteItem
            },
            {
                label: 'Open on browser',
                accelerator: 'CmdOrCtrl+Shift+O',
                click: window.openItemNative
            },
            {
                label: 'Search Items',
                accelerator: 'CmdOrCtrl+S',
                click: window.searchItems
            }
        ]
    },
    {
        role: 'editMenu'
    },
    {
        role: 'windowMenu'
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn more',
                click: () => {
                    shell.openExternal('https://busation.ru');
                }
            }
        ]
    }
];

if (process.platform === 'darwin') {
    template.unshift({
        label: remote.app.getName(),
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    });
}

const menu = remote.Menu.buildFromTemplate(template);

remote.Menu.setApplicationMenu(menu);
