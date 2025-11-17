// routes/api/productRoutes.js
const express = require('express');
const c = require('../../controllers/productController');
const router = express.Router();

// JSON REST
router.get('/products', c.getAll);
router.get('/products/:id', c.getById);
router.get('/products/price-range', c.priceRange);
router.get('/products/expired', c.getExpired);
router.get('/products/low-stock', c.getLowStock);
router.get('/products/firm/:firm', c.getByFirm);
router.delete('/products/expired', c.deleteExpired);
router.put('/products/firm/:firm/price', c.updateFirmPrice);

module.exports = router;