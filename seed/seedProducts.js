// seed/seedProducts.js
const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');

async function seedProducts() {
    const filePath = path.join(process.cwd(), 'productsInformation.json');
    if (!fs.existsSync(filePath)) {
        console.error('productsInformation.json not found!');
        return;
}
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);

    const docs = data.map(d => ({
    ...d,
    Expiry_Date: new Date(d.Expiry_Date)
    }));

    await Product.deleteMany({});
    await Product.insertMany(docs);
    console.log(`🌱 Seeded ${docs.length} products.`);
}

module.exports = seedProducts;
