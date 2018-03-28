import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win: BrowserWindow | null;

const isDevMode = process.execPath.match(/[\\/]electron/) && process.env.NODE_ENV !== 'production';

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

const createWindow = async () => {
  if (isDevMode) {
    await installExtensions();
  }

  win = new BrowserWindow({ width: 800, height: 600 });

  if (isDevMode) {
    win.loadURL(`http://localhost:2003`);
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
      })
    );
  }

  if (isDevMode) {
    // Open DevTools
    win.webContents.openDevTools();
  }

  win.on('closed', () => {
    win = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
