const fs = require('fs');
const { shell } = require('electron');

const items = document.getElementById('items');

let readerJS;
fs.readFile(`${__dirname}/reader.js`, (err, data) => {
    readerJS = data.toString();
});

exports.storage = JSON.parse(localStorage.getItem('readit-items')) || [];

window.addEventListener('message', e => {
    this.delete(e.data.itemIndex);
    // console.log(1111, e.data.itemIndex);
    e.source.close();
});

exports.delete = itemIndex => {
    console.log(2222, itemIndex, Array.from(items.childNodes));
    // items.removeChild(items.childNodes[itemIndex]);
    // this.storage.splice(itemIndex, 1);
    // this.save();
    // if (this.storage.length) {
    //     let newSelectedItemIndex = itemIndex === 0 ? 0 : itemIndex - 1;
    //     document.getElementsByClassName('read-item')[newSelectedItemIndex].classList.add('selected');
    // }
};

exports.getSelectedItem = () => {
    const currentItem = document.getElementsByClassName('read-item selected')[0];
    // I dont know why it is -1 not 0
    let itemIndex = -1;
    let child = currentItem.previousSibling;
    while (child !== null) {
        child = child.previousSibling;
        itemIndex++;
    }
    return { node: currentItem, index: itemIndex };
};

exports.save = () => {
    localStorage.setItem('readit-items', JSON.stringify(this.storage));
};

exports.select = e => {
    this.getSelectedItem().node.classList.remove('selected');
    e.currentTarget.classList.add('selected');
};

exports.changeSelection = direction => {
    const currentItemNode = this.getSelectedItem().node;
    if (direction === 'ArrowUp' && currentItemNode.previousSibling) {
        currentItemNode.classList.remove('selected');
        currentItemNode.previousSibling.classList.add('selected');
    } else if (direction === 'ArrowDown' && currentItemNode.nextSibling) {
        currentItemNode.classList.remove('selected');
        currentItemNode.nextSibling.classList.add('selected');
    }
};

exports.openNative = () => {
    if (!this.storage.length) return;

    let selectedItem = this.getSelectedItem();
    shell.openExternal(selectedItem.node.dataset.url);
};

exports.open = () => {
    if (!this.storage.length) return;
    const selectedItem = this.getSelectedItem();
    const contentURL = selectedItem.node.dataset.url;
    const readerWin = window.open(
        contentURL,
        '',
        `
        maxWidth=2000,
        maxHeight=2000,
        width=1200,
        height=800,
        backgroundColor=#DEDEDE,
        nodeIntegration=0,
        contextIsolation=1
    `
    );

    readerWin.eval(readerJS.replace('{{index}}', selectedItem.index));
};

exports.addItem = (item, isNew = false) => {
    const itemNode = document.createElement('div');
    itemNode.setAttribute('class', 'read-item');
    itemNode.setAttribute('data-url', item.url);
    itemNode.innerHTML = `<img src="${item.screenshot}"><h2>${item.title}</h2>`;
    items.appendChild(itemNode);

    itemNode.addEventListener('click', this.select);
    itemNode.addEventListener('dblclick', this.open);

    if (document.getElementsByClassName('read-item').length === 1) {
        itemNode.classList.add('selected');
    }

    if (isNew) {
        this.storage.push(item);
        this.save();
    }
};

this.storage.forEach(item => {
    this.addItem(item);
});
