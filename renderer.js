const { remote } = require('electron');

const self = remote.getCurrentWindow();

let progress = 0.01;

let progressInterval = setInterval(() => {
    self.setProgressBar(progress);

    if (progress <= 1) {
        progress += 0.01;
    } else {
        self.setProgressBar(-1);
        clearInterval(progressInterval);
    }
}, 50);
