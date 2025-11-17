// controllers/productController.js
const Product = require('../models/Product');

// ---------- REST (JSON) ----------
exports.getAll = async (req, res) => {
    const items = await Product.find();
    res.json(items);
};

exports.getById = async (req, res) => {
    const item = await Product.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
};

exports.priceRange = async (req, res) => {
    const min = Number(req.query.min) || 0;
    const max = Number(req.query.max) || Number.MAX_SAFE_INTEGER;
    const items = await Product.find({ Price: { $gte: min, $lte: max } });
    res.json(items);
};

exports.getExpired = async (_req, res) => {
    const today = new Date();
    const items = await Product.find({ Expiry_Date: { $lt: today } });
    res.json(items);
};

exports.getLowStock = async (req, res) => {
    const limit = Number(req.query.qty) || 50;
    const items = await Product.find({ Quantity: { $lt: limit } });
    res.json(items);
};

exports.getByFirm = async (req, res) => {
    const firm = req.params.firm;
    const items = await Product.find({ Firm_Name: new RegExp(`^${firm}$`, 'i') });
    res.json(items);
};

exports.deleteExpired = async (_req, res) => {
    const today = new Date();
    const result = await Product.deleteMany({ Expiry_Date: { $lt: today } });
    res.json({ message: `Deleted ${result.deletedCount} expired products.` });
};

exports.updateFirmPrice = async (req, res) => {
    const firm = req.params.firm;
    const newPrice = Number(req.body.newPrice);
    if (isNaN(newPrice) || newPrice <= 0) {
        return res.status(400).json({ message: 'Invalid price value.' });
}
    const result = await Product.updateMany(
        { Firm_Name: new RegExp(`^${firm}$`, 'i') },
        { $set: { Price: newPrice } }
);
    res.json({ message: `Updated price for ${result.modifiedCount} products of firm ${firm}.` });
};

// ---------- EJS PAGES ----------
exports.uiList = async (_req, res) => {
    const products = await Product.find();
    res.render('products/index', { products });
};

exports.uiNewForm = (_req, res) => {
    res.render('products/new');
};

exports.uiCreate = async (req, res) => {
    const body = req.body;
    await Product.create({
        Product_Name: body.Product_Name,
        Firm_Name: body.Firm_Name,
        Price: Number(body.Price),
        Quantity: Number(body.Quantity),
        Expiry_Date: new Date(body.Expiry_Date)
});
    res.redirect('/products');
};

exports.uiEditForm = async (req, res) => {
    const item = await Product.findById(req.params.id);
    if (!item) return res.redirect('/products');
    res.render('products/edit', { p: item });
};

exports.uiUpdate = async (req, res) => {
    const body = req.body;
    await Product.findByIdAndUpdate(req.params.id, {
        Product_Name: body.Product_Name,
        Firm_Name: body.Firm_Name,
        Price: Number(body.Price),
        Quantity: Number(body.Quantity),
        Expiry_Date: new Date(body.Expiry_Date)
});
    res.redirect('/products');
};

exports.uiDelete = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
};

exports.uiShow = async (req, res) => {
    const item = await Product.findById(req.params.id);
    if (!item) return res.redirect('/products');
    res.render('products/show', { p: item });
};