const { dialog } = require('electron');
const { autoUpdater } = require('electron-updater');

autoUpdater.logger = require('electron-log');
autoUpdater.logger.transports.file.level = 'info';

autoUpdater.autoDownload = false;

module.exports = () => {
    autoUpdater.checkForUpdates();

    autoUpdater.on('update-available', () => {
        dialog.showMessageBox(
            {
                type: 'info',
                title: 'Update available',
                message: 'A new version is available, do you want update now',
                buttons: ['Update', 'no']
            },
            buttonIndex => {
                if (buttonIndex === 0) {
                    autoUpdater.downloadUpdate();
                }
            }
        );
        //
    });
};
