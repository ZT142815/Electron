import fileAction from '../renderWang/common/customhooks/file';
import customMenu from './customMenu';

const path = require('path');
const { app, BrowserWindow, ipcMain, Menu } = require('electron');

function isDev() {
  // 👉 还记得我们配置中通过 webpack.DefinePlugin 定义的构建变量吗
  return process.env.NODE_ENV === 'development';
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1600,
    height: 1000,
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      enableRemoteModule: true, //解决require is not define报错
      contextIsolation: false, //解决require is not define报错
      webviewTag: true,
    },
    icon: path.join(__dirname, '../renderWang/assets/wang/appicon.ico')
  });
  // 判断是否是开发环境
  if (isDev()) {
    mainWindow.loadURL(`http://127.0.0.1:7001`);
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`);
  }
  // 获取app路径
  const ROOT_PATH = path.join(app.getAppPath(), '../');
  ipcMain.on('get-root-path', (event, arg) => {
    event.reply('reply-root-path', isDev() ? ROOT_PATH : __dirname);
  });
  // 创建存储文件
  const appConfigPath = path.join(app.getPath('appData'), 'Electron');
  // 获取应用程序路径
  ipcMain.on('Electron:get-userData-path', (event, arg) => {
    event.reply('Electron:reply-userData-path', appConfigPath);
  });
  fileAction.canRead(appConfigPath).then(() => {
    fileAction.hasFile(`${appConfigPath}/task.config.json`).catch(() => {
      fileAction.write(`${appConfigPath}/task.config.json`, [], 'utf-8');
    });
  });
}

app.on('ready', () => {
  const menu = Menu.buildFromTemplate(customMenu);
  Menu.setApplicationMenu(menu);
});


app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();   
  });
});
