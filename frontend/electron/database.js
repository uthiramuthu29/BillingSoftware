const Database = require('better-sqlite3');
const path = require('path');
const { app } = require('electron');

let db;

function initDatabase() {
  const dbPath = path.join(app.getPath('userData'), 'apex_pos.db');
  console.log('Initializing SQLite Database at:', dbPath);

  db = new Database(dbPath);
  db.pragma('journal_mode = WAL');

  // 1. Products Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      sku TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      costPrice REAL,
      stock INTEGER NOT NULL,
      gstRate REAL NOT NULL,
      barcode TEXT NOT NULL,
      unit TEXT NOT NULL,
      minStockLevel INTEGER,
      image TEXT
    )
  `);

  // 2. Customers Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS customers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      address TEXT,
      gstin TEXT,
      loyaltyPoints INTEGER DEFAULT 0,
      creditLimit REAL DEFAULT 0,
      balanceDue REAL DEFAULT 0,
      totalPurchases REAL DEFAULT 0,
      tier TEXT DEFAULT 'Regular'
    )
  `);

  // 3. Bills Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS bills (
      id TEXT PRIMARY KEY,
      invoiceNo TEXT UNIQUE NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      customer TEXT,
      items TEXT NOT NULL,
      subtotal REAL NOT NULL,
      totalGst REAL NOT NULL,
      discount REAL DEFAULT 0,
      additionalFee REAL DEFAULT 0,
      grandTotal REAL NOT NULL,
      paymentMode TEXT NOT NULL,
      status TEXT NOT NULL,
      terminal TEXT,
      cashierName TEXT,
      cashierId TEXT
    )
  `);

  seedInitialData();
}

function seedInitialData() {
  const count = db.prepare('SELECT COUNT(*) as count FROM products').get();
  if (count.count === 0) {
    const insertProduct = db.prepare(`
      INSERT INTO products (id, sku, name, category, price, costPrice, stock, gstRate, barcode, unit, minStockLevel, image)
      VALUES (@id, @sku, @name, @category, @price, @costPrice, @stock, @gstRate, @barcode, @unit, @minStockLevel, @image)
    `);

    const initialProducts = [
      { id: 'p1', sku: 'MLK-102', name: 'Organic Whole Milk 1L', category: 'Dairy & Eggs', price: 4.20, costPrice: 2.80, stock: 48, gstRate: 5, barcode: '8901234567890', unit: 'Bottle', minStockLevel: 10, image: null },
      { id: 'p2', sku: 'AVO-552', name: 'Fresh Hass Avocado Tray (4 Pack)', category: 'Fresh Produce', price: 6.50, costPrice: 4.10, stock: 24, gstRate: 5, barcode: '8901234567891', unit: 'Pack', minStockLevel: 8, image: null },
      { id: 'p3', sku: 'RCE-908', name: 'Royal Basmati Rice 5kg', category: 'Grains & Staples', price: 18.90, costPrice: 12.50, stock: 6, gstRate: 5, barcode: '8901234567892', unit: 'Bag', minStockLevel: 12, image: null },
      { id: 'p4', sku: 'OIL-441', name: 'Extra Virgin Olive Oil 750ml', category: 'Oils & Condiments', price: 14.20, costPrice: 9.30, stock: 35, gstRate: 12, barcode: '8901234567893', unit: 'Bottle', minStockLevel: 10, image: null },
      { id: 'p5', sku: 'BRD-119', name: 'Artisanal Sourdough Bread', category: 'Bakery', price: 5.80, costPrice: 3.20, stock: 15, gstRate: 5, barcode: '8901234567894', unit: 'Loaf', minStockLevel: 5, image: null },
      { id: 'p6', sku: 'COF-302', name: 'Colombian Dark Roast Coffee Beans 500g', category: 'Beverages', price: 12.40, costPrice: 7.90, stock: 42, gstRate: 12, barcode: '8901234567895', unit: 'Pack', minStockLevel: 15, image: null }
    ];

    const transaction = db.transaction((items) => {
      for (const item of items) insertProduct.run(item);
    });
    transaction(initialProducts);
  }

  const custCount = db.prepare('SELECT COUNT(*) as count FROM customers').get();
  if (custCount.count === 0) {
    const insertCust = db.prepare(`
      INSERT INTO customers (id, name, phone, email, address, gstin, loyaltyPoints, creditLimit, balanceDue, totalPurchases, tier)
      VALUES (@id, @name, @phone, @email, @address, @gstin, @loyaltyPoints, @creditLimit, @balanceDue, @totalPurchases, @tier)
    `);

    const initialCusts = [
      { id: 'c1', name: 'Walk-in Customer', phone: '9999999999', email: '', address: '', gstin: '', loyaltyPoints: 0, creditLimit: 0, balanceDue: 0, totalPurchases: 1420.50, tier: 'Regular' },
      { id: 'c2', name: 'David Miller', phone: '+1 (555) 234-5678', email: 'david.m@example.com', address: '424 Elm Street, Apt 3B', gstin: '33AAACD1234F1Z5', loyaltyPoints: 450, creditLimit: 500, balanceDue: 45.00, totalPurchases: 3240.00, tier: 'Gold' },
      { id: 'c3', name: 'Sophia Reynolds', phone: '+1 (555) 987-6543', email: 'sophia.r@example.com', address: '89 Park Avenue', gstin: '', loyaltyPoints: 890, creditLimit: 1200, balanceDue: 0, totalPurchases: 7850.25, tier: 'VIP' }
    ];

    const transaction = db.transaction((items) => {
      for (const item of items) insertCust.run(item);
    });
    transaction(initialCusts);
  }
}

// Product DAO
function getProducts() {
  return db.prepare('SELECT * FROM products ORDER BY id DESC').all();
}

function addProduct(product) {
  const param = {
    id: product.id,
    sku: product.sku,
    name: product.name,
    category: product.category,
    price: product.price,
    costPrice: product.costPrice ?? null,
    stock: product.stock,
    gstRate: product.gstRate,
    barcode: product.barcode,
    unit: product.unit,
    minStockLevel: product.minStockLevel ?? 5,
    image: product.image ?? null
  };
  const stmt = db.prepare(`
    INSERT INTO products (id, sku, name, category, price, costPrice, stock, gstRate, barcode, unit, minStockLevel, image)
    VALUES (@id, @sku, @name, @category, @price, @costPrice, @stock, @gstRate, @barcode, @unit, @minStockLevel, @image)
  `);
  stmt.run(param);
  return product;
}

function updateProduct(id, updates) {
  const current = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
  if (!current) return null;
  const updated = {
    ...current,
    ...updates,
    costPrice: updates.costPrice ?? current.costPrice ?? null,
    minStockLevel: updates.minStockLevel ?? current.minStockLevel ?? 5,
    image: updates.image ?? current.image ?? null
  };
  const stmt = db.prepare(`
    UPDATE products SET sku=@sku, name=@name, category=@category, price=@price, costPrice=@costPrice,
    stock=@stock, gstRate=@gstRate, barcode=@barcode, unit=@unit, minStockLevel=@minStockLevel, image=@image
    WHERE id=@id
  `);
  stmt.run(updated);
  return updated;
}

function deleteProduct(id) {
  return db.prepare('DELETE FROM products WHERE id = ?').run(id);
}

// Customer DAO
function getCustomers() {
  return db.prepare('SELECT * FROM customers ORDER BY id DESC').all();
}

function addCustomer(customer) {
  const param = {
    id: customer.id,
    name: customer.name,
    phone: customer.phone,
    email: customer.email ?? '',
    address: customer.address ?? '',
    gstin: customer.gstin ?? '',
    loyaltyPoints: customer.loyaltyPoints ?? 0,
    creditLimit: customer.creditLimit ?? 0,
    balanceDue: customer.balanceDue ?? 0,
    totalPurchases: customer.totalPurchases ?? 0,
    tier: customer.tier ?? 'Regular'
  };
  const stmt = db.prepare(`
    INSERT INTO customers (id, name, phone, email, address, gstin, loyaltyPoints, creditLimit, balanceDue, totalPurchases, tier)
    VALUES (@id, @name, @phone, @email, @address, @gstin, @loyaltyPoints, @creditLimit, @balanceDue, @totalPurchases, @tier)
  `);
  stmt.run(param);
  return customer;
}

// Bill DAO
function getBills() {
  const bills = db.prepare('SELECT * FROM bills ORDER BY id DESC').all();
  return bills.map((b) => ({
    ...b,
    customer: b.customer ? JSON.parse(b.customer) : null,
    items: JSON.parse(b.items)
  }));
}

function createBill(bill) {
  const param = {
    id: bill.id,
    invoiceNo: bill.invoiceNo,
    date: bill.date,
    time: bill.time,
    customerStr: bill.customer ? JSON.stringify(bill.customer) : null,
    itemsStr: JSON.stringify(bill.items),
    subtotal: bill.subtotal,
    totalGst: bill.totalGst,
    discount: bill.discount ?? 0,
    additionalFee: bill.additionalFee ?? 0,
    grandTotal: bill.grandTotal,
    paymentMode: bill.paymentMode,
    status: bill.status ?? 'Completed',
    terminal: bill.terminal ?? 'Terminal 02',
    cashierName: bill.cashierName ?? 'Sarah Jenkins',
    cashierId: bill.cashierId ?? 'CK-882'
  };
  const stmt = db.prepare(`
    INSERT INTO bills (id, invoiceNo, date, time, customer, items, subtotal, totalGst, discount, additionalFee, grandTotal, paymentMode, status, terminal, cashierName, cashierId)
    VALUES (@id, @invoiceNo, @date, @time, @customerStr, @itemsStr, @subtotal, @totalGst, @discount, @additionalFee, @grandTotal, @paymentMode, @status, @terminal, @cashierName, @cashierId)
  `);
  stmt.run(param);
  return bill;
}

module.exports = {
  initDatabase,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getCustomers,
  addCustomer,
  getBills,
  createBill
};
