const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const db = require('./database');

const isDev = !app.isPackaged && process.env.BUILD_TARGET !== 'electron';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 700,
    title: 'Gokul Dairy Farm — Desktop Edition',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
    },
    autoHideMenuBar: true,
    backgroundColor: '#0f172a',
  });

  if (isDev) {
    const port = process.env.PORT || 3000;
    mainWindow.loadURL(`http://localhost:${port}`);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../out/index.html'));
  }

  // Open target="_blank" links in default external browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http:') || url.startsWith('https:')) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  db.initDatabase();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC Handler for Thermal / A4 Printing
ipcMain.handle('print-receipt', async (event, options) => {
  if (!mainWindow) return { success: false, error: 'No active window' };

  try {
    mainWindow.webContents.print({
      silent: false,
      printBackground: true,
      deviceName: options?.printerName || '',
    });
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

// IPC Database Handlers (SQLite)
ipcMain.handle('db:getProducts', async () => db.getProducts());
ipcMain.handle('db:addProduct', async (event, product) => db.addProduct(product));
ipcMain.handle('db:updateProduct', async (event, id, updates) => db.updateProduct(id, updates));
ipcMain.handle('db:deleteProduct', async (event, id) => db.deleteProduct(id));

ipcMain.handle('db:getCustomers', async () => db.getCustomers());
ipcMain.handle('db:addCustomer', async (event, customer) => db.addCustomer(customer));

ipcMain.handle('db:getBills', async () => db.getBills());
ipcMain.handle('db:createBill', async (event, bill) => db.createBill(bill));
