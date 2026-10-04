const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  isElectron: true,
  platform: process.platform,
  printReceipt: (options) => ipcRenderer.invoke('print-receipt', options),
  db: {
    getProducts: () => ipcRenderer.invoke('db:getProducts'),
    addProduct: (product) => ipcRenderer.invoke('db:addProduct', product),
    updateProduct: (id, updates) => ipcRenderer.invoke('db:updateProduct', id, updates),
    deleteProduct: (id) => ipcRenderer.invoke('db:deleteProduct', id),

    getCustomers: () => ipcRenderer.invoke('db:getCustomers'),
    addCustomer: (customer) => ipcRenderer.invoke('db:addCustomer', customer),

    getBills: () => ipcRenderer.invoke('db:getBills'),
    createBill: (bill) => ipcRenderer.invoke('db:createBill', bill)
  }
});
